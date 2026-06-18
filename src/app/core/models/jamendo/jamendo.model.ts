export interface ResponseHeaders {
  status: 'success' | 'failed';
  code: number;
  error_message: string;
  warnings: string;
  results_count: number;
  next: string;
}

export interface JamendoResponse<T> {
  headers: JamendoResponseHeaders;
  results: T[];
}
