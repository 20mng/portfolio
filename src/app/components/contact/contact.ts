import { Component, computed, input, signal } from '@angular/core';
import { Profile } from '../../data/profile.model';
import { RevealDirective } from '../../core/reveal.directive';

/** Contacto sobre el fondo de la página: titular, email grande (se copia al pulsar), enlaces y pie. */
@Component({
  selector: 'app-contact',
  imports: [RevealDirective],
  template: `
    <div class="contact" appReveal>
      <h3>¿Hablamos?</h3>
      <p>
        Si te interesa mi perfil, quieres comentar algún proyecto o simplemente conectar, mi bandeja de entrada está abierta.
      </p>

      <button type="button" class="email" (click)="copyEmail()" [attr.aria-label]="'Copiar ' + contact().email">
        <span class="address">{{ contact().email }}</span>
        <span class="hint">
          @if (copied()) {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Copiado
          } @else {
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copiar email
          }
        </span>
      </button>

      <div class="links">
        <a class="btn ghost" [href]="contact().linkedin" target="_blank" rel="noopener">
          LinkedIn
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </a>
        <a class="btn ghost" [href]="contact().github" target="_blank" rel="noopener">
          GitHub
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </a>
      </div>
    </div>

    <p class="footer">© 2026 {{ profile().fullName }} .</p>
  `,
  styles: `
    :host {
      display: block;
    }
    h3 {
      max-width: 18ch;
      font-size: clamp(2rem, 4vw, 2.9rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.05;
    }
    .contact > p {
      margin: 14px 0 0;
      max-width: 50ch;
      color: var(--muted);
    }

    /* Email grande: al pasar el ratón el subrayado se rellena con el color de acento */
    .email {
      all: unset;
      box-sizing: border-box;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px 20px;
      width: 100%;
      margin-top: 32px;
      padding: 0 0 14px;
      cursor: pointer;
      background:
        linear-gradient(var(--accent), var(--accent)) 0 100% / 0 2px no-repeat,
        linear-gradient(var(--line), var(--line)) 0 100% / 100% 1px no-repeat;
      transition: background-size 0.6s var(--ease);

      &:hover,
      &:focus-visible {
        background-size: 100% 2px, 100% 1px;
      }
      &:focus-visible {
        outline: none;
      }
    }
    .address {
      font: 700 clamp(1.5rem, 4vw, 2.4rem) / 1.1 var(--font-display);
      letter-spacing: -0.02em;
      overflow-wrap: anywhere;
      transition: color 0.3s;
    }
    .email:hover .address {
      color: var(--accent);
    }
    .hint {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding-bottom: 4px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--muted);

      svg {
        width: 16px;
        height: 16px;
      }
    }

    .links {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 24px;
    }
    .footer {
      margin: 48px 0 0;
      font-size: 0.85rem;
      color: var(--faint);
    }

    @media (prefers-reduced-motion: reduce) {
      .email,
      .address {
        transition: none;
      }
    }
  `,
})
export class Contact {
  readonly profile = input.required<Profile>();

  protected readonly contact = computed(() => this.profile().contact);
  protected readonly copied = signal(false);

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.contact().email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // Sin portapapeles: se abre el correo como alternativa.
      window.location.href = `mailto:${this.contact().email}`;
    }
  }
}
