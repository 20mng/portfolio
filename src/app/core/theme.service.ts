import { Injectable, computed, effect, signal } from '@angular/core';

export type Theme = 'light' | 'dark';
const STORAGE_KEY = 'theme';

/** Tema claro/oscuro: sigue al sistema hasta que el usuario elige uno. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly systemPrefersDark = signal(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
  private readonly chosen = signal<Theme | null>(this.readStored());

  readonly current = computed<Theme>(
    () => this.chosen() ?? (this.systemPrefersDark() ? 'dark' : 'light'),
  );

  constructor() {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => this.systemPrefersDark.set(e.matches));

    effect(() => {
      const chosen = this.chosen();
      const root = document.documentElement;
      if (chosen) {
        root.setAttribute('data-theme', chosen);
      } else {
        root.removeAttribute('data-theme');
      }
    });
  }

  toggle(): void {
    this.set(this.current() === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    this.chosen.set(theme);
    // También se aplica al momento (sin esperar al efecto) para que las transiciones de vista lo capturen.
    document.documentElement.setAttribute('data-theme', theme);
    // También se aplica al momento (sin esperar al efecto) para que las transiciones de vista lo capturen.
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* almacenamiento no disponible: el tema se mantiene solo en esta visita */
    }
  }

  private readStored(): Theme | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch {
      return null;
    }
  }
}
