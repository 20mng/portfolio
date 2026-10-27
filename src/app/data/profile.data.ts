/**
 * TODO EL CONTENIDO DE LA WEB ESTÁ AQUÍ.
 * Para cambiar textos, añadir un trabajo o una tecnología, edita solo este archivo.
 */
import { Education, Job, Profile, StackLayer, TechGroup } from './profile.model';

export const PROFILE: Profile = {
  firstNames: 'Francisco Jesús',
  lastNames: 'Mengíbar Gutiérrez',
  shortName: 'Francisco Mengíbar',
  role: 'Full Stack Developer: Angular, Spring Boot y PHP',
  location: 'Jaén, España. Trabajo en híbrido o en remoto.',
  // Pon null cuando no estés buscando empleo y desaparece el aviso.
  availability: 'Disponible para nuevas oportunidades',
  about: [
    'Soy desarrollador Full Stack y me gusta convertir problemas complejos en software claro, mantenible y escalable. Desde 2024 trabajo en Nter Tech Services, donde desarrollo plataformas corporativas en Angular y mantengo aplicaciones en Laravel para clientes como la Universidad de Jaén.',
    'Me interesan especialmente la arquitectura de componentes, la gestión de estado reactiva y el despliegue en la nube. Aprendo constantemente y no suelto un problema hasta resolverlo.',
  ],
  contact: {
    email: 'mengiibaar@gmail.com',
    linkedin: 'https://www.linkedin.com/in/francisco-jesus-mengibar-gutierrez/',
    github: 'https://github.com/meengii',
  },
};

export const STACK_LAYERS: StackLayer[] = [
  { name: 'Frontend', technologies: ['Angular', 'TypeScript', 'Livewire'] },
  { name: 'Backend', technologies: ['Spring Boot', 'Java', 'Laravel', 'PHP'] },
  { name: 'Datos', technologies: ['MySQL'] },
  { name: 'Cloud', technologies: ['Docker', 'AWS'] },
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
        name: 'YIYIT, plataforma corporativa',
        tags: ['Angular', 'TypeScript', 'MySQL'],
        highlights: [
          'Desarrollo desde cero de aplicaciones y módulos en Angular con arquitectura modular y reutilizable.',
          'Formularios complejos de varias secciones con su lógica de negocio.',
          'Rediseño de funcionalidades existentes para mejorar la experiencia de usuario y la mantenibilidad.',
          'Mejora del rendimiento reduciendo y optimizando las peticiones a APIs.',
        ],
      },
      {
        name: 'GSYA, Universidad de Jaén',
        tags: ['Laravel 8', 'Livewire', 'AWS S3', 'SALTO'],
        highlights: [
          'Desarrollo y mantenimiento evolutivo de una aplicación de gestión interna y control de accesos.',
          'Componentes interactivos con Livewire para la gestión segura de credenciales.',
          'Permisos y control de acceso basado en roles.',
          'Integración con AWS S3 para documentación y con SALTO para el control de accesos.',
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
      'Monitorización y análisis de métricas de tráfico y comportamiento de usuario mediante Google Analytics 4 y Google Search Console.',
      'Personalización e integración de plugins, pasarelas de pago y formularios de captación de leads.'
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
      'Resolución de incidencias de hardware, software y redes locales (LAN/VLAN, DHCP, DNS), asegurando la continuidad del servicio.',
      'Ejecución y verificación de planes de copias de seguridad (backups) y protocolos de recuperación ante desastres.'
    ],
  },
];

export const TECH_GROUPS: TechGroup[] = [
  { name: 'Frontend', items: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Livewire'] },
  { name: 'Backend', items: ['Spring Boot', 'Java', 'PHP', 'Laravel'] },
  { name: 'Datos y cloud', items: ['MySQL', 'Docker', 'AWS'] },
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
