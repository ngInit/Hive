import { InjectionToken } from '@angular/core';
import { EndPoint, JamendoEndpointResponse, JamendoRequestParams } from '@core/models/jamendo/jamendo.model';

export const JAMENDO_REPOSITORY = new InjectionToken<JamendoRepository>('JAMENDO_REPOSITORY');

type JamendoRequestFunction = <T extends EndPoint>(
  endpoint: T,
  params: JamendoRequestParams<T>
) => Promise<JamendoEndpointResponse[T]>;

export interface JamendoRepository {
  createRequest: JamendoRequestFunction;
}
