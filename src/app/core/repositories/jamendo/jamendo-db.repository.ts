import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { JamendoRepository } from '@core/repositories/jamendo/jamendo.repository';
import { EndPoint, JamendoEndpointRequest, JamendoEndpointResponse } from '@core/models/jamendo/jamendo.model';
import { firstValueFrom } from 'rxjs';

type HttpParamValue = string | number | (string | number)[] | boolean | undefined | null;

@Injectable()
export class JamendoDbRepository implements JamendoRepository {
  private readonly http = inject(HttpClient);
  private convertJamendoParams(query: Record<string, HttpParamValue>): HttpParams {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null) {
        continue;
      }
      if (Array.isArray(value)) {
        params = params.set(key, value.map(String).join(' '));
      } else {
        params = params.set(key, value);
      }
    }
    return params;
  }

  async createRequest<T extends EndPoint>(
    endpoint: T,
    params: Omit<JamendoEndpointRequest[T], 'client_id' | 'format'>
  ): Promise<JamendoEndpointResponse[T]> {
    return firstValueFrom(
      this.http.get<JamendoEndpointResponse[T]>(`${environment.jamendoApiUrl}/${endpoint}/`, {
        params: this.convertJamendoParams({
          client_id: environment.jamendoClientId,
          format: 'json',
          ...params,
        }),
      })
    );
  }
}
