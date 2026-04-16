import { Component, DestroyRef, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { MENU_ITEMS, MenuItem } from '../app-routing.module';

@Component({
  selector: '[menu]',
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  host: {
    id: 'menu',
    class: 'container-fluid',
  },
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  readonly menuItems: readonly MenuItem[] = [...MENU_ITEMS].sort(
    (a, b) => a.order - b.order,
  );

  @ViewChildren('navBtn', { read: ElementRef })
  navButtonRefs!: QueryList<ElementRef<HTMLButtonElement>>;

  constructor() {
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);

    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(destroyRef),
      )
      .subscribe(() => {
        const el = document.getElementById('maincontent');
        el?.focus();
      });
  }
}
