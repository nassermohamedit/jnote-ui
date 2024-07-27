import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Module } from '../data/module.model';
import { Note } from '../data/note.model';
import { Unit } from '../data/unit.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private apiUrl: string = `${environment.backendUrl}`;

  constructor(private http: HttpClient) {}

  getModule(id: number): Observable<Module> {
    return this.http.get<Module>(`${this.apiUrl}/${id}`);

  }

  getModules(): Observable<Module[]> {
    return this.http.get<Module[]>(this.apiUrl);
  }

  createModule(module: any): Observable<any> {
    return this.http.post(this.apiUrl, module);
  }

  getUnits(moduleId: number): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${this.apiUrl}/${moduleId}/units`)
  }

  createUnit(moduleId: number, unit: Unit): Observable<any> {
    return this.http.post(`${this.apiUrl}/${moduleId}/units`, unit)
  }

  getNotesInUnit(unitId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/units/${unitId}/notes`);
  }

  addNewNote(unitId: number, note: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/units/${unitId}`, note);
  }
}
