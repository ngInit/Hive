import { Injectable, signal } from '@angular/core';
import { FirebaseRepository } from '@core/repositories/firebase/firebase.repository';
import { firebaseApp, firestoreDb } from '@core/firebase/firebase-app';
import { Auth, getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile as updateFirebaseProfile,
  updatePassword,
  updateEmail,
  onAuthStateChanged,
  deleteUser,
} from 'firebase/auth';
import { SignInData, SignUpData, UpdateData } from '@core/models/auth.model';
import { UserAuth } from '@core/models/user.model';
import { throwFirebaseAuthError } from '@core/errors/firebase-auth.error';

const auth: Auth = getAuth(firebaseApp);

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
    await setDoc(doc(firestoreDb, 'users', user.uid), {
      uid: user.uid,
      nickname: user.nickname,
      email: user.email,
    });
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
    if (data.nickname && data.nickname === user.displayName) {
      throw new Error('Nickname is not changed. Your current nickname is the same as the new one');
    }
    if (data.email && data.email === user.email) {
      throw new Error('Email is not changed. Your current email is the same as the new one');
    }
    if (!data.email && !data.nickname && !data.password) {
      throw new Error('No changes');
    }
    try {
      if (data.nickname) {
        await updateFirebaseProfile(user, { displayName: data.nickname });
      }
      if (data.email) {
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

  async deleteProfile(data: UserAuth): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User not found');
    }
    if (data.uid !== user.uid) {
      throw new Error('User is not authorized to delete this profile');
    }
    await deleteUser(user);
  }
}
