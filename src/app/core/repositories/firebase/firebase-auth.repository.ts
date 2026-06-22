import { Injectable, signal } from '@angular/core';
import { FirebaseRepository } from '@core/repositories/firebase/firebase.repository';
import { environment } from '@env/environment';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore, doc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile as updateFirebaseProfile,
  updatePassword,
  updateEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { SignInData, SignUpData, UpdateData } from '@core/models/auth.model';
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
export class FirebaseAuthRepository implements FirebaseRepository {
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
      const userAuth = this.getAuthData(credential.user);
      await this.saveToFirestore(userAuth);
      this.currentUser.set(userAuth);
      return userAuth;
    } catch (error) {
      throwFirebaseAuthError(error);
    }
  }

  async signIn(data: SignInData): Promise<UserAuth> {
    try {
      const credential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = credential.user;
      return this.getAuthData(user);
    } catch (error) {
      throwFirebaseAuthError(error);
    }
  }

  async signOut(data: UserAuth): Promise<void> {
    if (data.uid !== auth.currentUser?.uid) {
      throw new Error('User is not authorized to sign out');
    }
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      throwFirebaseAuthError(error);
    }
  }

  async updateProfile(uid: string, data: UpdateData): Promise<UserAuth> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not found');
    }
    if (uid !== user.uid) {
      throw new Error('User is not authorized to update this profile');
    }
    if (!data.email && !data.nickname && !data.password) {
      throw new Error('No changes');
    }
    try {
      if (data.nickname) {
        await updateFirebaseProfile(user, { displayName: data.nickname });
      }
      if (data.email && user.email !== data.email) {
        await updateEmail(user, data.email);
      }
      if (data.password) {
        await updatePassword(user, data.password);
      }
      await user.reload();
      const updatedUser = this.getAuthData(user);
      this.currentUser.set(updatedUser);
      if (data.nickname || data.email) {
        await this.saveToFirestore(updatedUser);
      }
      return updatedUser;
    } catch (error) {
      throwFirebaseAuthError(error);
    }
  }
}
