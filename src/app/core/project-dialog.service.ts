import { Injectable, effect, signal } from '@angular/core';

/**
 * Estado del panel lateral de proyecto. Lo usan las tarjetas de Proyectos y los botones de Experiencia.
 */
@Injectable({ providedIn: 'root' })
export class ProjectDialogService {
  /** Proyecto abierto (por nombre) o null si el panel está cerrado. */
  readonly openName = signal<string | null>(null);
  /**
   * Último proyecto mostrado. Se mantiene al cerrar para que el contenido no desaparezca
   * mientras el panel sale deslizándose.
   */
  readonly shownName = signal<string | null>(null);

  private trigger: HTMLElement | null = null;

  constructor() {
    // Bloquea el scroll de la página mientras el panel está abierto.
    effect(() => {
      document.body.style.overflow = this.openName() === null ? '' : 'hidden';
    });
  }

  open(name: string, trigger: HTMLElement | null): void {
    // Solo se guarda el elemento de origen al abrir desde fuera (no al pasar de un proyecto a otro).
    if (this.openName() === null) this.trigger = trigger;
    this.openName.set(name);
    this.shownName.set(name);
    setTimeout(() => document.querySelector<HTMLElement>('.project-drawer .close')?.focus(), 80);
  }

  close(): void {
    if (this.openName() === null) return;
    this.openName.set(null);
    this.trigger?.focus();
  }
}
