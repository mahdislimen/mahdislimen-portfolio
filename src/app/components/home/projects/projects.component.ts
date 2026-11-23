import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { featuredProjects } from '@/utils/data/featured-projects';
import { IconComponent } from '@/app/components/shared/icon/icon.component';
import { FlowDiagramComponent } from '@/app/components/shared/flow-diagram/flow-diagram.component';
import { RevealDirective, SpotlightDirective } from '@/app/components/shared/directives/reveal.directive';
import { QualityDashboardComponent } from './quality-dashboard.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgClass, IconComponent, FlowDiagramComponent, RevealDirective, SpotlightDirective, QualityDashboardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  readonly main = featuredProjects[0];
  readonly others = featuredProjects.slice(1);

  readonly statusClass: Record<string, string> = {
    building: 'border-signal/30 bg-signal-soft text-signal',
    independent: 'border-violet/30 bg-violet-soft text-violet-300',
    delivered: 'border-electric/30 bg-electric-soft text-electric-300',
  };
}
