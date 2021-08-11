import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { config } from '../config/global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${config.apiUrl}/users`);
  }

  getUser(id:number): Observable<User> {
    return this.http.get<User>(`${config.apiUrl}/users/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(`${config.apiUrl}/users`, user);
  }

  update(id:number, data: User): Observable<any> {
    return this.http.put(`${config.apiUrl}/users/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${config.apiUrl}/users/${id}`);
  }
}
