import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  userUrl: string = environment.userUrl;

  getUserById(id: number) {
    return this.http.get(`${this.userUrl}/${id}`);
  }
}
