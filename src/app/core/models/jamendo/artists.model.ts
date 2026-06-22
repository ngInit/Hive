import { JamendoResponse } from '@core/models/jamendo/jamendo.model';

export interface ArtistsRequest {
  client_id: string;
  format?: 'xml' | 'json' | 'jsonpretty';
  callback?: string;
  offset?: number;
  limit?: string;
  order?: ('name' | 'id' | 'joindate' | 'popularity_total' | 'popularity_month' | 'popularity_week')[];
  fullcount?: boolean;
  id?: number[];
  name?: string;
  namesearch?: string;
  hasimage?: true | 1;
  datebetween?: string;
}

export interface ArtistsTracksRequest extends Omit<ArtistsRequest, 'order'> {
  order?: (
    | 'name'
    | 'id'
    | 'joindate'
    | 'popularity_total'
    | 'popularity_month'
    | 'popularity_week'
    | 'track_name'
    | 'track_id'
    | 'track_releasedate'
  )[];
  track_id?: number[];
  track_name?: string;
  track_type?: 'single' | 'albumtrack' | 'single albumtrack';
  album_datebetween?: string;
  album_id?: string[];
  album_name?: string;
  imagesize?: 25 | 35 | 50 | 55 | 60 | 65 | 70 | 75 | 85 | 100 | 130 | 150 | 200 | 300 | 400 | 500 | 600;
  audioformat?: 'mp31' | 'mp32' | 'ogg' | 'flac';
  audiodlformat?: 'mp31' | 'mp32' | 'ogg' | 'flac';
}

export interface ArtistsAlbumsRequest extends Omit<ArtistsRequest, 'order'> {
  order?: (
    | 'name'
    | 'id'
    | 'joindate'
    | 'popularity_total'
    | 'popularity_month'
    | 'popularity_week'
    | 'album_name'
    | 'album_id'
    | 'album_releasedate'
  )[];
  album_id?: string[];
  album_name?: string;
  album_datebetween?: string;
  imagesize?: 25 | 35 | 50 | 55 | 60 | 65 | 70 | 75 | 85 | 100 | 130 | 150 | 200 | 300 | 400 | 500 | 600;
}

