/**
 * Logo de cada tecnología, con el formato "colección:icono" de Iconify.
 * Busca más en https://icon-sets.iconify.design (la colección "logos" tiene casi todas las marcas).
 * Si una tecnología no está aquí o el logo no carga, se muestran sus iniciales.
 */
export const TECH_ICONS: Record<string, string> = {
  // Frontend
  Angular: 'logos:angular-icon',
  TypeScript: 'logos:typescript-icon',
  JavaScript: 'logos:javascript',
  HTML: 'logos:html-5',
  CSS: 'logos:css-3',
  Livewire: 'simple-icons:livewire',
  // Backend
  'Spring Boot': 'logos:spring-icon',
  Java: 'logos:java',
  PHP: 'logos:php',
  Laravel: 'logos:laravel',
  // Datos y cloud
  MySQL: 'logos:mysql-icon',
  Docker: 'logos:docker-icon',
  AWS: 'logos:aws',
  Azure: 'logos:microsoft-azure',
  // IA
  Claude: 'logos:claude-icon',
  'Google Gemini': 'simple-icons:googlegemini',
  ChatGPT: 'logos:openai-icon',
  // Web y CMS
  WordPress: 'logos:wordpress-icon',
  'SEO técnico': 'lucide:search',
  'Google Analytics 4': 'logos:google-analytics',
  'Search Console': 'lucide:search-check',
  // Sistemas
  'Windows Server': 'logos:microsoft-windows-icon',
  Linux: 'logos:linux-tux',
  'Active Directory': 'lucide:users',
  Redes: 'lucide:network',
  // Forma de trabajo
  'Metodologías ágiles': 'lucide:refresh-cw',
  Git: 'logos:git-icon',
  Trello: 'logos:trello',
};

/** Color de los iconos genéricos (los de marca llevan sus propios colores). */
const GENERIC_ICON_COLOR = '#4d6116';

export function techIconUrl(tech: string): string | null {
  const id = TECH_ICONS[tech];
  if (!id) return null;
  const [collection, icon] = id.split(':');
  const url = `https://api.iconify.design/${collection}/${icon}.svg`;
  return collection === 'logos' ? url : `${url}?color=${encodeURIComponent(GENERIC_ICON_COLOR)}`;
}
