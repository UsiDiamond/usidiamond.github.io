import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: '[volunteering]',
  imports: [TranslateModule],
  host: {
    id: 'maincontent',
    tabindex: '-1',
    class: 'container mt-1 mb-5',
  },
  templateUrl: './volunteering.component.html',
  styleUrl: './volunteering.component.scss',
})
export class VolunteeringComponent {}