export interface ArtistsLocationsRequest extends ArtistsRequest {
  haslocation?: boolean;
  location_country?: (
    | 'AFG'
    | 'ALB'
    | 'DZA'
    | 'UMI'
    | 'ASM'
    | 'VIR'
    | 'AND'
    | 'AGO'
    | 'AIA'
    | 'ATA'
    | 'ATG'
    | 'ARG'
    | 'ABW'
    | 'ASC'
    | 'AUT'
    | 'AUS'
    | 'AZE'
    | 'BHS'
    | 'BHR'
    | 'BGD'
    | 'BRB'
    | 'BEL'
    | 'BLZ'
    | 'BEN'
    | 'BMU'
    | 'BTN'
    | 'BOL'
    | 'BIH'
    | 'BWA'
    | 'BVT'
    | 'BRA'
    | 'IOT'
    | 'VGB'
    | 'BRN'
    | 'BGR'
    | 'BFA'
    | 'BDI'
    | 'CHL'
    | 'CYP'
    | 'CPT'
    | 'COM'
    | 'COK'
    | 'CRI'
    | 'CZE'
    | 'TCD'
    | 'CUW'
    | 'DGA'
    | 'DMA'
    | 'DOM'
    | 'DJI'
    | 'DNK'
    | 'KOR'
    | 'SSD'
    | 'ZAF'
    | 'SGS'
    | 'ECU'
    | 'GNQ'
    | 'ARE'
    | 'GBR'
    | 'USA'
    | 'EGY'
    | 'CIV'
    | 'ERI'
    | 'ETH'
    | 'FLK'
    | 'BLR'
    | 'FRO'
    | 'FJI'
    | 'FIN'
    | 'ATF'
    | 'GUF'
    | 'PYF'
    | 'FRA'
    | 'PHL'
    | 'GAB'
    | 'GMB'
    | 'GHA'
    | 'GIB'
    | 'GRD'
    | 'GRL'
    | 'GEO'
    | 'GLP'
    | 'GUM'
    | 'GTM'
    | 'GGY'
    | 'GIN'
    | 'GNB'
    | 'GUY'
    | 'GRC'
    | 'HTI'
    | 'HMD'
    | 'ANT'
    | 'BES'
    | 'NLD'
    | 'HND'
    | 'HKG'
    | 'HRV'
    | 'IND'
    | 'IDN'
    | 'IRQ'
    | 'IRN'
    | 'ISL'
    | 'ISR'
    | 'JAM'
    | 'JPN'
    | 'YEM'
    | 'JEY'
    | 'JOR'
    | 'CYM'
    | 'KHM'
    | 'CMR'
    | 'CAN'
    | 'CXR'
    | 'QAT'
    | 'KAZ'
    | 'TLS'
    | 'KEN'
    | 'KGZ'
    | 'KIR'
    | 'COL'
    | 'COG'
    | 'COD'
    | 'XKK'
    | 'CUB'
    | 'KWT'
    | 'CHN'
    | 'CCK'
    | 'CAF'
    | 'LAO'
    | 'POL'
    | 'LSO'
    | 'LVA'
    | 'LBN'
    | 'LBR'
    | 'LIE'
    | 'LTU'
    | 'LUX'
    | 'LBY'
    | 'MKD'
    | 'MDG'
    | 'HUN'
    | 'MAC'
    | 'MYS'
    | 'MWI'
    | 'MDV'
    | 'MLI'
    | 'IMN'
    | 'MAR'
    | 'MHL'
    | 'MTQ'
    | 'MUS'
    | 'MRT'
    | 'MYT'
    | 'MEX'
    | 'MMR'
    | 'FSM'
    | 'MDA'
    | 'MCO'
    | 'MNG'
    | 'MNE'
    | 'MSR'
    | 'MOZ'
    | 'MLT'
    | 'NAM'
    | 'NRU'
    | 'NPL'
    | 'NIC'
    | 'NER'
    | 'NGA'
    | 'NIU'
    | 'NFK'
    | 'NOR'
    | 'ESH'
    | 'DEU'
    | 'ITA'
    | 'OMN'
    | 'RUS'
    | 'PAK'
    | 'PLW'
    | 'PSE'
    | 'PAN'
    | 'PRY'
    | 'PER'
    | 'PCN'
    | 'PRT'
    | 'PRI'
    | 'PNG'
    | 'REU'
    | 'ROU'
    | 'RWA'
    | 'BLM'
    | 'KNA'
    | 'MAF'
    | 'SPM'
    | 'VCT'
    | 'SLB'
    | 'SLV'
    | 'SMR'
    | 'LCA'
    | 'STP'
    | 'SYC'
    | 'SLE'
    | 'SXM'
    | 'ESP'
    | 'SJM'
    | 'LKA'
    | 'SUR'
    | 'CHE'
    | 'SWE'
    | 'WSM'
    | 'SAU'
    | 'SEN'
    | 'SHN'
    | 'SRB'
    | 'SGP'
    | 'SVK'
    | 'SVN'
    | 'SOM'
    | 'SDN'
    | 'SWZ'
    | 'SYR'
    | 'TWN'
    | 'TZA'
    | 'THA'
    | 'TGO'
    | 'TKL'
    | 'TON'
    | 'TTO'
    | 'TAA'
    | 'TUN'
    | 'TCA'
    | 'TUV'
    | 'TJK'
    | 'TUR'
    | 'TKM'
    | 'UGA'
    | 'UKR'
    | 'URY'
    | 'VUT'
    | 'VAT'
    | 'VEN'
    | 'VNM'
    | 'WLF'
    | 'ZMB'
    | 'ZWE'
    | 'CPV'
    | 'ALA'
    | 'PRK'
    | 'MNP'
    | 'EST'
    | 'IRL'
    | 'ARM'
    | 'NCL'
    | 'NZL'
    | 'UZB'
  )[];
  location_city?: string;
  location_coords?: string;
  location_radius?: number;
}

export interface ArtistsMusicinfoRequest extends ArtistsRequest {
  tag?: string;
}

export type ArtistsResponse = JamendoResponse<Artist>;
export type ArtistsTracksResponse = JamendoResponse<ArtistTracks>;
export type ArtistsAlbumsResponse = JamendoResponse<ArtistAlbums>;
export type ArtistsLocationsResponse = JamendoResponse<ArtistLocations>;
export type ArtistsMusicinfoResponse = JamendoResponse<ArtistMusicinfo>;

export interface Artist {
  id: string;
  name: string;
  website: string;
  joindate: string;
  image: string;
  shorturl: string;
  shareurl: string;
}

export interface ArtistTracks extends Omit<Artist, 'shareurl' | 'shorturl'> {
  tracks: ArtistTrack[];
}

export interface ArtistTrack {
  album_id: string;
  album_name: string;
  id: string;
  name: string;
  duration: string;
  releasedate: string;
  license_ccurl: string;
  album_image: string;
  image: string;
  audio: string;
  audiodownload: string;
  audiodownload_allowed: boolean;
}

export interface ArtistAlbums extends Omit<Artist, 'shareurl' | 'shorturl'> {
  albums: ArtistAlbum[];
}

export interface ArtistAlbum {
  id: string;
  name: string;
  releasedate: string;
  image: string;
}

export interface ArtistLocations extends Artist {
  locations: ArtistLocation[];
}

export interface ArtistLocation {
  id: string;
  longitude: string;
  latitude: string;
  country: string;
  city: string;
}

export interface ArtistMusicinfo extends Artist {
  musicinfo: {
    tags: string[];
  };
}
