import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { EducationComponent } from './education/education.component';
import { ContactComponent } from './contact/contact.component';
import { VolunteeringComponent } from './volunteering/volunteering.component';
import { ReadingComponent } from './reading/reading.component';

export interface MenuItem {
  readonly labelKey: string;
  readonly route: string;
  readonly order: number;
  readonly disabled: boolean;
  readonly component: Type<unknown>;
  readonly title: string;
}

export const MENU_ITEMS: readonly MenuItem[] = [
  {
    labelKey: 'menu.introduction',
    route: 'home',
    order: 1,
    disabled: false,
    component: HomeComponent,
    title: 'Usi Diamond — Introduction',
  },
  {
    labelKey: 'menu.projects',
    route: 'projects',
    order: 2,
    disabled: false,
    component: ProjectsComponent,
    title: 'Usi Diamond — Projects',
  },
  {
    labelKey: 'menu.education',
    route: 'education',
    order: 3,
    disabled: false,
    component: EducationComponent,
    title: 'Usi Diamond — Education & Training',
  },
  {
    labelKey: 'menu.volunteering',
    route: 'volunteering',
    order: 4,
    disabled: false,
    component: VolunteeringComponent,
    title: 'Usi Diamond — Volunteering',
  },
  {
    labelKey: 'menu.reading',
    route: 'reading',
    order: 5,
    disabled: true,
    component: ReadingComponent,
    title: 'Usi Diamond — Reading',
  },
  {
    labelKey: 'menu.contact',
    route: 'contact',
    order: 6,
    disabled: false,
    component: ContactComponent,
    title: 'Usi Diamond — Contact',
  },
];

const activeRoutes: Routes = MENU_ITEMS.filter((m) => !m.disabled).map((m) => ({
  path: m.route,
  component: m.component,
  title: m.title,
}));

const disabledRedirects: Routes = MENU_ITEMS.filter((m) => m.disabled).map(
  (m) => ({ path: m.route, redirectTo: 'home', pathMatch: 'full' as const }),
);

export const routes: Routes = [
  ...activeRoutes,
  ...disabledRedirects,
  { path: 'about', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      enableViewTransitions: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
