import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: '[menu]',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  host: {
    id: 'menu',
    class: 'container-fluid',
  },
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {}
