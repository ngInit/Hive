import { FirebaseError } from 'firebase/app';

const FIREBASE_AUTH_MESSAGES: Record<string, string> = {
  'auth/invalid-credential': 'Invalid email or password',
  'auth/user-not-found': 'Invalid email or password',
  'auth/invalid-email': 'Email is not allowed',
  'auth/email-already-in-use': 'Email is not allowed',
  'auth/weak-password': 'Password is too weak',
  'auth/wrong-password': 'Invalid email or password',
  'auth/too-many-requests': 'Too many requests. Try again later',
  'auth/network-request-failed': 'Network error. Try again later',
  'auth/internal-error': 'Internal error. Try again later',
  'auth/user-disabled': 'User is disabled',
  'auth/requires-recent-login': 'Please sign in again',
};

const FIRESTORE_ERROR_MESSAGES: Record<string, string> = {
  cancelled: 'The operation was cancelled.',
  internal: 'An internal server error occurred.',
  unavailable: 'Service is temporarily unavailable. Please try again.',
  unauthenticated: 'You must be logged in to perform this action.',
  'already-exists': 'This record already exists.',
  'deadline-exceeded': 'The request timed out. Please try again.',
  'invalid-argument': 'Invalid argument.',
  'invalid-argument-type': 'Invalid argument type.',
  'not-found': 'The requested data could not be found.',
  'permission-denied': 'You do not have permission to perform this action.',
  'resource-exhausted': 'Too many requests. Please slow down.',
  'unknown-error': 'An unknown error occurred.',
};

function getErrorMessage(error: FirebaseError): string {
  const errorCode: string = error.code;

  if (errorCode.startsWith('auth/')) {
    return FIREBASE_AUTH_MESSAGES[errorCode] || 'Authentication error';
  }
  return FIRESTORE_ERROR_MESSAGES[errorCode] || 'An error occurred';
}

function getFirebaseAuthError(error: unknown): string {
  if (error instanceof FirebaseError) {
    return getErrorMessage(error);
  }
  return error instanceof Error ? error.message : 'An unknown error occurred';
}

export function throwFirebaseAuthError(error: unknown): never {
  throw new Error(getFirebaseAuthError(error));
}
