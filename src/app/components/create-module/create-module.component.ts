import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-create-module',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-module.component.html',
  styleUrl: './create-module.component.css'
})
export class CreateModuleComponent {

  moduleForm: FormGroup;

  error: string = '';

  constructor(private moduleService: ModuleService, private router: Router, fb: FormBuilder) {
    this.moduleForm = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  submitForm() {
    if (this.moduleForm.valid) {
      this.moduleService.createModule(this.moduleForm.getRawValue()).subscribe(
        () => {
          this.router.navigateByUrl('/');
        },
        (error) => {
          this.error =  'Failed to create module. Please try again.';
        }
      )
    }
  }
}
