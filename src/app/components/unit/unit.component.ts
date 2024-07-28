import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Unit } from '../../data/unit.model';
import { UnitService } from '../../services/unit-service';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.css'
})
export class UnitComponent {
  @Input() unit!: Unit

  @Output() selected = new EventEmitter<Unit>()

  @Input() index!: number

  @Output() deleted = new EventEmitter<number>()

  menuOpen = false

  onUnitClicked() {
    this.selected.emit(this.unit)
  }

  constructor(private unitService: UnitService) {}

  deleteUnit() {
    console.log("deleting")
    this.unitService.delete(this.unit.id).subscribe(
      response => {
        console.log(response)
        this.deleted.emit(this.index)
      },
      error => {
        console.log(error)
      }
    )
  }
}
