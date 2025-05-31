import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  private apiUrl = 'http://localhost:8080/api/v1/clientes';
  private http = inject(HttpClient);

  createClient(cliente: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, cliente);
  }

  getClient(): Observable<Client[] > {
    return this.http.get<Client[]>(this.apiUrl)
  }

  updateClient(cliente: Client): Observable<Client[] >{
    return this.http.put<Client[]>(`${this.apiUrl}`, cliente);
  }

  patchClient(id: string, partialClient: Partial<Client>): Observable<Client> {
    return this.http.patch<Client>(`${this.apiUrl}/${id}`, partialClient);
  }

  deleteClient(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  constructor() { }
}
