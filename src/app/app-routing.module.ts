import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { EducationComponent } from './education/education.component';
import { ContactComponent } from './contact/contact.component';
import { VolunteeringComponent } from './volunteering/volunteering.component';
import { ReadingComponent } from './reading/reading.component';

/**
 * A single menu entry. This is the source of truth for both the nav menu
 * (label, ordering, disabled state) and the router's route table
 * (route path + component). Disabled items stay in the list so the menu
 * can still render them (greyed out) and the router can still redirect
 * their paths to /home — edit `disabled: true` on an item to turn it off.
 */
export interface MenuItem {
  /** Visible label on the nav button. */
  readonly label: string;
  /** Route path segment (no leading slash). */
  readonly route: string;
  /** Ordering within the nav menu. Lower numbers appear first. */
  readonly order: number;
  /** When true, the nav button is rendered inert and the path redirects to /home. */
  readonly disabled: boolean;
  /** Component to mount when this route is active (ignored when disabled). */
  readonly component: Type<unknown>;
}

/**
 * Every nav item lives here. The order field controls display order;
 * the disabled flag controls both nav rendering and routing behaviour.
 */
export const MENU_ITEMS: readonly MenuItem[] = [
  {
    label: 'Introduction',
    route: 'home',
    order: 1,
    disabled: false,
    component: HomeComponent,
  },
  {
    label: 'Projects',
    route: 'projects',
    order: 2,
    disabled: false,
    component: ProjectsComponent,
  },
  {
    label: 'Education',
    route: 'education',
    order: 3,
    disabled: false,
    component: EducationComponent,
  },
  {
    label: 'Volunteering',
    route: 'volunteering',
    order: 4,
    disabled: false,
    component: VolunteeringComponent,
  },
  {
    label: 'Reading',
    route: 'reading',
    order: 5,
    disabled: true,
    component: ReadingComponent,
  },
  {
    label: 'Contact',
    route: 'contact',
    order: 6,
    disabled: false,
    component: ContactComponent,
  },
];

// Derived routes: active items mount their component; disabled items redirect to /home.
const activeRoutes: Routes = MENU_ITEMS.filter((m) => !m.disabled).map((m) => ({
  path: m.route,
  component: m.component,
}));

const disabledRedirects: Routes = MENU_ITEMS.filter((m) => m.disabled).map(
  (m) => ({ path: m.route, redirectTo: 'home', pathMatch: 'full' as const }),
);

export const routes: Routes = [
  ...activeRoutes,
  ...disabledRedirects,
  // Legacy /about redirects to the merged Home page.
  { path: 'about', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
