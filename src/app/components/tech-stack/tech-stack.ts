import { Component, input } from '@angular/core';
import { TechGroup } from '../../data/profile.model';

@Component({
  selector: 'app-tech-stack',
  template: `
    <div class="tech-grid">
      @for (group of groups(); track group.name) {
        <div>
          <h3>{{ group.name }}</h3>
          <ul>
            @for (item of group.items; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </div>
      }
    </div>
  `,
  styles: `
    .tech-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 28px 32px;
    }
    h3 {
      font-size: 1.02rem;
      font-weight: 600;
      margin-bottom: 10px;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    li {
      padding: 5px 12px;
      border: 1px solid var(--line);
      border-radius: 8px;
      font-size: 0.93rem;
      background: var(--surface);
    }
  `,
})
export class TechStack {
  readonly groups = input.required<TechGroup[]>();
}
