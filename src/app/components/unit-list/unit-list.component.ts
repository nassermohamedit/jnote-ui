import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Unit } from '../../data/unit.model';
import { ModuleService } from '../../services/module.service';
import { UnitComponent } from '../unit/unit.component';

@Component({
  selector: 'app-unit-list',
  standalone: true,
  imports: [CommonModule, UnitComponent],
  templateUrl: './unit-list.component.html',
  styleUrl: './unit-list.component.css'
})
export class UnitListComponent implements OnInit {

  @Input() moduleId!: number
  
  units: Unit[] = []

  @Output() unitSelected = new EventEmitter<number>()

  constructor(private moduleService: ModuleService) {
  }

  ngOnInit() {
    this.moduleService.getUnits(this.moduleId).subscribe(
      units => {
        this.units = units
      },
      error => {
        console.log(error)
      }
    )
  }

  onUnitSelected(unitId: number) {
    this.unitSelected.emit(unitId)
  }
}
