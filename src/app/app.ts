import { Component } from '@angular/core';
import { SiteHeader } from './components/site-header/site-header';
import { Hero } from './components/hero/hero';
import { PageSection } from './components/page-section/page-section';
import { Experience } from './components/experience/experience';
import { TechStack } from './components/tech-stack/tech-stack';
import { Education } from './components/education/education';
import { Contact } from './components/contact/contact';
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  STACK_LAYERS,
  TECH_GROUPS,
} from './data/profile.data';

@Component({
  selector: 'app-root',
  imports: [SiteHeader, Hero, PageSection, Experience, TechStack, Education, Contact],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly profile = PROFILE;
  protected readonly layers = STACK_LAYERS;
  protected readonly experience = EXPERIENCE;
  protected readonly techGroups = TECH_GROUPS;
  protected readonly education = EDUCATION;
  protected readonly certifications = CERTIFICATIONS;
  protected readonly year = new Date().getFullYear();
}
