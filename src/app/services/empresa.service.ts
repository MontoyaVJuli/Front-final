import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getEmpresas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/empresas/empresas`);
  }
}
