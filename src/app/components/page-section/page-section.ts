import { Component, input } from '@angular/core';

/** Bloque de sección: título a la izquierda y contenido a la derecha. */
@Component({
  selector: 'app-page-section',
  template: `
    <h2>{{ heading() }}</h2>
    <div class="content"><ng-content /></div>
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: 220px 1fr;
      gap: 40px;
      padding-block: 56px;
      border-top: 1px solid var(--line);
      scroll-margin-top: 16px;
    }
    :host > * {
      min-width: 0;
    }
    h2 {
      font-size: 1.6rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    @media (max-width: 820px) {
      :host {
        grid-template-columns: 1fr;
        gap: 20px;
        padding-block: 44px;
      }
    }
  `,
})
export class PageSection {
  readonly heading = input.required<string>();
}
