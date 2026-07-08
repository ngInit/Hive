import { computed, inject, Service, signal } from '@angular/core';
import { FirebaseService } from '@core/services/firebase.service';
import { PLAYLIST_REPOSITORY } from '@core/repositories/firestore/playlist.repository';
import { CreatePlaylistData, Playlist } from '@core/models/playlist.model';

@Service()
export class PlaylistService {
  private readonly authService = inject(FirebaseService);
  private readonly repository = inject(PLAYLIST_REPOSITORY);
  private readonly user = computed(() => {
    return this.authService.currentUser();
  });
  readonly playlists = signal<Playlist[]>([]);
  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  private updatePlaylistTrackIds(playlistId: string, updateTrackIds: (trackIds: string[]) => string[]): void {
    this.playlists.update((playlists) =>
      playlists.map((playlist) =>
        playlist.id === playlistId ? { ...playlist, trackIds: updateTrackIds(playlist.trackIds) } : playlist
      )
    );
  }

  async createFavorites(): Promise<void> {
    const user = this.user();
    if (!user) {
      this.errorMessage.set('User not authenticated');
      return;
    }
    try {
      await this.repository.createFavoritePlaylist(user.uid);
    } catch {
      this.errorMessage.set('Failed to create favorites playlist');
    }
  }

  async loadAllPlaylists(): Promise<void> {
    const user = this.user();
    if (!user) {
      this.errorMessage.set('User not authenticated');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      const playlists = await this.repository.getAllUserPlaylists(user.uid);
      this.playlists.set(playlists);
    } catch {
      this.errorMessage.set('Failed to load playlists');
    } finally {
      this.isLoading.set(false);
    }
  }

  async createPlaylist(data: CreatePlaylistData): Promise<void> {
    const user = this.user();
    if (!user) {
      this.errorMessage.set('User not authenticated');
      return;
    }
    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      const playlist = await this.repository.create(user.uid, data);
      this.playlists.update((playlists) => [...playlists, playlist]);
    } catch {
      this.errorMessage.set('Failed to create playlist');
    } finally {
      this.isLoading.set(false);
    }
  }

  async renamePlaylist(playlistId: string, name: string): Promise<void> {
    const user = this.user();
    if (!user) {
      this.errorMessage.set('User not authenticated');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      await this.repository.rename(user.uid, playlistId, name);
      this.playlists.update((playlists) =>
        playlists.map((playlist) => (playlist.id === playlistId ? { ...playlist, name } : playlist))
      );
    } catch {
      this.errorMessage.set('Failed to rename playlist');
    } finally {
      this.isLoading.set(false);
    }
  }

  async addTrackToPlaylist(playlistId: string, trackId: string): Promise<void> {
    const user = this.user();
    if (!user) {
      this.errorMessage.set('User not authenticated');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      await this.repository.addTrack(user.uid, playlistId, trackId);
      this.updatePlaylistTrackIds(playlistId, (trackIds) =>
        trackIds.includes(trackId) ? trackIds : [...trackIds, trackId]
      );
    } catch {
      this.errorMessage.set('Failed to add track to playlist');
    } finally {
      this.isLoading.set(false);
    }
  }

  async removeTrackFromPlaylist(playlistId: string, trackId: string): Promise<void> {
    const user = this.user();
    if (!user) {
      this.errorMessage.set('User not authenticated');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      await this.repository.removeTrack(user.uid, playlistId, trackId);
      this.updatePlaylistTrackIds(playlistId, (trackIds) => trackIds.filter((id) => id !== trackId));
    } catch {
      this.errorMessage.set('Failed to remove track from playlist');
    } finally {
      this.isLoading.set(false);
    }
  }

  async deletePlaylist(playlistId: string): Promise<void> {
    const user = this.user();
    if (!user) {
      this.errorMessage.set('User not authenticated');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    try {
      await this.repository.delete(user.uid, playlistId);
      this.playlists.update((playlists) => playlists.filter((playlist) => playlist.id !== playlistId));
    } catch {
      this.errorMessage.set('Failed to delete playlist');
    } finally {
      this.isLoading.set(false);
    }
  }
}
