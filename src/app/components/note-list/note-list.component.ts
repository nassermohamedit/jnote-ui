import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Note } from '../../data/note.model';
import { ModuleService } from '../../services/module.service';
import { AddNoteComponent } from "../add-note/add-note.component";
import { NoteCardComponent } from '../note-card/note-card.component';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NoteCardComponent, AddNoteComponent],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent implements OnInit, OnChanges {
  
  @Input() unitId: number = 1;
  
  notes: Note[] = []

  constructor(private moduleService: ModuleService) { }

  loadNotes() {
    if (!this.unitId) return
    this.moduleService.getNotesInUnit(this.unitId).subscribe(
      notes => {
        this.notes = notes;
      },
      error => {
        console.log('Error fetching notes', error);
      }
    )
  }

  ngOnInit(): void {
    this.loadNotes()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadNotes()
  }

  addNewElement(note: Note) {
    this.notes.unshift(note);
  }

  removeElement(index: number) {
    this.notes.splice(index, 1);
  }
}
