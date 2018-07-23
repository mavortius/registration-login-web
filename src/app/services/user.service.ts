import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

const users_endpoint = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/${users_endpoint}`);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/${users_endpoint}/${id}`);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/${users_endpoint}`, user);
  }

  update(user: User): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${users_endpoint}/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/${users_endpoint}/${id}`);
  }
}
