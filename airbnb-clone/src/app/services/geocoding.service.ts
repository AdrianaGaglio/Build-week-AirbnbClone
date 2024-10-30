import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private apiUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  geocode(placeName: string): Observable<any> {
    const params = {
      q: placeName,
      format: 'json',
      addressdetails: '1',
      limit: '1', // Limita a 1 risultato per avere solo la corrispondenza più rilevante
    };
    return this.http.get<any>(this.apiUrl, { params });
  }
  searchGeocode(placeName: string): Observable<any> {
    const params = {
      q: placeName,
      format: 'json',
      addressdetails: '1',
      limit: '6', // Limita a 1 risultato per avere solo la corrispondenza più rilevante
    };
    return this.http.get<any>(this.apiUrl, { params });
  }
}
