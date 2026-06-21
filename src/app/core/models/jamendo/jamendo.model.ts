import { ArtistsRequest, ArtistsResponse } from '@core/models/jamendo/artists.model';
import { TracksRequest, TracksResponse } from '@core/models/jamendo/tracks.model';
import { AlbumsRequest, AlbumsResponse } from '@core/models/jamendo/albums.model';

export type EndPoint = 'artists' | 'tracks' | 'albums';

export interface JamendoResponseHeaders {
  status: 'success' | 'failed';
  code: number;
  error_message: string;
  warnings: string;
  results_count?: number;
  results_fullcount?: number;
  next?: string;
}

export interface JamendoEndpointRequest {
  artists: ArtistsRequest;
  tracks: TracksRequest;
  albums: AlbumsRequest;
}

export interface JamendoEndpointResponse {
  artists: ArtistsResponse;
  tracks: TracksResponse;
  albums: AlbumsResponse;
}

interface JamendoSuccessResponse<T> {
  headers: JamendoResponseHeaders & { status: 'success' };
  results: T[];
}

interface JamendoFailedResponse {
  headers: JamendoResponseHeaders & { status: 'failed' };
  results: [];
}

export type JamendoResponse<T> = JamendoSuccessResponse<T> | JamendoFailedResponse;

export function isJamendoSuccess<T>(response: JamendoResponse<T>): response is JamendoSuccessResponse<T> {
  return response.headers.status === 'success';
}
