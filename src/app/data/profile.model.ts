export interface Profile {
  firstNames: string;
  lastNames: string;
  /** Nombre corto para la columna de la izquierda y el título de la pestaña. */
  shortName: string;
  fullName: string;
  initials: string;
  /** Puesto y stack principal separados por dos puntos: "Full Stack Developer: Angular, Spring Boot y PHP". */
  role: string;
  location: string;
  /** Frase corta bajo el puesto, en la columna de la izquierda. */
  summary: string;
  /** Etiqueta con punto verde bajo el resumen (por ejemplo, dónde trabajas o "Disponible para nuevas oportunidades"). */
  status: string;
  /** Foto o logo dentro de la carpeta public (por ejemplo 'foto.jpg'). Con null se muestran tus iniciales. */
  photo: string | null;
  /** CV en PDF dentro de la carpeta public (por ejemplo 'cv.pdf'). Con null no sale el botón. */
  cv: string | null;
  /** Párrafos de "Sobre mí". Lo que va entre ** ** sale en negrita. */
  about: string[];
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
}

export interface Job {
  role: string;
  company: string;
  /** Texto de las fechas tal como se muestra: "2024 — Hoy". */
  period: string;
  location: string;
  current?: boolean;
  highlights: string[];
  tags: string[];
  /** Nombres de proyectos de PROJECTS en los que trabajaste aquí: salen como botones que abren su detalle. */
  projects?: string[];
}

/** Proyecto destacado: se muestra como tarjeta y se abre en detalle. */
export interface ProjectCase {
  name: string;
  /** Contexto corto sobre el título: cliente, empresa o "Proyecto personal". */
  context: string;
  /** Una frase para la tarjeta. */
  summary: string;
  /** "El reto": qué problema había que resolver. */
  challenge: string;
  /** "Qué hice". */
  contributions: string[];
  tags: string[];
  /** Tres colores del proyecto: se usan en el punto y el brillo de la tarjeta y en la franja del panel. */
  colors: [string, string, string];
  links?: { label: string; url: string }[];
}

/** Una capa de la pila 3D de "Sobre mí" (frontend, backend...). */
export interface StackLayer {
  name: string;
  technologies: string[];
}

export interface TechGroup {
  name: string;
  items: string[];
}
