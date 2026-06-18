export interface JamendoResponseHeaders {
  status: 'success' | 'failed';
  code: number;
  error_message: string;
  warnings: string;
  results_count?: number;
  results_fullcount?: number;
  next?: string;
}

export interface JamendoResponse<T> {
  headers: JamendoResponseHeaders;
  results: T[];
}
