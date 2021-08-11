import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../config/global';
import { Municipality } from '../models/municipality.model';

@Injectable({
  providedIn: 'root'
})
export class MunicipalityService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Municipality[]> {
    return this.http.get<Municipality[]>(`${config.apiUrl}/municipalities`);
  }

  getById(id:number): Observable<Municipality> {
    return this.http.get<Municipality>(`${config.apiUrl}/municipalities/${id}`);
  }

  create(municipality: Municipality): Observable<Municipality> {
    return this.http.post<Municipality>(`${config.apiUrl}/municipalities`, municipality);
  }

  update(id:number, data: Municipality): Observable<any> {
    return this.http.put(`${config.apiUrl}/municipalities/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${config.apiUrl}/municipalities/${id}`);
  }
}
