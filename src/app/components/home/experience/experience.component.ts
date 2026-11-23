import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { careerArc, experiences } from '@/utils/data/experience';
import { IconComponent } from '@/app/components/shared/icon/icon.component';
import { RevealDirective, SpotlightDirective } from '@/app/components/shared/directives/reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [NgClass, IconComponent, RevealDirective, SpotlightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './experience.component.html',
})
export class ExperienceComponent {
  readonly arc = careerArc;
  readonly featured = experiences.find(e => e.featured)!;
  readonly recent = experiences.filter(e => !e.featured && e.stage === 'enterprise');
  readonly earlier = experiences.filter(e => e.stage === 'development' || e.stage === 'support');
}
