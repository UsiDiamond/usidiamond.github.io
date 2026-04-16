import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LinksComponent } from './links/links.component';
import { SectionComponent } from './section/section.component';

@Component({
  selector: '[home]',
  imports: [TranslateModule, LinksComponent, SectionComponent],
  host: {
    id: 'maincontent',
    tabindex: '-1',
    class: 'container mt-1 mb-5',
  },
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
