export interface Playlist {
  id: string;
  name: string;
  trackIds: string[];
}

export type CreatePlaylistData = Pick<Playlist, 'name'>;
export type PlaylistResponse = Omit<Playlist, 'id'>;
