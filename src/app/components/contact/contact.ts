import { Component, computed, input, signal } from '@angular/core';
import { Profile } from '../../data/profile.model';

@Component({
  selector: 'app-contact',
  template: `
    <p class="lead">¿Tienes un proyecto o una vacante? Hablemos.</p>
    <ul class="list">
      <li>
        <span class="label">Email</span>
        <a [href]="'mailto:' + contact().email">{{ contact().email }}</a>
        <button type="button" class="btn small" (click)="copyEmail()">
          {{ copied() ? 'Copiado' : 'Copiar' }}
        </button>
      </li>
      <li>
        <span class="label">LinkedIn</span>
        <a [href]="contact().linkedin" target="_blank" rel="noopener">{{ linkedinHandle() }}</a>
      </li>
      <li>
        <span class="label">GitHub</span>
        <a [href]="contact().github" target="_blank" rel="noopener">{{ githubHandle() }}</a>
      </li>
    </ul>
  `,
  styles: `
    .lead {
      font-family: var(--font-display);
      font-size: clamp(1.5rem, 3.4vw, 2.2rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.15;
      margin: 0 0 24px;
      max-width: 22ch;
    }
    .list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 12px;
    }
    li {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      min-width: 0;
    }
    a {
      overflow-wrap: anywhere;
    }
    .label {
      width: 6rem;
      color: var(--muted);
      font-size: 0.92rem;
    }
  `,
})
export class Contact {
  readonly profile = input.required<Profile>();
  protected readonly contact = computed(() => this.profile().contact);
  protected readonly copied = signal(false);

  protected readonly linkedinHandle = computed(() => this.lastPathSegment(this.contact().linkedin));
  protected readonly githubHandle = computed(() => this.lastPathSegment(this.contact().github));

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.contact().email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {
      /* sin portapapeles: el email sigue visible para copiarlo a mano */
    }
  }

  private lastPathSegment(url: string): string {
    return url.replace(/\/+$/, '').split('/').pop() ?? url;
  }
}
