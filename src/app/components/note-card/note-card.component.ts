import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Note } from '../../data/note.model';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css'
})
export class NoteCardComponent {
  @Input() note!: Note;
}
