import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
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
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  /** Nav items sorted by their declared order; drives the template loop. */
  readonly menuItems: readonly MenuItem[] = [...MENU_ITEMS].sort(
    (a, b) => a.order - b.order,
  );

  /**
   * Rendered nav buttons (one per menuItems entry). Exposed for tests so
   * they can inspect disabled state and routing without dom-querying.
   */
  @ViewChildren('navBtn', { read: ElementRef })
  navButtonRefs!: QueryList<ElementRef<HTMLButtonElement>>;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const mainContent = document.querySelector(
          '#maincontent',
        ) as HTMLElement;
        if (mainContent) {
          mainContent.focus();
        }
      });
  }
}
