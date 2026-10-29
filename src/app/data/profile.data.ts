/**
 * TODO EL CONTENIDO DE LA WEB ESTÁ AQUÍ.
 * Para cambiar textos, añadir un trabajo, un proyecto o una tecnología, edita solo este archivo.
 */
import { Job, Profile, ProjectCase, StackLayer, TechGroup } from './profile.model';

export const PROFILE: Profile = {
  firstNames: 'Francisco Jesús',
  lastNames: 'Mengíbar Gutiérrez',
  shortName: 'Francisco Mengíbar',
  fullName: 'Francisco Jesús Mengíbar Gutiérrez',
  initials: 'MNG',
  role: 'Full Stack Developer: Angular, Spring Boot y PHP',
  location: 'Jaén, España',
  summary: 'Desarrollo soluciones web completas, desde la interfaz hasta la base de datos, integrando capacidades de IA en flujos de trabajo.',
  // Cámbialo por 'Disponible para nuevas oportunidades' cuando estés buscando.
  status: 'Full Stack Developer',
  // Pon aquí el nombre de tu foto (guárdala en la carpeta public), por ejemplo 'foto.jpg'.
  photo: null,
  // Pon aquí el nombre de tu CV en PDF (guárdalo en la carpeta public), por ejemplo 'cv.pdf'.
  cv: null,
  about: [
    'Soy desarrollador **Full Stack** y me gusta convertir problemas complejos en software claro, mantenible y escalable. Desde 2024 trabajo en **Nter Tech Services** donde desarrollo plataformas en Angular y mantengo aplicaciones Laravel para clientes institucionales como la **Universidad de Jaén**.',
    'Junto a la arquitectura frontend y el cloud, ahora estoy profundizando en **IA generativa**: Claude, APIs de LLMs, automatización de procesos y agentes en entornos de producción.',
  ],
  contact: {
    email: 'mengiibaar@gmail.com',
    linkedin: 'https://www.linkedin.com/in/francisco-jesus-mengibar-gutierrez/',
    github: 'https://github.com/20mng',
  },
};

export const EXPERIENCE: Job[] = [
  {
    role: 'Full Stack Developer',
    company: 'Nter Tech Services',
    period: '2024 — Hoy',
    location: 'Jaén',
    current: true,
    highlights: [
      'Desarrollo de la plataforma corporativa YIYIT en Angular y Spring Boot.',
      'Mantenimiento evolutivo de GSYA, la aplicación de gestión interna de la Universidad de Jaén, en Laravel.',
      'Automatización de tareas con agentes y herramientas de IA.',
    ],
    tags: ['Angular', 'Spring Boot', 'Laravel', 'MySQL', 'AWS', 'Claude'],
    projects: ['GSYA', 'YIYIT'],
  },
  {
    role: 'Desarrollador de aplicaciones web',
    company: 'Gestoría Multimedia, Agencia MKT 360º',
    period: 'Abr — Jun 2024',
    location: 'Jaén',
    highlights: [
      'Desarrollo y maquetación de sitios web a medida con WordPress.',
      'Optimización de rendimiento web (WPO), reduciendo tiempos de carga y mejorando puntuaciones en Google PageSpeed.',
      'SEO técnico y on-page (arquitectura web, indexación, metaetiquetas y datos estructurados) y analítica con Google Analytics 4 y Search Console.',
    ],
    tags: ['WordPress', 'SEO técnico', 'Google Analytics 4'],
  },
  {
    role: 'Técnico de sistemas informáticos',
    company: 'Software DELSOL',
    period: 'Abr — Jun 2022',
    location: 'Jaén',
    highlights: [
      'Administración y soporte de infraestructura cloud en Microsoft Azure (máquinas virtuales, almacenamiento y monitorización básica).',
      'Gestión de usuarios, permisos, directivas de grupo (GPO) y control de accesos mediante Active Directory y Azure AD.',
      'Mantenimiento preventivo y correctivo de servidores locales (Windows Server / Linux) y estaciones de trabajo.',
    ],
    tags: ['Azure', 'Active Directory', 'Windows Server', 'Linux'],
  },
];

export const PROJECTS: ProjectCase[] = [
  {
    name: 'GSYA',
    context: 'Universidad de Jaén',
    summary: 'Aplicación de gestión interna y control de accesos de la Universidad de Jaén.',
    challenge:
      'Transformar la operativa institucional sustituyendo herramientas fragmentadas por una solución centralizada, diseñada para gestionar credenciales, custodia documental y accesos físicos de forma segura, eficiente y escalable.',
    contributions: [
      'Implementación y mantenimiento evolutivo de la plataforma central sobre Laravel y MySQL.',
      'Componentes interactivos con Livewire para la gestión segura de credenciales.',
      'Integración con AWS S3 para la documentación y con SALTO para el control de accesos físico.',
      'Automatización de tareas repetitivas mediante agentes y herramientas de IA.',
    ],
    tags: ['Laravel', 'Livewire', 'AWS S3', 'MySQL', 'Claude'],
    colors: ['#33461a', '#7a9a2e', '#c9d77e'],
  },
  {
    name: 'YIYIT',
    context: 'Plataforma corporativa · Nter',
    summary: 'Plataforma corporativa con módulos desarrollados desde cero en Angular.',
    challenge: 'Integrar de forma ágil nuevos módulos y flujos de negocio sin comprometer el rendimiento de carga, la mantenibilidad del código ni la coherencia visual de la plataforma.',
    contributions: [
      'Aplicaciones y módulos desde cero con arquitectura modular y reutilizable.',
      'Formularios complejos de varias secciones con su lógica de negocio.',
      'Rediseño de funcionalidades existentes para mejorar la experiencia de usuario y la mantenibilidad.',
      'Mejora del rendimiento reduciendo y optimizando las peticiones a las APIs.',
    ],
    tags: ['Angular', 'TypeScript', 'SCSS', 'Spring Boot', 'MySQL'],
    colors: ['#1f2a3a', '#4c6a9a', '#a7c0e6'],
  },
];

/** Capas de la pila 3D de "Sobre mí", de arriba a abajo. */
export const STACK_LAYERS: StackLayer[] = [
  { name: 'Frontend', technologies: ['Angular', 'TypeScript', 'Livewire'] },
  { name: 'Backend', technologies: ['Java','Spring Boot', 'Laravel', 'PHP'] },
  { name: 'Datos', technologies: ['MySQL'] },
  { name: 'Cloud', technologies: ['Docker', 'AWS'] },
  { name: 'IA', technologies: ['Claude', 'APIs de LLMs'] },
];

export const TECH_GROUPS: TechGroup[] = [
  { name: 'Frontend', items: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Livewire'] },
  { name: 'Backend', items: ['Java', 'Spring Boot', 'PHP', 'Laravel'] },
  { name: 'Datos y cloud', items: ['MySQL', 'Docker', 'AWS', 'Azure'] },
  { name: 'IA', items: ['Claude', 'Google Gemini', 'ChatGPT'] },
  { name: 'Web y CMS', items: ['WordPress', 'SEO técnico', 'Google Analytics 4', 'Search Console'] },
  { name: 'Sistemas y herramientas', items: ['Windows Server', 'Linux', 'Active Directory', 'Git', 'Trello', 'Metodologías ágiles'] },
];
