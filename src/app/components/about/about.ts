import { Component, computed, input } from '@angular/core';
import { Profile, StackLayer } from '../../data/profile.model';
import { RevealDirective } from '../../core/reveal.directive';
import { boldParts } from '../../core/text';
import { StackScene } from '../stack-scene/stack-scene';

/** Sobre mí: párrafos y la pila 3D con las capas en las que trabajo. */
@Component({
  selector: 'app-about',
  imports: [RevealDirective, StackScene],
  template: `
    <div class="prose" appReveal>
      @for (paragraph of paragraphs(); track $index) {
        <p>
          @for (part of paragraph; track $index) {
            @if (part.bold) {
              <strong>{{ part.text }}</strong>
            } @else {
              {{ part.text }}
            }
          }
        </p>
      }
    </div>

    <figure class="layers" appReveal>
      <figcaption>
        <span class="eyebrow">Cómo trabajo</span>
        <b>De la interfaz a la base de datos, capa a capa</b>
      </figcaption>
      <app-stack-scene [layers]="layers()" />
    </figure>
  `,
  styles: `
    :host {
      display: block;
    }
    p {
      margin: 0 0 16px;
      max-width: 62ch;
      color: var(--muted);
    }
    strong {
      color: var(--ink);
      font-weight: 600;
    }
    /* Sin tarjeta: la pila queda sobre el fondo de la página, separada por una línea */
    .layers {
      margin: 40px 0 0;
      padding: 24px 0 0;
      border-top: 1px solid var(--line);
    }
    figcaption {
      display: grid;
      gap: 4px;
    }
    figcaption b {
      font: 700 1.15rem/1.3 var(--font-display);
    }
  `,
})
export class About {
  readonly profile = input.required<Profile>();
  readonly layers = input.required<StackLayer[]>();

  protected readonly paragraphs = computed(() => this.profile().about.map(boldParts));
}
