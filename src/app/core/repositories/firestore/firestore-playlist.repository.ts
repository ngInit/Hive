import { Injectable } from '@angular/core';
import { firestoreDb } from '@core/firebase/firebase-app';
import { PlaylistRepository } from '@core/repositories/firestore/playlist.repository';
import { Playlist, CreatePlaylistData, PlaylistResponse } from '@core/models/playlist.model';
import {
  collection,
  doc,
  QueryDocumentSnapshot,
  getDocs,
  getDoc,
  setDoc,
  arrayUnion,
  updateDoc,
  arrayRemove,
  deleteDoc,
} from 'firebase/firestore';

const PLAYLIST_COLLECTION = 'playlists';
const PLAYLIST_USERS_COLLECTION = 'users';
const FAVORITES_PLAYLIST_NAME = 'Favorites';
export const FAVORITES_PLAYLIST_ID = 'favorites';

@Injectable()
export class FirestorePlaylistRepository implements PlaylistRepository {
  private getAllPlaylists(uid: string) {
    return collection(firestoreDb, PLAYLIST_USERS_COLLECTION, uid, PLAYLIST_COLLECTION);
  }

  private getPlaylistDocument(uid: string, playlistId: string) {
    return doc(this.getAllPlaylists(uid), playlistId);
  }

  private isPlaylist(data: unknown): data is PlaylistResponse {
    if (typeof data !== 'object' || data === null) {
      return false;
    }
    return 'name' in data && typeof data.name === 'string' && 'trackIds' in data && Array.isArray(data.trackIds);
  }

  private mapSnapshot(snapshot: QueryDocumentSnapshot): Playlist {
    const data = snapshot.data();
    if (this.isPlaylist(data)) {
      return {
        id: snapshot.id,
        name: data.name,
        trackIds: data.trackIds,
      };
    }
    throw new Error('Invalid playlist');
  }

  async createFavoritePlaylist(uid: string): Promise<void> {
    const favorites = doc(this.getAllPlaylists(uid), FAVORITES_PLAYLIST_ID);
    const snapshot = await getDoc(favorites);
    if (snapshot.exists()) {
      return;
    }
    await setDoc(favorites, { name: FAVORITES_PLAYLIST_NAME, trackIds: [] });
  }

  async getAllUserPlaylists(uid: string): Promise<Playlist[]> {
    const snapshot = await getDocs(this.getAllPlaylists(uid));
    return snapshot.docs.map((playlistSnapshot) => this.mapSnapshot(playlistSnapshot));
  }

  async create(uid: string, data: CreatePlaylistData): Promise<Playlist> {
    const document: PlaylistResponse = {
      name: data.name,
      trackIds: [],
    };
    const newPlaylist = doc(this.getAllPlaylists(uid));
    await setDoc(newPlaylist, document);
    return {
      id: newPlaylist.id,
      name: data.name,
      trackIds: [],
    };
  }

  async rename(uid: string, playlistId: string, name: string): Promise<void> {
    await updateDoc(this.getPlaylistDocument(uid, playlistId), { name });
  }

  async addTrack(uid: string, playlistId: string, trackId: string): Promise<void> {
    await updateDoc(this.getPlaylistDocument(uid, playlistId), {
      trackIds: arrayUnion(trackId),
    });
  }

  async removeTrack(uid: string, playlistId: string, trackId: string): Promise<void> {
    await updateDoc(this.getPlaylistDocument(uid, playlistId), {
      trackIds: arrayRemove(trackId),
    });
  }

  async delete(uid: string, playlistId: string): Promise<void> {
    await deleteDoc(this.getPlaylistDocument(uid, playlistId));
  }
}
