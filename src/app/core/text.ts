export interface TextPart {
  text: string;
  bold: boolean;
}

/** Divide un texto en trozos normales y en negrita (lo que va entre ** **). */
export function boldParts(text: string): TextPart[] {
  return text
    .split('**')
    .map((part, i) => ({ text: part, bold: i % 2 === 1 }))
    .filter((part) => part.text.length > 0);
}

/** "Spring Boot" → "SB". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

export interface RunningTransition {
  ready: Promise<void>;
  finished: Promise<void>;
}

/**
 * Ejecuta un cambio del DOM con una transición de vista si el navegador la admite.
 * Devuelve null si no hay transición (navegador antiguo o "reducir movimiento").
 */
export function withViewTransition(update: () => void): RunningTransition | null {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => RunningTransition;
  };
  if (!doc.startViewTransition || reduce) {
    update();
    return null;
  }
  return doc.startViewTransition(update);
}
