import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { withViewTransition } from '../../core/text';

/**
 * Botón de tema fijo arriba a la derecha, con tooltip.
 * Al pulsarlo, el nuevo tema se expande en círculo desde el botón.
 */
@Component({
  selector: 'app-theme-toggle',
  template: `
    <button type="button" class="toggle" (click)="toggle($event)" [attr.aria-label]="label()" aria-describedby="theme-tip">
      @if (theme.current() === 'dark') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      } @else {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      }
    </button>
    <span class="tip" id="theme-tip" role="tooltip">{{ label() }}</span>
  `,
  styles: `
    :host {
      position: fixed;
      top: max(16px, env(safe-area-inset-top, 0px));
      right: max(16px, env(safe-area-inset-right, 0px));
      z-index: 70;
    }
    .toggle {
      width: 44px;
      height: 44px;
      border-radius: 14px;
      border: 1px solid var(--line);
      background: color-mix(in srgb, var(--surface) 85%, transparent);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      color: var(--ink);
      display: grid;
      place-items: center;
      cursor: pointer;
      box-shadow: var(--shadow);
      transition: border-color 0.2s, color 0.2s, transform 0.3s var(--ease);
    }
    .toggle:hover {
      border-color: var(--accent);
      color: var(--accent);
    }
    .toggle:hover svg {
      transform: rotate(-20deg);
    }
    svg {
      width: 20px;
      height: 20px;
      transition: transform 0.4s var(--ease);
    }

    /* Tooltip: aparece debajo del botón al pasar el ratón o al enfocarlo con el teclado */
    .tip {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      padding: 7px 11px;
      border-radius: 8px;
      background: var(--ink);
      color: var(--bg);
      font-size: 0.8rem;
      font-weight: 500;
      white-space: nowrap;
      pointer-events: none;
      opacity: 0;
      transform: translateY(-4px);
      transition: opacity 0.2s, transform 0.25s var(--ease);
    }
    .tip::before {
      content: '';
      position: absolute;
      bottom: 100%;
      right: 16px;
      border: 6px solid transparent;
      border-bottom-color: var(--ink);
    }
    .toggle:hover + .tip,
    .toggle:focus-visible + .tip {
      opacity: 1;
      transform: none;
    }
    @media (prefers-reduced-motion: reduce) {
      .toggle,
      svg,
      .tip {
        transition: none;
      }
    }
  `,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
  protected readonly label = computed(() =>
    this.theme.current() === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro',
  );

  protected toggle(event: MouseEvent): void {
    const next = this.theme.current() === 'dark' ? 'light' : 'dark';
    const r = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = withViewTransition(() => this.theme.set(next));
    transition?.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(.2,.8,.2,1)', pseudoElement: '::view-transition-new(root)' },
      );
    });
  }
}
