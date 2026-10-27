import { Component, input } from '@angular/core';
import { Education as EducationItem } from '../../data/profile.model';

@Component({
  selector: 'app-education',
  template: `
    <div class="edu">
      @for (item of items(); track item.title) {
        <div>
          <h3>{{ item.title }}</h3>
          <div class="when">{{ item.center }} · {{ item.period }}</div>
        </div>
      }
      @if (certifications().length) {
        <div>
          <h3>Certificaciones</h3>
          <ul class="certs">
            @for (cert of certifications(); track cert) {
              <li>{{ cert }}</li>
            }
          </ul>
        </div>
      }
    </div>
  `,
  styles: `
    .edu {
      display: grid;
      gap: 28px;
    }
    h3 {
      font-size: 1.15rem;
      font-weight: 700;
    }
    .when {
      color: var(--muted);
      font-size: 0.92rem;
    }
    .certs {
      list-style: none;
      margin: 10px 0 0;
      padding: 0;
      display: grid;
      gap: 8px;
    }
    .certs li {
      padding-left: 18px;
      position: relative;
    }
    .certs li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.75em;
      width: 8px;
      height: 2px;
      background: var(--olive);
    }
  `,
})
export class Education {
  readonly items = input.required<EducationItem[]>();
  readonly certifications = input<string[]>([]);
}
