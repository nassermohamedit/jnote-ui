import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Unit } from '../../data/unit.model';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-add-unit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-unit.component.html',
  styleUrl: './add-unit.component.css'
})
export class AddUnitComponent {

  @Input() moduleId!: number

  @Output() newUnit = new EventEmitter<Unit>()

  @Output() hideMe = new EventEmitter<boolean>()

  unitForm: FormGroup

  constructor(private moduleService: ModuleService, fb: FormBuilder) {
    this.unitForm = fb.group({
      name: ['', Validators.required],
      description: ['']
    })
  }

  addUnit() {
    if (this.unitForm.valid) {
      const unit = this.unitForm.getRawValue();
      this.moduleService.createUnit(this.moduleId, unit).subscribe(
        (response) => {
          this.hideMe.emit(true)
          this.newUnit.emit(response);
        }
      )
    }
  }
  onCancelClicked() {
    this.hideMe.emit(true);
  }
}
