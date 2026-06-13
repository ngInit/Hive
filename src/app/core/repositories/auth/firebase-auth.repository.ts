import { Injectable, signal } from '@angular/core';
import { AuthRepository } from '@core/repositories/auth/auth.repository';
import { environment } from '@env/environment';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore, doc, setDoc } from 'firebase/firestore';
import { SignUpData } from '@core/models/auth.model';
import {
  createUserWithEmailAndPassword,
  updateProfile as updateFirebaseProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { UserAuth, userConverter } from '@core/models/user.model';
import { throwFirebaseAuthError } from '@core/errors/firebase-auth.error';

const fbApp: FirebaseApp = initializeApp(environment.firebase);
const auth: Auth = getAuth(fbApp);
const db: Firestore = getFirestore(fbApp);

interface fbData {
  uid: string;
  displayName: string | null;
  email: string | null;
}

@Injectable()
export class FirebaseAuthRepository implements AuthRepository {
  readonly currentUser = signal<UserAuth | null>(null);
  readonly isAuthReady = signal(false);
  constructor() {
    onAuthStateChanged(auth, (user) => {
      try {
        this.currentUser.set(user ? this.getAuthData(user) : null);
      } catch {
        this.currentUser.set(null);
      } finally {
        this.isAuthReady.set(true);
      }
    });
  }

  private getAuthData(firebaseUser: fbData): UserAuth {
    if (!firebaseUser.email) {
      throw new Error("Email doesn't exist");
    }
    return {
      uid: firebaseUser.uid,
      nickname: firebaseUser.displayName ?? 'unknown',
      email: firebaseUser.email,
    };
  }

  private async saveToFirestore(user: UserAuth): Promise<void> {
    await setDoc(doc(db, 'users', user.uid).withConverter(userConverter), user);
  }

  async signUp(data: SignUpData): Promise<UserAuth> {
    try {
      const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateFirebaseProfile(credential.user, { displayName: data.nickname });
      await credential.user.reload();
    } catch (error) {
      throwFirebaseAuthError(error);
    }
  }
}
