import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { expertise } from '@/utils/data/expertise';
import { IconComponent } from '@/app/components/shared/icon/icon.component';
import { RevealDirective, SpotlightDirective } from '@/app/components/shared/directives/reveal.directive';

/** Bento layout on large screens (12-col grid). Literal class names so Tailwind keeps them. */
const SPAN: Record<string, string> = {
  llm: 'lg:col-span-7',
  agentic: 'lg:col-span-5',
  rag: 'lg:col-span-5',
  observability: 'lg:col-span-3',
  backend: 'lg:col-span-4',
  infra: 'lg:col-span-5',
  frontend: 'lg:col-span-3',
  databases: 'lg:col-span-4',
};

@Component({
  selector: 'app-expertise',
  standalone: true,
  imports: [NgClass, IconComponent, RevealDirective, SpotlightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './expertise.component.html',
})
export class ExpertiseComponent {
  readonly groups = expertise;
  readonly span = SPAN;
}
