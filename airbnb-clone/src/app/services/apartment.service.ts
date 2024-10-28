import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iApartment } from '../interfaces/iapartment';

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  constructor(private http: HttpClient) {}

  getApartments() {
    return this.http.get<iApartment[]>('http://localhost:3000/apartments');
  }

  getApartmentById(id: number) {
    return this.http.get<iApartment>(`http://localhost:3000/apartments/${id}`);
  }

  addApartament(apartament: Partial<iApartment>) {
    return this.http.post('http://localhost:3000/apartments', apartament);
  }

  getApartamentByUser(userId: number) {
    return this.http.get<iApartment[]>(
      `http://localhost:3000/apartments/userId=${userId}`
    );
  }
}
