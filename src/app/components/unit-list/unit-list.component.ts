import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Unit } from '../../data/unit.model';
import { ModuleService } from '../../services/module.service';
import { AddUnitComponent } from "../add-unit/add-unit.component";
import { UnitComponent } from '../unit/unit.component';

@Component({
  selector: 'app-unit-list',
  standalone: true,
  imports: [CommonModule, UnitComponent, AddUnitComponent],
  templateUrl: './unit-list.component.html',
  styleUrl: './unit-list.component.css'
})
export class UnitListComponent implements OnInit {

  @Input() moduleId!: number
  
  units: Unit[] = []

  @Output() unitSelected = new EventEmitter<number>()

  formVisible = false

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

  onUnitCreated(unit: Unit) {
    this.units.unshift(unit);
  }
}
