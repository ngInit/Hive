import { InjectionToken } from '@angular/core';
import { CreatePlaylistData, Playlist } from '@core/models/playlist.model';

export const PLAYLIST_REPOSITORY = new InjectionToken<PlaylistRepository>('PLAYLIST_REPOSITORY');

export interface PlaylistRepository {
  createFavoritePlaylist(uid: string): Promise<void>;
  getAllUserPlaylists(uid: string): Promise<Playlist[]>;
  create(uid: string, data: CreatePlaylistData): Promise<Playlist>;
  rename(uid: string, playlistId: string, name: string): Promise<void>;
  addTrack(uid: string, playlistId: string, trackId: string): Promise<void>;
  removeTrack(uid: string, playlistId: string, trackId: string): Promise<void>;
  delete(uid: string, playlistId: string): Promise<void>;
}
