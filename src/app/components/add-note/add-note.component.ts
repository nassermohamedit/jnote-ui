import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private moduleService: ModuleService, private router: Router, fb: FormBuilder) {
    this.noteForm = fb.group({
      content: ['', Validators.required]
    })
  }

  submitForm() {
    if (this.noteForm.valid) {
      this.moduleService.addNewNote(this.moduleId, this.noteForm.getRawValue()).subscribe(
        () => {
          this.router.navigateByUrl(`/module/${this.moduleId}`);
        },
        error => {
          console.log('Failed to add note.', error);
          this.error = error;
        }
      )
    }
  }
}
