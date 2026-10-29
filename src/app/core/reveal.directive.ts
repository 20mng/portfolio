import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/** Un único observador compartido por todos los elementos con appReveal. */
let observer: IntersectionObserver | null = null;

function sharedObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );
  return observer;
}

/**
 * Añade la clase .in cuando el elemento entra en pantalla.
 * - Por sí solo, el elemento sube y se funde (clase .reveal).
 * - Con la clase .masked, el elemento no se funde y solo animan sus <span class="mask">.
 * Uso: <p appReveal> o <p appReveal [revealDelay]="2"> para escalonar.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[style.--d]': 'revealDelay()',
  },
})
export class RevealDirective {
  readonly revealDelay = input(0);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) {
        el.classList.add('in');
        return;
      }
      sharedObserver().observe(el);
    });
    inject(DestroyRef).onDestroy(() => observer?.unobserve(el));
  }
}
