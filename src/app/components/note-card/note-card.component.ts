import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { marked } from 'marked';
import { Note } from '../../data/note.model';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css'
})
export class NoteCardComponent {

  @Input() note!: Note;
  
  @Input() index!: number;

  menuOpen = false;

  @Output() delete = new EventEmitter<number>();

  constructor(private noteService: NoteService) {

  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  editNote(): void {
    this.menuOpen = false;
  }

  deleteNote(): void {
    this.menuOpen = false;
    this.noteService.deleteNote(this.note.id).subscribe(
      () => {
        this.delete.emit(this.index)
      },
      error => {
        // Do something!
      }
    )
  }


  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  mark(input: string) {
    return marked.parse(input);
  }
}
