import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from '../data/module.model';
import { Note } from '../data/note.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private apiUrl: string = "http://localhost:8080/";

  constructor(private http: HttpClient) {}

  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(this.apiUrl);
  }

  createModule(module: any): Observable<any> {
    return this.http.post(this.apiUrl, module);
  }

  getNotesInModule(moduleId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/${moduleId}/notes`);
  }

  addNewNote(moduleId: number, note: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${moduleId}`, note);
  }
}
