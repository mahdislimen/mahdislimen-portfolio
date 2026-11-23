import { ChangeDetectionStrategy, Component } from '@angular/core';
import { personalData, languages } from '@/utils/data/personal-data';
import { IconComponent } from '@/app/components/shared/icon/icon.component';
import { RevealDirective, SpotlightDirective } from '@/app/components/shared/directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [IconComponent, RevealDirective, SpotlightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
})
export class AboutComponent {
  readonly personalData = personalData;
  readonly facts = [
    { icon: 'briefcase', label: 'Experience', value: '4+ years in IT' },
    { icon: 'pin', label: 'Based in', value: personalData.address },
    { icon: 'shield', label: 'Status', value: `${personalData.visa} · ${personalData.availability}` },
    { icon: 'globe', label: 'Languages', value: languages.map(l => l.name).join(', ') },
  ];
  readonly focusIcons = ['llm', 'rag', 'agent', 'backend'];
}
