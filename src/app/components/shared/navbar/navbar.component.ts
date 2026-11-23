import {
  AfterViewInit, ChangeDetectionStrategy, Component, HostListener, NgZone, OnDestroy, PLATFORM_ID, inject, signal,
} from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { personalData } from '@/utils/data/personal-data';
import { IconComponent } from '../icon/icon.component';

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private zone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);

  readonly links = NAV_LINKS;
  readonly personalData = personalData;
  scrolled = signal(false);
  menuOpen = signal(false);
  activeId = signal<string>('');
  private io?: IntersectionObserver;
  private retry?: ReturnType<typeof setTimeout>;

  @HostListener('window:scroll')
  onScroll(): void {
    const s = window.scrollY > 12;
    if (s !== this.scrolled()) this.scrolled.set(s);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.menuOpen.set(false);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || !('IntersectionObserver' in window)) return;
    this.onScroll();
    // Scroll-spy: the section crossing the upper-middle band of the viewport is active.
    this.zone.runOutsideAngular(() => {
      this.io = new IntersectionObserver(entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length) this.zone.run(() => this.activeId.set(visible[0].target.id));
      }, { rootMargin: '-40% 0px -55% 0px' });
      // Sections are rendered by the router after the navbar, so wait until they exist.
      const ids = ['home', ...this.links.map(l => l.id)];
      let attempts = 0;
      const attach = () => {
        const found = ids.map(id => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
        if (found.length < ids.length && attempts++ < 40) {
          this.retry = setTimeout(attach, 100);
          return;
        }
        found.forEach(el => this.io!.observe(el));
      };
      attach();
    });
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    clearTimeout(this.retry);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
