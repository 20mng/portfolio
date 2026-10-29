import { Component, input } from '@angular/core';
import { RevealDirective } from '../../core/reveal.directive';

/** Sección de la columna derecha: número, título con línea y contenido. */
@Component({
  selector: 'app-section-block',
  imports: [RevealDirective],
  template: `
    <div class="head" appReveal>
      <span>{{ index() }}</span>
      <h2>{{ heading() }}</h2>
    </div>
    <ng-content />
  `,
  styles: `
    :host {
      display: block;
      padding-bottom: 112px;
      scroll-margin-top: 40px;
    }
    .head {
      display: flex;
      align-items: baseline;
      gap: 14px;
      margin-bottom: 32px;
    }
    .head::after {
      content: '';
      flex: 1;
      align-self: center;
      height: 1px;
      background: var(--line);
    }
    h2 {
      font-size: 1.6rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    span {
      color: var(--faint);
      font-size: 0.85rem;
      font-variant-numeric: tabular-nums;
    }
  `,
})
export class SectionBlock {
  readonly index = input.required<string>();
  readonly heading = input.required<string>();
}
