import { AfterViewInit, Directive, ElementRef, OnDestroy, PLATFORM_ID, inject, input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Scroll-triggered reveal. Adds `.reveal` and, once the element enters the
 * viewport, `.is-visible`. `revealDelay` (ms) staggers siblings.
 * One shared IntersectionObserver serves every instance.
 */
@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective implements AfterViewInit, OnDestroy {
  private static observer?: IntersectionObserver;
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  private platformId = inject(PLATFORM_ID);

  revealDelay = input<number>(0);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const node = this.el.nativeElement;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) return; // stay visible, no animation

    node.classList.add('reveal');
    node.style.setProperty('--reveal-delay', String(this.revealDelay()));
    RevealDirective.observer ??= new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          RevealDirective.observer?.unobserve(e.target);
        }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    RevealDirective.observer.observe(node);
  }

  ngOnDestroy(): void {
    RevealDirective.observer?.unobserve(this.el.nativeElement);
  }
}

/** Pointer-following highlight for `.spotlight` cards (sets --mx / --my). */
@Directive({
  selector: '[appSpotlight]',
  standalone: true,
  host: { class: 'spotlight', '(pointermove)': 'move($event)' },
})
export class SpotlightDirective {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);

  move(e: PointerEvent): void {
    const r = this.el.nativeElement.getBoundingClientRect();
    this.el.nativeElement.style.setProperty('--mx', `${e.clientX - r.left}px`);
    this.el.nativeElement.style.setProperty('--my', `${e.clientY - r.top}px`);
  }
}
