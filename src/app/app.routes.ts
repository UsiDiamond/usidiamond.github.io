import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
    title: 'Usi Diamond — Introduction',
  },
  {
    path: 'projects',
    loadComponent: () => import('./projects/projects.component').then((m) => m.ProjectsComponent),
    title: 'Usi Diamond — Projects',
  },
  {
    path: 'education',
    loadComponent: () =>
      import('./education/education.component').then((m) => m.EducationComponent),
    title: 'Usi Diamond — Education & Training',
  },
  {
    path: 'volunteering',
    loadComponent: () =>
      import('./volunteering/volunteering.component').then((m) => m.VolunteeringComponent),
    title: 'Usi Diamond — Volunteering',
  },
  {
    path: 'reading',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component').then((m) => m.ContactComponent),
    title: 'Usi Diamond — Contact',
  },
  { path: 'about', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
