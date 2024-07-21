import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Module } from '../../data/module.model';
import { ModuleService } from '../../services/module.service';
import { CreateModuleComponent } from '../create-module/create-module.component';
import { ModuleCardComponent } from '../module-card/module-card.component';

@Component({
  selector: 'app-module-grid',
  standalone: true,
  imports: [CreateModuleComponent, ModuleCardComponent, CommonModule, RouterLink],
  templateUrl: './module-grid.component.html',
  styleUrl: './module-grid.component.css'
})
export class ModuleGridComponent implements OnInit {

  modules: Module[] = [];

  showNewModuleForm = false;

  constructor(private moduleService: ModuleService) {}

  ngOnInit(): void {
      this.moduleService.getModules().subscribe(
        (data: Module[]) => {
          this.modules = data;
        },
        (error) => {
          console.log('Failed to fetch modules', error);
        }
      )
  }

  onModuleCreated(module: Module) {
    this.modules.unshift(module);
  }
}
