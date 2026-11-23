import { ChangeDetectionStrategy, Component } from '@angular/core';
import { educations } from '@/utils/data/educations';
import { languages } from '@/utils/data/personal-data';
import { IconComponent } from '@/app/components/shared/icon/icon.component';
import { RevealDirective } from '@/app/components/shared/directives/reveal.directive';

/** Education (section 9) and Languages (section 10), side by side. */
@Component({
  selector: 'app-education',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './education.component.html',
})
export class EducationComponent {
  readonly educations = educations;
  readonly languages = languages;
}
