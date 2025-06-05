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

  createEmpleado(empleado: Empleado): Observable<string> {
    return this.http.post(this.apiUrl, empleado, { responseType: 'text' });
  }


  getEmpleado(): Observable<Empleado[] > {
    return this.http.get<Empleado[]>(this.apiUrl)
  }

  updateEmpleado(empleado: Empleado): Observable<Empleado[] >{
    return this.http.put<Empleado[]>(`${this.apiUrl}`, empleado);
  }

  patchEmpleado(id: string, partialEmpleado: Partial<Empleado>): Observable<Empleado> {
    return this.http.patch<Empleado>(`${this.apiUrl}/${id}`, partialEmpleado);
  }

  deleteEmpleado(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  constructor() { }
}
