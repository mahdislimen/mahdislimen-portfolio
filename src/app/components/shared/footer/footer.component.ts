import { ChangeDetectionStrategy, Component } from '@angular/core';
import { personalData } from '@/utils/data/personal-data';
import { IconComponent } from '../icon/icon.component';
import { NAV_LINKS } from '../navbar/navbar.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <footer class="relative border-t border-line">
    <div class="shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_auto]">
      <div>
        <a href="#home" class="font-display text-lg font-semibold text-white">Mahdi Slimen</a>
        <p class="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-electric-300">AI Full-Stack Engineer · {{ personalData.location }}</p>
        <p class="mt-4 max-w-sm text-sm leading-relaxed text-muted">
          LLM integration, RAG systems and agentic AI, built on production-grade backend engineering.
        </p>
      </div>
      <nav aria-label="Footer">
        <ul class="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          @for (l of links; track l.id) {
            <li><a [href]="'#' + l.id" class="text-muted transition-colors hover:text-white">{{ l.label }}</a></li>
          }
        </ul>
      </nav>
      <div class="flex gap-2 md:justify-end">
        <a [href]="personalData.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
          class="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted hover:border-line-strong hover:text-white"><app-icon name="github" [size]="18" /></a>
        <a [href]="personalData.linkedIn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
          class="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted hover:border-line-strong hover:text-white"><app-icon name="linkedin" [size]="18" /></a>
        <a [href]="'mailto:' + personalData.email" aria-label="Email"
          class="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted hover:border-line-strong hover:text-white"><app-icon name="mail" [size]="18" /></a>
      </div>
    </div>
    <div class="shell flex flex-col gap-2 border-t border-line py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
      <p>© {{ year }} Mahdi Slimen. Designed and built with Angular &amp; Tailwind CSS.</p>
    </div>
  </footer>`,
})
export class FooterComponent {
  readonly personalData = personalData;
  readonly links = NAV_LINKS;
  readonly year = new Date().getFullYear();
}
