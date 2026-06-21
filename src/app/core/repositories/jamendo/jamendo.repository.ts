import { InjectionToken } from '@angular/core';
import { EndPoint, JamendoEndpointRequest, JamendoEndpointResponse } from '@core/models/jamendo/jamendo.model';

export const JAMENDO_REPOSITORY = new InjectionToken<JamendoRepository>('JAMENDO_REPOSITORY');

export interface JamendoRepository {
  createRequest<T extends EndPoint>(
    endpoint: T,
    params: Omit<JamendoEndpointRequest[T], 'client_id' | 'format'>
  ): Promise<JamendoEndpointResponse[T]>;
}
