import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TechBadgeComponent } from '../tech-badge/tech-badge.component';

@Component({
  selector: '[projects]',
  host: {
    id: 'maincontent',
    tabindex: '-1',
    class: 'container mt-1 mb-5',
    style: 'background-color: rgba(255, 255, 255, 0.096); border-radius: 25px;',
  },
  imports: [TranslateModule, TechBadgeComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {}
