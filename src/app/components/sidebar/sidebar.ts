import { Component, DestroyRef, afterNextRender, computed, inject, input, signal } from '@angular/core';
import { Profile } from '../../data/profile.model';
import { onScrollFrame } from '../../core/scroll';
import { initials } from '../../core/text';

export interface NavItem {
  id: string;
  label: string;
}

/**
 * Columna fija de la izquierda: identidad, navegación con la sección activa y acciones.
 * En pantallas estrechas deja de ser fija y se convierte en la cabecera de la página.
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: { '[class.ready]': 'ready()' },
})
export class Sidebar {
  readonly profile = input.required<Profile>();
  readonly sections = input.required<NavItem[]>();

  /** Activa la entrada escalonada al cargar. */
  // Público porque se usa en el host binding.
  readonly ready = signal(false);
  protected readonly active = signal<string | null>(null);
  protected readonly photoFailed = signal(false);
  /** Foto si existe y ha cargado; si no, se muestran las iniciales. */
  protected readonly photoUrl = computed(() => (this.photoFailed() ? null : this.profile().photo));

  protected readonly title = computed(() => this.profile().role.split(':')[0]?.trim() ?? this.profile().role);
  protected readonly stack = computed(() => this.profile().role.split(':')[1]?.trim() ?? '');
  protected readonly nameLines = computed(() => this.profile().shortName.split(' '));
  protected readonly initials = computed(() => this.profile().initials);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      requestAnimationFrame(() => this.ready.set(true));
      onScrollFrame(destroyRef, () => {
        let current: string | null = this.sections()[0]?.id ?? null;
        for (const item of this.sections()) {
          const el = document.getElementById(item.id);
          if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) current = item.id;
        }
        if (current !== this.active()) this.active.set(current);
      });
    });
  }
}
