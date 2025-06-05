import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getCiudades(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ciudades/ciudades`);
  }
}
