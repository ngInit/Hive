import { Injectable, signal } from '@angular/core';
import { MockUserAuth, UserAuth } from '@core/models/user.model';
import { mockUsers } from '@shared/mocks/auth.mock';
import { SignInData, SignUpData, UpdateData } from '@core/models/auth.model';
import { FirebaseRepository } from '@core/repositories/firebase/firebase.repository';
import { delay } from '@utils/delay';
import { environment } from '@env/environment';

const DEFAULT_DELAY = environment.mockDelayMs;
const MOCK_USERS_STORAGE_KEY = 'hive_mock_users';
const MOCK_USER_SESSION_KEY = 'hive_mock_user_session';

@Injectable()
export class FirebaseMockRepository implements FirebaseRepository {
  private readonly mockAuthUsers: MockUserAuth[] = mockUsers;
  readonly currentUser = signal<UserAuth | null>(this.loadUserSession());
  readonly isAuthReady = signal(true);
  constructor() {
    this.mockAuthUsers = this.loadUsers();
  }

  private loadUserSession(): UserAuth | null {
    try {
      const storage: string | null = localStorage.getItem(MOCK_USER_SESSION_KEY);
      return storage ? (JSON.parse(storage) as UserAuth) : null;
    } catch {
      return null;
    }
  }

  private loadUsers(): MockUserAuth[] {
    try {
      const storage: string | null = localStorage.getItem(MOCK_USERS_STORAGE_KEY);
      return storage ? (JSON.parse(storage) as MockUserAuth[]) : [...mockUsers];
    } catch {
      return [...mockUsers];
    }
  }

  private saveUsers(users: MockUserAuth[]): void {
    localStorage.setItem(MOCK_USERS_STORAGE_KEY, JSON.stringify(users));
  }

  private saveUserSession(user: UserAuth): void {
    localStorage.setItem(MOCK_USER_SESSION_KEY, JSON.stringify(user));
  }

  private getUserByEmailAndPassword(data: SignInData): UserAuth {
    const user: MockUserAuth | undefined = this.mockAuthUsers.find(
      (user) => data.email === user.email && data.password === user.password
    );
    if (!user) {
      throw new Error('Invalid email or password');
    }
    return {
      uid: user.uid,
      nickname: user.nickname,
      email: user.email,
    };
  }

  private getUserByUid(uid: string): MockUserAuth {
    const user: MockUserAuth | undefined = this.mockAuthUsers.find((user) => uid === user.uid);
    if (!user) {
      throw new Error('Invalid user uid');
    }
    return user;
  }

  private getUserBySession(): UserAuth {
    const currentSession: string | null = localStorage.getItem(MOCK_USER_SESSION_KEY);
    if (!currentSession) {
      throw new Error('Invalid user session');
    }
    return JSON.parse(currentSession) as UserAuth;
  }

  private clearUserSession(): void {
    localStorage.removeItem(MOCK_USER_SESSION_KEY);
  }

  private isEmailExists(email: string): boolean {
    return this.mockAuthUsers.some((user) => user.email === email);
  }

  private addUser(data: SignUpData): UserAuth {
    const newUid = String(Math.max(0, ...this.mockAuthUsers.map((user) => Number(user.uid))) + 1);
    const user = {
      uid: newUid,
      nickname: data.nickname,
      email: data.email,
      password: data.password,
    };
    this.mockAuthUsers.push(user);
    this.saveUsers(this.mockAuthUsers);
    return {
      uid: user.uid,
      nickname: user.nickname,
      email: user.email,
    };
  }

  private updateUser(data: UpdateData, currentSession: UserAuth): UserAuth {
    const currentUser: MockUserAuth = this.getUserByUid(currentSession.uid);
    if (data.email) {
      currentUser.email = data.email;
    }
    if (data.nickname) {
      currentUser.nickname = data.nickname;
    }
    if (data.password) {
      currentUser.password = data.password;
    }
    const updatedUserData: UserAuth = {
      uid: currentUser.uid,
      nickname: currentUser.nickname,
      email: currentUser.email,
    };
    this.saveUsers(this.mockAuthUsers);
    this.saveUserSession(updatedUserData);
    return updatedUserData;
  }

  async signUp(data: SignUpData): Promise<UserAuth> {
    await delay(DEFAULT_DELAY);
    if (this.isEmailExists(data.email)) {
      throw new Error(`Email ${data.email} is not allowed`);
    }
    const user: UserAuth = this.addUser(data);
    this.saveUserSession(user);
    this.currentUser.set(user);
    return user;
  }

  async signIn(data: SignInData): Promise<UserAuth> {
    await delay(DEFAULT_DELAY);
    const user: UserAuth = this.getUserByEmailAndPassword(data);
    this.saveUserSession(user);
    this.currentUser.set(user);
    return user;
  }

  async signOut(data: UserAuth): Promise<void> {
    await delay(DEFAULT_DELAY);
    const currentSession: UserAuth = this.getUserBySession();
    if (currentSession.uid !== data.uid) {
      throw new Error('Invalid user session');
    }
    this.currentUser.set(null);
    this.clearUserSession();
  }

  async updateProfile(uid: string, data: UpdateData): Promise<UserAuth> {
    await delay(DEFAULT_DELAY);
    const currentSession: UserAuth = this.getUserBySession();
    if (uid !== currentSession.uid) {
      throw new Error('Invalid user session');
    }
    if (!data.email && !data.nickname && !data.password) {
      throw new Error('No changes');
    }
    if (data.email && currentSession.email !== data.email && this.isEmailExists(data.email)) {
      throw new Error(`Email ${data.email} is not allowed`);
    }
    const updatedUser = this.updateUser(data, currentSession);
    this.currentUser.set(updatedUser);
    return updatedUser;
  }
}
