import { JamendoResponse } from '@core/models/jamendo/jamendo.model';

export interface TracksRequest {
  client_id: string;
  format?: 'xml' | 'json' | 'jsonpretty';
  callback?: string;
  offset?: number;
  limit?: string;
  order?: (
    | 'relevance'
    | 'buzzrate'
    | 'downloads_week'
    | 'downloads_month'
    | 'downloads_total'
    | 'listens_week'
    | 'listens_month'
    | 'listens_total'
    | 'popularity_week'
    | 'popularity_month'
    | 'popularity_total'
    | 'name'
    | 'album_name'
    | 'artist_name'
    | 'releasedate'
    | 'duration'
    | 'id'
  )[];
  fullcount?: boolean;
  id?: number[];
  name?: string;
  namesearch?: string;
  type?: 'single' | 'albumtrack' | 'single albumtrack';
  album_id?: string[];
  album_name?: string;
  artist_id?: string[];
  artist_name?: string;
  content_id_free?: boolean;
  datebetween?: string;
  featured?: true | 1;
  imagesize?: 25 | 35 | 50 | 55 | 60 | 65 | 70 | 75 | 85 | 100 | 130 | 150 | 200 | 300 | 400 | 500 | 600;
  audioformat?: 'mp31' | 'mp32' | 'ogg' | 'flac';
  audiodlformat?: 'mp31' | 'mp32' | 'ogg' | 'flac';
  tags?: string[];
  fuzzytags?: string[];
  acousticelectric?: 'acoustic' | 'electric';
  vocalinstrumental?: 'vocal' | 'instrumental';
  gender?: 'male' | 'female';
  speed?: ('verylow' | 'low' | 'medium' | 'high' | 'veryhigh')[];
  lang?: string[];
  durationbetween?: string;
  xartist?: string;
  search?: string;
  prolicensing?: boolean;
  probackground?: boolean;
  ccsa?: boolean;
  ccnd?: boolean;
  ccnc?: boolean;
  include?: ('licenses' | 'musicinfo' | 'stats' | 'lyrics')[];
  groupby?: 'artist_id' | 'album_id';
  boost?:
    | 'buzzrate'
    | 'downloads_week'
    | 'downloads_month'
    | 'downloads_total'
    | 'listens_week'
    | 'listens_month'
    | 'listens_total'
    | 'popularity_week'
    | 'popularity_month'
    | 'popularity_total';
}

export type TracksResponse = JamendoResponse<Track>;

export interface Track {
  id: string;
  name: string;
  duration: number;
  artist_id: string;
  artist_name: string;
  artist_idstr: string;
  album_name: string;
  album_id: string;
  license_ccurl: string;
  position: number;
  releasedate: string;
  album_image: string;
  audio: string;
  audiodownload: string;
  prourl: string;
  shorturl: string;
  shareurl: string;
  waveform: string;
  image: string;
  lyrics?: string;
  musicinfo?: TrackMusicinfo; // Появляется при include=musicinfo
  licenses?: TrackLicenses;
  stats?: TrackStats; // Появляется при include=stats или всё сразу include=musicinfo+stats
  audiodownload_allowed: boolean;
  content_id_free: boolean;
}

export interface TrackMusicinfo {
  vocalinstrumental: 'vocal' | 'instrumental' | '';
  lang: string;
  gender: 'male' | 'female' | '';
  acousticelectric: 'acoustic' | 'electric' | '';
  speed: ('verylow' | 'low' | 'medium' | 'high' | 'veryhigh')[];
  tags: {
    genres: string[];
    instruments: string[];
    vartags: string[];
  };
}

export interface TrackLicenses {
  ccnc: boolean;
  ccnd: boolean;
  ccsa: boolean;
  prolicensing: boolean;
  probackground: boolean;
}

export interface TrackStats {
  rate_downloads_total: number;
  rate_listened_total: number; // Количество воспроизведений
  playlisted: number;
  favorited: number;
  likes: number;
  dislikes: number;
  avgnote: number;
  notes: number;
}

interface WaveformData {
  peaks: number[];
}

export function parseWaveform(waveform: string): number[] {
  if (!waveform) {
    return [];
  }
  try {
    const waveformData: unknown = JSON.parse(waveform);
    if (isWaveformData(waveformData)) {
      return waveformData.peaks;
    }
    return [];
  } catch {
    return [];
  }
}

function isWaveformData(data: unknown): data is WaveformData {
  const isObject = data !== null && typeof data === 'object';
  return isObject && 'peaks' in data && isArrayOfNumbers(data.peaks);
}

function isArrayOfNumbers(data: unknown): data is number[] {
  return Array.isArray(data) && data.every((value) => typeof value === 'number' && Number.isInteger(value));
}
