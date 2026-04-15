import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: '[volunteering]',
  host: {
    id: 'maincontent',
    class: 'container mt-1 mb-5',
    style: 'background-color: rgba(255, 255, 255, 0.096); border-radius: 25px;',
  },
  imports: [TranslateModule],
  templateUrl: './volunteering.component.html',
  styleUrl: './volunteering.component.css',
})
export class VolunteeringComponent {}
