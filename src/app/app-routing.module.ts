import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { EducationComponent } from './education/education.component';
import { ContactComponent } from './contact/contact.component';
import { VolunteeringComponent } from './volunteering/volunteering.component';
import { ReadingComponent } from './reading/reading.component';
import { DISABLED_ROUTES } from './disabled-routes';

// The full route table. Any path listed in DISABLED_ROUTES is stripped below
// and replaced with a redirect to /home.
const ACTIVE_ROUTE_TABLE: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'education', component: EducationComponent },
  { path: 'volunteering', component: VolunteeringComponent },
  { path: 'reading', component: ReadingComponent },
  { path: 'contact', component: ContactComponent },
];

const disabledRedirects: Routes = DISABLED_ROUTES.map((path) => ({
  path,
  redirectTo: 'home',
  pathMatch: 'full' as const,
}));

export const routes: Routes = [
  ...ACTIVE_ROUTE_TABLE.filter(
    (r) => typeof r.path === 'string' && !DISABLED_ROUTES.includes(r.path),
  ),
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
