import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  private apiUrl: string = `${environment.backendUrl}/units`;

  constructor(private http: HttpClient) { }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }
}
