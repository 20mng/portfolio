import { Component, DestroyRef, afterNextRender, computed, inject, input, signal } from '@angular/core';
import { ProjectCase } from '../../data/profile.model';
import { RevealDirective } from '../../core/reveal.directive';
import { ProjectDialogService } from '../../core/project-dialog.service';
import { techIconUrl } from '../../data/tech-icons';

/**
 * Proyectos destacados en tarjetas. Al pulsar una se abre un panel lateral con el detalle
 * (reto, qué hice, tecnologías) y un botón para pasar al siguiente proyecto.
 */
@Component({
  selector: 'app-projects',
  imports: [RevealDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  readonly projects = input.required<ProjectCase[]>();

  protected readonly dialog = inject(ProjectDialogService);

  protected readonly isOpen = computed(() => this.dialog.openName() !== null);
  /** Proyecto que se muestra en el panel (se mantiene mientras se cierra). */
  protected readonly current = computed(
    () => this.projects().find((p) => p.name === this.dialog.shownName()) ?? null,
  );
  protected readonly position = computed(() => {
    const current = this.current();
    return current ? this.projects().indexOf(current) : -1;
  });
  protected readonly nextProject = computed(() => {
    const list = this.projects();
    const index = this.position();
    return list.length > 1 && index >= 0 ? (list[(index + 1) % list.length] ?? null) : null;
  });

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') this.dialog.close();
      };
      window.addEventListener('keydown', onKey);
      destroyRef.onDestroy(() => window.removeEventListener('keydown', onKey));
    });
  }

  protected show(project: ProjectCase, event: Event): void {
    this.dialog.open(project.name, event.currentTarget as HTMLElement);
  }

  protected goTo(project: ProjectCase): void {
    this.dialog.open(project.name, null);
    document.querySelector('.project-drawer .scroll')?.scrollTo({ top: 0 });
  }

  private readonly failedIcons = signal<ReadonlySet<string>>(new Set());

  protected icon(name: string): string | null {
    return this.failedIcons().has(name) ? null : techIconUrl(name);
  }

  protected markFailed(name: string): void {
    this.failedIcons.update((set) => new Set(set).add(name));
  }

  /** 0 → "01". */
  protected number(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  protected counter(): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(this.position() + 1)} / ${pad(this.projects().length)}`;
  }
}
