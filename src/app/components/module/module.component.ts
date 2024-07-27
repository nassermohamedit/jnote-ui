import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Module } from '../../data/module.model';
import { Unit } from '../../data/unit.model';
import { ModuleService } from '../../services/module.service';
import { AddUnitComponent } from '../add-unit/add-unit.component';
import { NoteListComponent } from "../note-list/note-list.component";
import { UnitListComponent } from "../unit-list/unit-list.component";
import { UnitComponent } from "../unit/unit.component";

@Component({
  selector: 'app-module',
  standalone: true,
  imports: [CommonModule, UnitComponent, UnitListComponent, NoteListComponent, AddUnitComponent],
  templateUrl: './module.component.html',
  styleUrl: './module.component.css'
})
export class ModuleComponent implements OnInit {
  // TODO - Pass module as input from module grid.

  moduleId: number
  
  module?: Module = undefined;

  selectedUnit?: Unit = undefined;

  formVisible = false

  newUnit?: Unit = undefined

  constructor(private moduleService: ModuleService, route: ActivatedRoute) {
    this.moduleId = Number(route.snapshot.paramMap.get('moduleId'))
  }

  ngOnInit(): void {
      this.moduleService.getModule(this.moduleId).subscribe(
        module => {
          this.module = module;
        }
      )
  }
}
