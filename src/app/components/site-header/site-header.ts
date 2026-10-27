import { Component, inject, input } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-site-header',
  template: `
    <header class="topbar">
      <a class="brand" href="#">{{ name() }}</a>
      <nav class="nav" aria-label="Secciones">
        <a href="#sobre-mi">Sobre mí</a>
        <a href="#experiencia">Experiencia</a>
        <a href="#tecnologias">Tecnologías</a>
        <a href="#contacto">Contacto</a>
        <button
          type="button"
          class="theme-toggle"
          (click)="theme.toggle()"
          [attr.aria-label]="theme.current() === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
        >
          {{ theme.current() === 'dark' ? 'Modo claro' : 'Modo oscuro' }}
        </button>
      </nav>
    </header>
  `,
  styles: `
    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      padding-block: 24px;
      flex-wrap: wrap;
    }
    .brand {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.15rem;
      letter-spacing: -0.01em;
      color: var(--ink);
      text-decoration: none;
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
      font-size: 0.95rem;
    }
    .nav a {
      color: var(--muted);
      text-decoration: none;
    }
    .nav a:hover {
      color: var(--ink);
    }
    .theme-toggle {
      font: inherit;
      font-size: 0.85rem;
      color: var(--muted);
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: 999px;
      padding: 4px 12px;
      cursor: pointer;
    }
    .theme-toggle:hover {
      color: var(--ink);
    }
    @media (max-width: 440px) {
      .nav {
        gap: 14px;
      }
    }
  `,
})
export class SiteHeader {
  readonly name = input.required<string>();
  protected readonly theme = inject(ThemeService);
}
