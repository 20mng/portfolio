import { Component, inject, input } from '@angular/core';
import { Job } from '../../data/profile.model';
import { RevealDirective } from '../../core/reveal.directive';
import { ProjectDialogService } from '../../core/project-dialog.service';

/**
 * Experiencia: al pasar el ratón por un puesto se resalta y los demás se atenúan.
 * Si el puesto tiene proyectos, salen como botones que abren su detalle.
 */
@Component({
  selector: 'app-experience',
  imports: [RevealDirective],
  template: `
    <ol class="jobs">
      @for (job of jobs(); track job.company + job.period; let i = $index) {
        <li class="job" appReveal [revealDelay]="i">
          <time class="eyebrow">{{ job.period }}</time>
          <div>
            <h3>
              {{ job.role }}
              <span class="company">· {{ job.company }}</span>
            </h3>
            <ul>
              @for (item of job.highlights; track item) {
                <li>{{ item }}</li>
              }
            </ul>
            <div class="tags">
              @for (tag of job.tags; track tag) {
                <span class="tag">{{ tag }}</span>
              }
            </div>

            @if (job.projects?.length) {
              <div class="projects">
                <span class="eyebrow">Proyectos</span>
                @for (name of job.projects ?? []; track name) {
                  <button type="button" class="project-link" (click)="openProject(name, $event)">
                    {{ name }}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </button>
                }
              </div>
            }
          </div>
        </li>
      }
    </ol>
  `,
  styles: `
    :host {
      display: block;
    }
    .jobs {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 8px;
    }
    .job {
      position: relative;
      overflow: hidden;
      isolation: isolate;
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: 24px;
      margin-inline: -22px;
      padding: 22px;
      border-radius: 16px;
      border: 1px solid transparent;
      transition:
        opacity 0.8s var(--ease),
        transform 0.8s var(--ease),
        background-color 0.3s,
        border-color 0.3s,
        box-shadow 0.3s;
    }
    /* Una vez visible, respuesta rápida al pasar el ratón (sin el retraso de la aparición) */
    .job.in {
      transition:
        opacity 0.3s,
        transform 0.8s var(--ease),
        background-color 0.3s,
        border-color 0.3s,
        box-shadow 0.3s;
      transition-delay: 0s;
    }
    /* Brillo degradado que entra desde la izquierda (igual que las tarjetas de proyecto) */
    .job::before {
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
      background: linear-gradient(100deg, color-mix(in srgb, var(--accent) 14%, transparent), transparent 60%);
      opacity: 0;
      transform: translateX(-30%);
      transition: opacity 0.45s var(--ease), transform 0.6s var(--ease);
    }
    @media (hover: hover) {
      .jobs:hover .job.in {
        opacity: 0.5;
      }
      .jobs .job.in:hover {
        opacity: 1;
        border-color: var(--line);
        box-shadow: var(--shadow);
      }
      .job:hover::before {
        opacity: 1;
        transform: none;
      }
      .job:hover h3 {
        color: var(--accent);
      }
    }
    time {
      padding-top: 4px;
      font-variant-numeric: tabular-nums;
    }
    h3 {
      font-size: 1.15rem;
      font-weight: 700;
      line-height: 1.3;
      transition: color 0.25s;
    }
    .company {
      color: var(--muted);
      font-weight: 500;
    }
    ul {
      margin: 10px 0 0;
      padding-left: 18px;
      color: var(--muted);
      font-size: 0.95rem;
    }
    li li {
      margin-bottom: 4px;
    }
    li li::marker {
      color: var(--accent);
    }
    .tags {
      margin-top: 14px;
    }

    /* Botones a los proyectos de este puesto */
    .projects {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-top: 16px;
      padding-top: 14px;
      border-top: 1px dashed var(--line);
    }
    .projects .eyebrow {
      margin-right: 4px;
    }
    .project-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 12px;
      border-radius: 10px;
      border: 1px solid var(--ink);
      background: var(--ink);
      color: var(--bg);
      font: 600 0.85rem/1 var(--font-body);
      cursor: pointer;
      transition: background-color 0.2s, border-color 0.2s, transform 0.25s var(--ease);
    }
    .project-link:hover {
      background: var(--accent);
      border-color: var(--accent);
      transform: translateY(-2px);
    }
    .project-link svg {
      width: 14px;
      height: 14px;
    }

    @media (max-width: 600px) {
      .job {
        grid-template-columns: 1fr;
        gap: 6px;
      }
    }
  `,
})
export class Experience {
  readonly jobs = input.required<Job[]>();

  private readonly dialog = inject(ProjectDialogService);

  protected openProject(name: string, event: Event): void {
    this.dialog.open(name, event.currentTarget as HTMLElement);
  }
}
