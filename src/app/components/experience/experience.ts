import { Component, input } from '@angular/core';
import { Job } from '../../data/profile.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  readonly jobs = input.required<Job[]>();
}
