import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Unit } from '../../data/unit.model';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.css'
})
export class UnitComponent {
  @Input() unit!: Unit

  @Output() selected = new EventEmitter<Unit>()

  onUnitClicked() {
    this.selected.emit(this.unit)
  }
}
