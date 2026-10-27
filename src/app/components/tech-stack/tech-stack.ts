import { Component, computed, input, signal } from '@angular/core';
import { CoreTech, TechGroup } from '../../data/profile.model';
import { techIconUrl } from './tech-icons';

/**
 * Tecnologías: arriba el stack principal en fichas, debajo el resto como etiquetas.
 * "Otras tecnologías" se calcula sola: todo lo de TECH_GROUPS que no esté en CORE_STACK.
 */
@Component({
  selector: 'app-tech-stack',
  template: `
    <p class="intro">
      Trabajo sobre todo con este stack, y me muevo con soltura en el resto de herramientas que
      he ido usando en cada proyecto.
    </p>

    <h3 class="subhead">Stack principal</h3>
    <ul class="core">
      @for (tech of core(); track tech.name) {
        <li class="card">
          <span class="logo">
            @if (icon(tech.name); as src) {
              <img [src]="src" alt="" width="28" height="28" (error)="markFailed(tech.name)" />
            } @else {
              <span class="initials" aria-hidden="true">{{ initials(tech.name) }}</span>
            }
          </span>
          <span class="name">{{ tech.name }}</span>
          <span class="desc">{{ tech.description }}</span>
        </li>
      }
    </ul>

    @if (others().length) {
      <h3 class="subhead">Otras tecnologías</h3>
      <ul class="chips">
        @for (name of others(); track name) {
          <li class="chip">
            @if (icon(name); as src) {
              <img [src]="src" alt="" width="16" height="16" loading="lazy" (error)="markFailed(name)" />
            }
            {{ name }}
          </li>
        }
      </ul>
    }
  `,
  styles: `
    .intro {
      max-width: 60ch;
      color: var(--muted);
      margin: 0 0 32px;
    }
    .subhead {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--muted);
      letter-spacing: 0.01em;
      margin: 0 0 14px;
    }

    .core {
      list-style: none;
      margin: 0 0 36px;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
    }
    @media (max-width: 760px) {
      .core {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    .card {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 18px;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: var(--card);
      min-width: 0;
      transition: border-color 0.15s ease;
    }
    .card:hover {
      border-color: var(--olive);
    }
    .logo {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: var(--logo-bg);
      display: grid;
      place-items: center;
      margin-bottom: 10px;
    }
    .logo img {
      width: 28px;
      height: 28px;
      object-fit: contain;
    }
    .initials {
      font-family: var(--font-display);
      font-weight: 700;
      color: var(--olive);
    }
    .name {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 1.02rem;
    }
    .desc {
      font-size: 0.88rem;
      color: var(--muted);
      line-height: 1.4;
    }

    .chips {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border: 1px solid var(--line);
      border-radius: 8px;
      font-size: 0.9rem;
      color: var(--ink);
    }
    .chip img {
      width: 16px;
      height: 16px;
      object-fit: contain;
      border-radius: 3px;
      background: var(--logo-bg);
      padding: 1px;
      box-sizing: content-box;
    }
  `,
})
export class TechStack {
  readonly core = input.required<CoreTech[]>();
  readonly groups = input.required<TechGroup[]>();

  /** Tecnologías cuyo logo no ha cargado: se muestran sin logo (o con iniciales). */
  private readonly failed = signal<ReadonlySet<string>>(new Set());

  protected readonly others = computed(() => {
    const coreNames = new Set(this.core().map((t) => t.name));
    const all = this.groups().flatMap((g) => g.items);
    return [...new Set(all)].filter((name) => !coreNames.has(name));
  });

  protected icon(name: string): string | null {
    return this.failed().has(name) ? null : techIconUrl(name);
  }

  protected markFailed(name: string): void {
    this.failed.update((set) => new Set(set).add(name));
  }

  protected initials(name: string): string {
    return name
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase() ?? '')
      .join('');
  }
}
