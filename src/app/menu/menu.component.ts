import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';

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
export class MenuComponent {
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const mainHeader = document.querySelector(
          '#maincontent',
        ) as HTMLElement;
        if (mainHeader) {
          mainHeader.focus();
        }
      });
  }
}
