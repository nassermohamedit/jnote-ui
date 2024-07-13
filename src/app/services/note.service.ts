import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl: string = `${environment.backendUrl}/notes`;

  constructor(private http: HttpClient) {}

  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
