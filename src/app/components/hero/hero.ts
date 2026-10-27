import { Component, input } from '@angular/core';
import { Profile, StackLayer } from '../../data/profile.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  readonly profile = input.required<Profile>();
  readonly layers = input.required<StackLayer[]>();
}
