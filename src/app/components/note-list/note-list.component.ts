import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
export class NoteListComponent implements OnInit {
  notes: Note[] = []
  moduleId: number = 0;

  constructor(private moduleService: ModuleService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const moduleId = this.route.snapshot.paramMap.get('moduleId');
    if (moduleId) {
      this.moduleId = parseInt(moduleId);
      this.moduleService.getNotesInModule(this.moduleId).subscribe(
        notes => {
          this.notes = notes;
        },
        error => {
          console.log('Error fetching notes', error);
        }
      )
    }
  }

  addNewElement(note: Note) {
    this.notes.unshift(note);
  }

  removeElement(index: number) {
    this.notes.splice(index, 1);
  }
}
