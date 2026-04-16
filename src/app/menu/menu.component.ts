import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, ElementRef, QueryList, ViewChildren, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs';

import { MENU_ITEMS, MenuItem } from '../menu-items';

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
  readonly menuItems: readonly MenuItem[] = [...MENU_ITEMS].sort((a, b) => a.order - b.order);
  activeIndex = 0;

  @ViewChildren('navBtn', { read: ElementRef })
  navButtonRefs!: QueryList<ElementRef<HTMLButtonElement>>;

  private readonly doc = inject(DOCUMENT);

  private get enabledIndices(): number[] {
    return this.menuItems.map((item, i) => (item.disabled ? -1 : i)).filter((i) => i !== -1);
  }

  constructor() {
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);

    router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(destroyRef),
      )
      .subscribe(() => this.doc.getElementById('maincontent')?.focus());
  }

  onMenuKeydown(event: KeyboardEvent): void {
    const enabled = this.enabledIndices;
    const pos = enabled.indexOf(this.activeIndex);
    let next: number | undefined;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = enabled[(pos + 1) % enabled.length];
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = enabled[(pos - 1 + enabled.length) % enabled.length];
    } else if (event.key === 'Home') {
      next = enabled[0];
    } else if (event.key === 'End') {
      next = enabled[enabled.length - 1];
    }

    if (next !== undefined) {
      event.preventDefault();
      this.activeIndex = next;
      this.navButtonRefs.get(next)?.nativeElement.focus();
    }
  }
}
