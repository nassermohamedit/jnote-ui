import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class UnitListComponent implements OnInit, OnChanges {

  @Input() moduleId!: number
  
  units: Unit[] = []

  @Output() unitSelected = new EventEmitter<Unit>()

  @Input() newUnit?: Unit;

  constructor(private moduleService: ModuleService) {
  }

  ngOnInit() {
    this.moduleService.getUnits(this.moduleId).subscribe(
      units => {
        this.units = units
        this.unitSelected.emit(this.units[0])
      },
      error => {
        console.log(error)
      }
    )
  }

  onUnitSelected(unit: Unit) {
    this.unitSelected.emit(unit)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newUnit'] && changes['newUnit'].currentValue) {
        this.units.unshift(this.newUnit!);
    }
  }
}
