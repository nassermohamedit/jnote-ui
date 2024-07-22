import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unit } from '../../data/unit.model';
import { NoteListComponent } from "../note-list/note-list.component";
import { UnitListComponent } from "../unit-list/unit-list.component";
import { UnitComponent } from "../unit/unit.component";

@Component({
  selector: 'app-module',
  standalone: true,
  imports: [CommonModule, UnitComponent, UnitListComponent, NoteListComponent],
  templateUrl: './module.component.html',
  styleUrl: './module.component.css'
})
export class ModuleComponent {

  //@Input() module!: Module
  moduleId: number
  
  selectedUnit?: Unit = undefined;

  constructor(route: ActivatedRoute) {
    this.moduleId = Number(route.snapshot.paramMap.get('moduleId'))
  }
}
