import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { environment } from '@env/environment';

export const firebaseApp: FirebaseApp = initializeApp(environment.firebase);
export const firestoreDb: Firestore = getFirestore(firebaseApp);
