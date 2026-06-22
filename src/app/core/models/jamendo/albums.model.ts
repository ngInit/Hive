import { JamendoResponse } from '@core/models/jamendo/jamendo.model';

export interface AlbumsRequest {
  client_id: string;
  format?: 'xml' | 'json' | 'jsonpretty';
  callback?: string;
  offset?: number;
  limit?: string;
  order?: (
    | 'name'
    | 'id'
    | 'releasedate'
    | 'artist_id'
    | 'artist_name'
    | 'popularity_total'
    | 'popularity_month'
    | 'popularity_week'
  )[];
  fullcount?: boolean;
  id?: number[];
  name?: string;
  namesearch?: string;
  artist_id?: string[];
  artist_name?: string;
  datebetween?: string;
  imagesize?: 25 | 35 | 50 | 55 | 60 | 65 | 70 | 75 | 85 | 100 | 130 | 150 | 200 | 300 | 400 | 500 | 600;
  audioformat?: 'mp32';
  type?: ('album' | 'single')[];
}

export interface AlbumTracksRequest extends Omit<AlbumsRequest, 'order' | 'audioformat'> {
  order?: (
    | 'name'
    | 'id'
    | 'releasedate'
    | 'artist_id'
    | 'artist_name'
    | 'popularity_total'
    | 'popularity_month'
    | 'popularity_week'
    | 'track_id'
    | 'track_name'
    | 'track_position'
  )[];
  audioformat?: 'mp31' | 'mp32' | 'ogg' | 'flac';
  track_id?: number[];
  track_name?: string;
  audiodlformat?: 'mp31' | 'mp32' | 'ogg' | 'flac';
}

export interface AlbumsMusicinfoRequest extends AlbumsRequest {
  tag?: string;
}

export type AlbumsResponse = JamendoResponse<Album>;
export type AlbumTracksResponse = JamendoResponse<AlbumTracks>;
export type AlbumMusicinfoResponse = JamendoResponse<AlbumMusicinfo>;

export interface Album {
  id: string;
  name: string;
  releasedate: string;
  artist_id: string;
  artist_name: string;
  image: string;
  zip: string;
  shorturl: string;
  shareurl: string;
  zip_allowed: boolean;
}

export interface AlbumTracks extends Omit<Album, 'shorturl' | 'shareurl'> {
  track_id: string;
  tracks: AlbumTrack[];
}

export interface AlbumTrack {
  count: string;
  id: string;
  position: string;
  name: string;
  duration: string;
  license_ccurl: string;
  audio: string;
  audiodownload: string;
  audiodownload_allowed: boolean;
}

export interface AlbumMusicinfo extends Album {
  musicinfo: {
    tags: string[];
  };
}
