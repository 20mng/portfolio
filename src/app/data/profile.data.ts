/**
 * TODO EL CONTENIDO DE LA WEB ESTÁ AQUÍ.
 * Para cambiar textos, añadir un trabajo o una tecnología, edita solo este archivo.
 */
import { CoreTech, Education, Job, Profile, StackLayer, TechGroup } from './profile.model';

export const PROFILE: Profile = {
  firstNames: 'Francisco Jesús',
  lastNames: 'Mengíbar Gutiérrez',
  shortName: 'Francisco Mengíbar',
  role: 'Full Stack Developer: Angular, Spring Boot y PHP',
  location: 'Jaén, España.',
  // Pon null cuando no estés buscando empleo y desaparece el aviso.
  // availability: 'Disponible para nuevas oportunidades',
  availability: null,
  about: [
    'Soy desarrollador Full Stack especializado en transformar problemas complejos en soluciones de software sólidas y escalables. En Nter Tech Services (desde 2024) desarrollo plataformas en Angular y mantengo entornos Laravel para clientes institucionales como la Universidad de Jaén.',
    'Junto a mi foco en arquitectura frontend y cloud, actualmente estoy profundizando al máximo en IA generativa (Claude, APIs de LLMs y automatización inteligente), explorando cómo integrarla de forma práctica en flujos de trabajo y arquitecturas modernas.',
  ],
  contact: {
    email: 'mengiibaar@gmail.com',
    linkedin: 'https://www.linkedin.com/in/francisco-jesus-mengibar-gutierrez/',
    github: 'https://github.com/20mng',
  },
};

export const STACK_LAYERS: StackLayer[] = [
  { name: 'Frontend', technologies: ['Angular', 'TypeScript', 'Livewire'] },
  { name: 'Backend', technologies: ['Spring Boot', 'Java', 'Laravel', 'PHP'] },
  { name: 'Datos', technologies: ['MySQL'] },
  { name: 'Cloud', technologies: ['Docker', 'AWS'] },
  { name: 'IA', technologies: ['Claude', 'APIs de LLMs'] },
];

export const EXPERIENCE: Job[] = [
  {
    role: 'Full Stack Developer',
    company: 'Nter Tech Services',
    period: 'Septiembre 2024 – actualidad',
    location: 'Jaén',
    current: true,
    projects: [
      {
        name: 'GSYA, Universidad de Jaén',
        tags: ['Laravel', 'AWS S3', 'MySQL', 'Claude'],
        highlights: [
          'Desarrollo y mantenimiento evolutivo de una aplicación de gestión interna.',
          'Componentes interactivos con Livewire para la gestión segura de credenciales.',
          'Integración con AWS S3 para documentación y con SALTO para el control de accesos.',
          'Automatización de tareas repetitivas mediante agentes y herramientas de IA.',
        ],
      },
      {
        name: 'YIYIT, plataforma corporativa',
        tags: ['Angular', 'SCSS', 'Spring Boot', 'MySQL'],
        highlights: [
          'Desarrollo desde cero de aplicaciones y módulos con arquitectura modular y reutilizable.',
          'Formularios complejos de varias secciones con su lógica de negocio.',
          'Rediseño de funcionalidades existentes para mejorar la experiencia de usuario y la mantenibilidad.',
          'Mejora del rendimiento reduciendo y optimizando las peticiones a APIs.',
        ],
      },
    ],
  },
  {
    role: 'Desarrollador de aplicaciones web',
    company: 'Gestoría Multimedia, Agencia MKT 360º',
    period: 'Abril – junio 2024',
    location: 'Jaén',
    highlights: [
      'Desarrollo y maquetación de sitios web a medida con WordPress.',
      'Optimización de rendimiento web (WPO), reduciendo tiempos de carga y mejorando puntuaciones en Google PageSpeed.',
      'Implementación de estrategias de SEO técnico y on-page (arquitectura web, indexación, metaetiquetas y structured data).',
    ],
  },
  {
    role: 'Técnico de sistemas informáticos',
    company: 'Software DELSOL',
    period: 'Abril – junio 2022',
    location: 'Jaén',
    highlights: [
      'Administración y soporte de infraestructura cloud en Microsoft Azure (máquinas virtuales, almacenamiento y monitorización básica).',
      'Gestión de usuarios, permisos, directivas de grupo (GPO) y control de accesos mediante Active Directory y Azure AD.',
      'Mantenimiento preventivo y correctivo de servidores locales (Windows Server / Linux) y estaciones de trabajo de la plantilla.',
    ],
  },
];

  export const CORE_STACK: CoreTech[] = [
    { name: 'Angular', description: 'Frontend y componentes' },
    { name: 'TypeScript', description: 'Tipado en todo el frontend' },
    { name: 'Spring Boot', description: 'APIs y backend en Java' },
    { name: 'Laravel', description: 'Backend PHP con Livewire' },
    { name: 'MySQL', description: 'Bases de datos relacionales' },
    { name: 'Docker', description: 'Entornos y despliegues' },
    { name: 'AWS', description: 'Almacenamiento y cloud' },
    { name: 'Claude', description: 'IA para desarrollo y automatización' },
  ];

export const TECH_GROUPS: TechGroup[] = [
  { name: 'Frontend', items: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Livewire'] },
  { name: 'Backend', items: ['Spring Boot', 'Java', 'PHP', 'Laravel'] },
  { name: 'Datos y cloud', items: ['MySQL', 'Docker', 'AWS', 'Azure'] },
  { name: 'IA', items: ['Claude', 'Google Gemini', 'ChatGPT'] },
  { name: 'Web y CMS', items: ['WordPress', 'SEO técnico', 'Google Analytics 4', 'Search Console'] },
  { name: 'Sistemas', items: ['Windows Server', 'Linux', 'Active Directory', 'Redes'] },
  { name: 'Forma de trabajo', items: ['Metodologías ágiles', 'Git', 'Trello'] },
];

export const EDUCATION: Education[] = [
  {
    title: 'CFGS Desarrollo de Aplicaciones Web',
    center: 'IES Las Fuentezuelas',
    period: '2022 – 2024',
  },
];

export const CERTIFICATIONS: string[] = [
  'Java desde 0: Orientación a Objetos',
  'Java 18: colecciones concurrentes',
  'Programación funcional en Java 18: API Optional y métodos de referencia',
  'CRUD con PHP, MySQL, HTML, CSS y JavaScript',
];
