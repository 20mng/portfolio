import { Component } from '@angular/core';
import { Backdrop } from './components/backdrop/backdrop';
import { NavItem, Sidebar } from './components/sidebar/sidebar';
import { SectionBlock } from './components/section-block/section-block';
import { About } from './components/about/about';
import { ThemeToggle } from './components/theme-toggle/theme-toggle';
import { Experience } from './components/experience/experience';
import { Projects } from './components/projects/projects';
import { Stack } from './components/stack/stack';
import { Contact } from './components/contact/contact';
import { EXPERIENCE, PROFILE, PROJECTS, STACK_LAYERS, TECH_GROUPS } from './data/profile.data';

@Component({
  selector: 'app-root',
  imports: [Backdrop, ThemeToggle, Sidebar, SectionBlock, About, Experience, Projects, Stack, Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly profile = PROFILE;
  protected readonly experience = EXPERIENCE;
  protected readonly projects = PROJECTS;
  protected readonly techGroups = TECH_GROUPS;
  protected readonly layers = STACK_LAYERS;

  /** Secciones de la navegación (el id debe coincidir con el de app.html). */
  protected readonly sections: NavItem[] = [
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'stack', label: 'Stack' },
    { id: 'contacto', label: 'Contacto' },
  ];
}
