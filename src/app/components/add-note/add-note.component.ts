import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from '../../data/note.model';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-add-note',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})
export class AddNoteComponent {

  noteForm: FormGroup;
  error: string = '';

  @Input() moduleId!: number;

  @Output() newNote = new EventEmitter<Note>();

  constructor(private moduleService: ModuleService, private router: Router, fb: FormBuilder) {
    this.noteForm = fb.group({
      content: ['', Validators.required]
    })
  }

  submitForm() {
    if (this.noteForm.valid) {
      this.moduleService.addNewNote(this.moduleId, this.noteForm.getRawValue()).subscribe(
        (note) => {
          this.newNote.emit(note);
          this.noteForm.reset();
        },
        error => {
          console.log('Failed to add note.', error);
          this.error = error;
        }
      )
    }
  }
}
