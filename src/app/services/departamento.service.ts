import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getDepartamentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/departamentos/departamentos`);
  }
}
