import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  moduleId: number = 0;

  constructor(private moduleService: ModuleService, private router: Router, private route: ActivatedRoute, fb: FormBuilder) {
    this.noteForm = fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    })
    const moduleId = this.route.snapshot.paramMap.get('moduleId')
    if (moduleId != null) {
      this.moduleId = parseInt(moduleId);
    }
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
