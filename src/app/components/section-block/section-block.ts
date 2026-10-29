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
    /* En móvil el título se queda pegado arriba mientras se lee la sección */
    @media (max-width: 1000px) {
      .head {
        position: sticky;
        top: 0;
        z-index: 5;
        margin-inline: -24px;
        /* A la derecha se deja sitio para el botón de tema fijo */
        padding: 14px 76px 14px 24px;
        background: color-mix(in srgb, var(--bg) 88%, transparent);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }
    }
  `,
})
export class SectionBlock {
  readonly index = input.required<string>();
  readonly heading = input.required<string>();
}
