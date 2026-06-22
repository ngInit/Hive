import { Injectable, signal, resource } from '@angular/core';
import { TracksRepository } from '@core/repositories/tracks/tracks.repository';
import { delay } from '@utils/delay';
import { environment } from '@env/environment';
import { tracksMock } from '@shared/mocks/tracks.mock';

@Injectable()
export class MockTracksRepository implements TracksRepository {
  private readonly searchQuery = signal('');

  readonly tracks = resource({
    params: () => this.searchQuery() || undefined,
    loader: () => delay(environment.mockDelayMs).then(() => tracksMock),
  });

  search(query: string): void {
    this.searchQuery.set(query);
  }
}
