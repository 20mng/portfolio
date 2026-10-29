import { Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { onScrollFrame, prefersReducedMotion } from '../../core/scroll';

/**
 * Fondo de la página:
 * - Curvas de nivel animadas (como un mapa topográfico de colinas), dibujadas en un canvas.
 * - Foco de luz suave que sigue al ratón.
 * - Barra de progreso de lectura arriba.
 */
@Component({
  selector: 'app-backdrop',
  template: `
    <canvas #canvas aria-hidden="true"></canvas>
    <div class="spotlight" #spotlight aria-hidden="true"></div>
    <div class="progress" #progress aria-hidden="true"></div>
  `,
  styles: `
    canvas,
    .spotlight {
      position: fixed;
      inset: 0;
      z-index: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .spotlight {
      background: radial-gradient(600px circle at var(--sx, 50%) var(--sy, 30%), var(--glow), transparent 70%);
    }
    .progress {
      position: fixed;
      inset: 0 0 auto;
      z-index: 60;
      height: 2px;
      background: var(--accent);
      transform-origin: 0 50%;
      transform: scaleX(var(--p, 0));
    }
  `,
})
export class Backdrop {
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly spotlight = viewChild.required<ElementRef<HTMLElement>>('spotlight');
  private readonly progress = viewChild.required<ElementRef<HTMLElement>>('progress');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // Barra de progreso
      const bar = this.progress().nativeElement;
      onScrollFrame(destroyRef, () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.setProperty('--p', String(max > 0 ? window.scrollY / max : 0));
      });

      // Foco de luz
      const spot = this.spotlight().nativeElement;
      const onPointer = (e: PointerEvent) => {
        spot.style.setProperty('--sx', `${e.clientX}px`);
        spot.style.setProperty('--sy', `${e.clientY}px`);
      };
      window.addEventListener('pointermove', onPointer, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('pointermove', onPointer));

      this.startContours(destroyRef);
    });
  }

  /** Curvas de nivel con "marching squares" sobre un campo de ruido que se desplaza despacio. */
  private startContours(destroyRef: DestroyRef): void {
    const canvas = this.canvas().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const noise = createNoise();
    const cell = 14;
    const levels = 9;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let field = new Float32Array(0);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / cell) + 1;
      rows = Math.ceil(height / cell) + 1;
      field = new Float32Array(cols * rows);
    };
    resize();
    window.addEventListener('resize', resize);

    // Color de las líneas según el tema.
    let color = readContourColor();
    const themeObserver = new MutationObserver(() => requestAnimationFrame(() => (color = readContourColor())));
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const schemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const onScheme = () => (color = readContourColor());
    schemeQuery.addEventListener('change', onScheme);

    const draw = (t: number) => {
      const shift = window.scrollY * 0.0008;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          field[j * cols + i] = noise(i * 0.045 + t * 0.03, j * 0.045 - t * 0.02 + shift) * 0.5 + 0.5;
        }
      }
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let l = 1; l < levels; l++) {
        drawLevel(ctx, field, cols, rows, cell, l / levels);
      }
      ctx.stroke();
    };

    const still = prefersReducedMotion();
    const start = performance.now();
    let last = 0;
    let frameId = 0;
    const loop = (now: number) => {
      // ~20 fotogramas por segundo bastan para un movimiento tan lento, y ahorran batería.
      if (!document.hidden && now - last > 50) {
        last = now;
        draw(still ? 0 : (now - start) / 1000);
      }
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    destroyRef.onDestroy(() => {
      cancelAnimationFrame(frameId);
      themeObserver.disconnect();
      schemeQuery.removeEventListener('change', onScheme);
      window.removeEventListener('resize', resize);
    });
  }
}

function readContourColor(): string {
  return getComputedStyle(document.documentElement).getPropertyValue('--contour').trim() || 'rgba(0,0,0,.1)';
}

/** Dibuja una curva de nivel (umbral `th`) recorriendo la rejilla celda a celda. */
function drawLevel(
  ctx: CanvasRenderingContext2D,
  field: Float32Array,
  cols: number,
  rows: number,
  cell: number,
  th: number,
): void {
  const at = (i: number, j: number) => field[j * cols + i] ?? 0;
  const seg = (a: [number, number], b: [number, number]) => {
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
  };
  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const a = at(i, j);
      const b = at(i + 1, j);
      const c = at(i + 1, j + 1);
      const d = at(i, j + 1);
      const idx = (a > th ? 8 : 0) | (b > th ? 4 : 0) | (c > th ? 2 : 0) | (d > th ? 1 : 0);
      if (idx === 0 || idx === 15) continue;

      const x = i * cell;
      const y = j * cell;
      const lerp = (p: number, q: number) => (th - p) / (q - p);
      const top: [number, number] = [x + cell * lerp(a, b), y];
      const right: [number, number] = [x + cell, y + cell * lerp(b, c)];
      const bottom: [number, number] = [x + cell * lerp(d, c), y + cell];
      const left: [number, number] = [x, y + cell * lerp(a, d)];

      switch (idx) {
        case 1:
        case 14:
          seg(left, bottom);
          break;
        case 2:
        case 13:
          seg(bottom, right);
          break;
        case 3:
        case 12:
          seg(left, right);
          break;
        case 4:
        case 11:
          seg(top, right);
          break;
        case 5:
          seg(left, top);
          seg(bottom, right);
          break;
        case 6:
        case 9:
          seg(top, bottom);
          break;
        case 7:
        case 8:
          seg(left, top);
          break;
        case 10:
          seg(left, bottom);
          seg(top, right);
          break;
      }
    }
  }
}

/** Ruido de Perlin 2D clásico, con una permutación aleatoria en cada visita. */
function createNoise(): (x: number, y: number) => number {
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j]!, p[i]!];
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]!;

  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const grad = (h: number, x: number, y: number) => ((h & 1) ? -x : x) + ((h & 2) ? -y : y);

  return (x: number, y: number) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = fade(x);
    const v = fade(y);
    const a = perm[X]! + Y;
    const b = perm[X + 1]! + Y;
    return (
      (1 - v) * ((1 - u) * grad(perm[a]!, x, y) + u * grad(perm[b]!, x - 1, y)) +
      v * ((1 - u) * grad(perm[a + 1]!, x, y - 1) + u * grad(perm[b + 1]!, x - 1, y - 1))
    );
  };
}
