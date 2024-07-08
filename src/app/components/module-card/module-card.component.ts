import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from '../../data/module.model';

@Component({
  selector: 'app-module-card',
  standalone: true,
  imports: [],
  templateUrl: './module-card.component.html',
  styleUrl: './module-card.component.css'
})
export class ModuleCardComponent {
  @Input() module!: Module;

  constructor(private router: Router) {}

  onCardClicked() {
    this.router.navigate([`/module/${this.module.id}`]);
  }
}
