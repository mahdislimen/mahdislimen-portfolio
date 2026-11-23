import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSectionComponent } from '@/app/components/home/hero-section/hero-section.component';
import { AboutComponent } from '@/app/components/home/about/about.component';
import { ExpertiseComponent } from '@/app/components/home/expertise/expertise.component';
import { ExperienceComponent } from '@/app/components/home/experience/experience.component';
import { ProjectsComponent } from '@/app/components/home/projects/projects.component';
import { TechStackComponent } from '@/app/components/home/tech-stack/tech-stack.component';
import { ArchitectureComponent } from '@/app/components/home/architecture/architecture.component';
import { EducationComponent } from '@/app/components/home/education/education.component';
import { ContactComponent } from '@/app/components/home/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent, AboutComponent, ExpertiseComponent, ExperienceComponent, ProjectsComponent,
    TechStackComponent, ArchitectureComponent, EducationComponent, ContactComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero-section />
    <app-about />
    <app-expertise />
    <app-experience />
    <app-projects />
    <app-tech-stack />
    <app-architecture />
    <app-education />
    <app-contact />
  `,
})
export class HomeComponent {}
