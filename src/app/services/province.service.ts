import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../config/global';
import { Province } from '../models/province.model';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Province[]> {
    return this.http.get<Province[]>(`${config.apiUrl}/provinces`);
  }

  getById(id:number): Observable<Province> {
    return this.http.get<Province>(`${config.apiUrl}/provinces/${id}`);
  }

  create(province: Province): Observable<Province> {
    return this.http.post<Province>(`${config.apiUrl}/provinces`, province);
  }

  update(id:number, data: Province): Observable<any> {
    return this.http.put(`${config.apiUrl}/provinces/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${config.apiUrl}/provinces/${id}`);
  }
}
