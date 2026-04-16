import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TechBadgeComponent } from '../tech-badge/tech-badge.component';

@Component({
  selector: '[projects]',
  imports: [TranslateModule, TechBadgeComponent],
  host: {
    id: 'maincontent',
    tabindex: '-1',
    class: 'container mt-1 mb-5',
  },
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {}
