import { HttpErrorResponse } from '@angular/common/http';

const HTTP_ERROR_MESSAGES: Record<number, string> = {
  0: 'Network error. Check your connection',
  400: 'Invalid request to music service',
  401: 'Failed client ID',
  403: 'Access to music service denied',
  404: 'Requested music data was not found',
  429: 'Too many requests. Please try again later',
};

function getJamendoErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    const message = HTTP_ERROR_MESSAGES[error.status];
    if (message) {
      return message;
    }
    if (error.status >= 500) {
      return 'Music service is unavailable. Please try again later';
    }
    return error.message || 'An error occurred while fetching music data';
  }
  return error instanceof Error ? error.message : 'An unknown error occurred';
}

export function throwJamendoResponseError(error: unknown): Error {
  return new Error(getJamendoErrorMessage(error));
}
