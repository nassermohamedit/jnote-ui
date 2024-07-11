import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl: string = 'http://localhost:8080/notes'

  constructor(private http: HttpClient) {}

  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
