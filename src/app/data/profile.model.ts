export interface Profile {
  firstNames: string;
  lastNames: string;
  shortName: string;
  role: string;
  location: string;
  availability: string | null;
  about: string[];
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
}

/** Una capa del gráfico de la portada (frontend, backend...). */
export interface StackLayer {
  name: string;
  technologies: string[];
}

export interface Project {
  name: string;
  tags: string[];
  highlights: string[];
}

export interface Job {
  role: string;
  company: string;
  period: string;
  location: string;
  current?: boolean;
  /** Para trabajos con varios proyectos. */
  projects?: Project[];
  /** Para trabajos sin proyectos separados. */
  highlights?: string[];
}

export interface CoreTech {
  name: string;
  description: string;
}

export interface TechGroup {
  name: string;
  items: string[];
}

export interface Education {
  title: string;
  center: string;
  period: string;
}
