import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { StackLayer } from '../../data/profile.model';
import { clamp01, onScrollFrame, prefersReducedMotion } from '../../core/scroll';

/**
 * Pila 3D de capas con una leyenda al lado (cada capa con su color).
 * - Al aparecer en pantalla, las capas caen una a una.
 * - Se separan cuanto más cerca está del centro de la pantalla (vista "explotada").
 * - Con el ratón encima, la pila se inclina hacia el cursor.
 * - Al pasar por una capa se ilumina; al pasar por su etiqueta, además se eleva.
 */
@Component({
  selector: 'app-stack-scene',
  template: `
    <div class="scene" #scene aria-hidden="true">
      <div class="iso">
        @for (layer of layers(); track layer.name; let i = $index; let count = $count) {
          <div
            class="slab"
            [class.hot]="lifted() === i"
            [class.raise]="raised() === i"
            [style.--z]="count - 1 - i"
            [style.--c]="color(i)"
            (pointerenter)="lifted.set(i)"
            (pointerleave)="lifted.set(null)"
          ></div>
        }
      </div>
    </div>

    <ul class="legend" aria-label="Mi stack por capas">
      @for (layer of layers(); track layer.name; let i = $index) {
        <li
          [class.lift]="lifted() === i"
          [style.--c]="color(i)"
          (pointerenter)="lifted.set(i); raised.set(i)"
          (pointerleave)="lifted.set(null); raised.set(null)"
        >
          <span class="swatch" aria-hidden="true"></span>
          <b>{{ layer.name }}</b>
          <span class="techs">{{ layer.technologies.join(', ') }}</span>
        </li>
      }
    </ul>
  `,
  host: {
    '[class.ready]': 'ready()',
    '[class.settled]': 'settled()',
  },
  styleUrl: './stack-scene.scss',
})
export class StackScene {
  readonly layers = input.required<StackLayer[]>();

  // Públicos porque se usan en los host bindings y en los eventos de la plantilla.
  readonly ready = signal(false);
  readonly settled = signal(false);
  /** Capa resaltada (por el ratón sobre la capa o sobre su etiqueta). */
  readonly lifted = signal<number | null>(null);
  /** Capa elevada sobre las demás: solo desde la leyenda, para que no parpadee bajo el cursor. */
  readonly raised = signal<number | null>(null);

  private readonly scene = viewChild.required<ElementRef<HTMLElement>>('scene');

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // Las capas caen cuando la pila entra en pantalla, no al cargar la página.
      const appear = () => {
        this.ready.set(true);
        const timer = setTimeout(() => this.settled.set(true), 1600);
        destroyRef.onDestroy(() => clearTimeout(timer));
      };
      if ('IntersectionObserver' in window && !prefersReducedMotion()) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry?.isIntersecting) {
              observer.disconnect();
              appear();
            }
          },
          { threshold: 0.3 },
        );
        observer.observe(host);
        destroyRef.onDestroy(() => observer.disconnect());
      } else {
        appear();
      }

      if (prefersReducedMotion()) return;

      // Separación máxima cuando la pila pasa por el centro de la pantalla.
      onScrollFrame(destroyRef, () => {
        const r = host.getBoundingClientRect();
        const vh = window.innerHeight;
        const distance = Math.abs(r.top + r.height / 2 - vh / 2);
        host.style.setProperty('--explode', clamp01(1 - distance / (vh * 0.55)).toFixed(3));
      });

      // Inclinación hacia el cursor (en toda la zona: pila y leyenda).
      const scene = this.scene().nativeElement;
      const move = (e: PointerEvent) => {
        const r = scene.getBoundingClientRect();
        const x = Math.max(-0.8, Math.min(0.8, (e.clientX - r.left) / r.width - 0.5));
        const y = Math.max(-0.8, Math.min(0.8, (e.clientY - r.top) / r.height - 0.5));
        host.style.setProperty('--rz', `${(x * 14).toFixed(2)}deg`);
        host.style.setProperty('--rx', `${(y * -10).toFixed(2)}deg`);
      };
      const leave = () => {
        host.style.setProperty('--rz', '0deg');
        host.style.setProperty('--rx', '0deg');
      };
      host.addEventListener('pointermove', move);
      host.addEventListener('pointerleave', leave);
      destroyRef.onDestroy(() => {
        host.removeEventListener('pointermove', move);
        host.removeEventListener('pointerleave', leave);
      });
    });
  }

  /** Color de cada capa: hay 5 tonos y se repiten si añades más capas. */
  color(index: number): string {
    return `var(--slab-${(index % 5) + 1})`;
  }
}
