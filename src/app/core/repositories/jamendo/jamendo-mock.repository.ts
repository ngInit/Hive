import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { JamendoRepository } from '@core/repositories/jamendo/jamendo.repository';
import { EndPoint, JamendoEndpointRequest, JamendoEndpointResponse } from '@core/models/jamendo/jamendo.model';
import { delay } from '@utils/delay';
import { artistsMock } from '@shared/mocks/artists.mock';
import { albumsMock } from '@shared/mocks/albums.mock';
import { tracksMock } from '@shared/mocks/tracks.mock';

@Injectable()
export class JamendoMockRepository implements JamendoRepository {
  private readonly mockData = {
    artists: artistsMock,
    albums: albumsMock,
    tracks: tracksMock,
  } satisfies JamendoEndpointResponse;
  async createRequest<T extends EndPoint>(
    endpoint: T,
    params: Omit<JamendoEndpointRequest[T], 'client_id' | 'format'>
  ): Promise<JamendoEndpointResponse[T]> {
    await delay(environment.mockDelayMs);
    void params;
    return this.mockData[endpoint];
  }
}
