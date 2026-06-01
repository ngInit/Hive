export interface TracksResponse {
  headers: ResponseHeaders;
  results: Track[];
}

export interface ResponseHeaders {
  status: 'success' | 'failed';
  code: number;
  error_message: string;
  warnings: string;
  results_count: number;
  next: string;
}

export interface Track {
  id: string;
  name: string;
  duration: number;
  artist_id: string;
  artist_name: string;
  artist_idstr: string;
  album_name: string;
  album_id: string;
  license_ccurl?: string;
  position?: number;
  releasedate: string;
  album_image: string;
  prourl?: string;
  shorturl?: string;
  shareurl?: string;
  audio: string;
  audiodownload?: string;
  audiodownload_allowed: boolean;
  image: string;
  content_id_free?: boolean;
  musicinfo?: MusicInfo; // Появляется при include=musicinfo
  stats?: TrackStats; // Появляется при include=stats или всё сразу include=musicinfo+stats
  waveform?: string;
}

export interface WaveformParsed {
  peaks: number[];
}

export interface MusicInfo {
  vocalinstrumental?: 'vocal' | 'instrumental' | '';
  lang?: string;
  gender?: 'male' | 'female' | '';
  acousticelectric?: 'acoustic' | 'electric' | '';
  speed?: string;
  tags: {
    genres: string[];
    instruments?: string[];
    vartags?: string[];
  };
}

export interface TrackStats {
  rate_downloads_total?: number;
  rate_listened_total: number; // Количество воспроизведений
  playlisted?: number;
  favorited?: number;
  likes?: number;
  dislikes?: number;
  avgnote: number;
  notes: number;
}
