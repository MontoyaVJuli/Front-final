import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Empleado} from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServiceService {
  private apiUrl = 'http://localhost:8080/api/v1/empleados';
  private http = inject(HttpClient);

  createEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.apiUrl, empleado);
  }

  getClient(): Observable<Empleado[] > {
    return this.http.get<Empleado[]>(this.apiUrl)
  }

  updateClient(empleado: Empleado): Observable<Empleado[] >{
    return this.http.put<Empleado[]>(`${this.apiUrl}`, empleado);
  }

  patchClient(id: string, partialEmpleado: Partial<Empleado>): Observable<Empleado> {
    return this.http.patch<Empleado>(`${this.apiUrl}/${id}`, partialEmpleado);
  }

  deleteClient(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  constructor() { }
}
