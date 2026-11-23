import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <button type="button" (click)="toTop()" aria-label="Back to top" [attr.tabindex]="visible() ? 0 : -1"
    class="fixed bottom-[4.5rem] right-5 z-40 grid h-11 w-11 place-items-center rounded-xl border border-line-strong bg-night-800/90 text-fg shadow-card backdrop-blur transition-all duration-300 hover:border-electric/60 hover:text-white"
    [class.pointer-events-none]="!visible()" [class.opacity-0]="!visible()" [class.translate-y-3]="!visible()">
    <app-icon name="arrowUp" [size]="18" />
  </button>`,
})
export class AppScrollToTopComponent {
  visible = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    const v = window.scrollY > 600;
    if (v !== this.visible()) this.visible.set(v);
  }

  toTop(): void {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  }
}
