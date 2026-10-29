import { Component, computed, input, signal } from '@angular/core';
import { TechGroup } from '../../data/profile.model';
import { RevealDirective } from '../../core/reveal.directive';
import { techIconUrl } from '../../data/tech-icons';
import { initials } from '../../core/text';

/**
 * Tecnologías por áreas con pestañas: a la izquierda las áreas y a la derecha las
 * tecnologías de la elegida, que aparecen escalonadas al cambiar de pestaña.
 * En móvil las áreas pasan a ser una fila de pestañas encima.
 */
@Component({
  selector: 'app-stack',
  imports: [RevealDirective],
  templateUrl: './stack.html',
  styleUrl: './stack.scss',
})
export class Stack {
  readonly groups = input.required<TechGroup[]>();

  protected readonly selected = signal(0);
  protected readonly current = computed(() => this.groups()[this.selected()] ?? null);

  private readonly failed = signal<ReadonlySet<string>>(new Set());

  protected select(index: number): void {
    this.selected.set(index);
  }

  /** Flechas del teclado para moverse entre pestañas (patrón de pestañas accesible). */
  protected onKey(event: KeyboardEvent): void {
    const count = this.groups().length;
    const keys: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };
    const step = keys[event.key];
    if (step === undefined) return;
    event.preventDefault();
    const next = (this.selected() + step + count) % count;
    this.selected.set(next);
    document.getElementById(`stack-tab-${next}`)?.focus();
  }

  protected icon(name: string): string | null {
    return this.failed().has(name) ? null : techIconUrl(name);
  }

  protected markFailed(name: string): void {
    this.failed.update((set) => new Set(set).add(name));
  }

  protected initialsOf(name: string): string {
    return initials(name);
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
