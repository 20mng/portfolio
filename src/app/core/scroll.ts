import { DestroyRef } from '@angular/core';

/**
 * Ejecuta `callback` una vez por fotograma mientras se hace scroll o cambia el tamaño de la ventana.
 * Los efectos escriben directamente en el DOM (variables CSS y clases), así que no disparan
 * la detección de cambios de Angular y el scroll va fluido.
 */
export function onScrollFrame(destroyRef: DestroyRef, callback: () => void): void {
  let ticking = false;
  const schedule = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      callback();
    });
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  callback();

  destroyRef.onDestroy(() => {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
  });
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}
