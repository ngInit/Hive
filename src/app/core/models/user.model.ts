import type { FirestoreDataConverter, WithFieldValue } from 'firebase/firestore';

export interface UserAuth {
  uid: string;
  nickname: string;
  email: string;
}

export interface MockUserAuth {
  uid: string;
  nickname: string;
  email: string;
  password: string;
}

export const userConverter: FirestoreDataConverter<UserAuth, WithFieldValue<UserAuth>> = {
  toFirestore(user: WithFieldValue<UserAuth>) {
    return user;
  },
  fromFirestore(snap) {
    return snap.data() as UserAuth;
  },
};
