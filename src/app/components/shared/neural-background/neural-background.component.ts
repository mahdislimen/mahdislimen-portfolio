import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, PLATFORM_ID, ViewChild, inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Node { x: number; y: number; vx: number; vy: number; r: number; hue: 0 | 1; }

/**
 * Hero background: drifting nodes connected by faint lines, like a sparse
 * neural graph. Runs outside Angular's zone, pauses off-screen and when the tab
 * is hidden, and renders a single static frame for reduced-motion users.
 */
@Component({
  selector: 'app-neural-background',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'pointer-events-none absolute inset-0 block', 'aria-hidden': 'true' },
  template: `<canvas #canvas style="display:block;width:100%;height:100%"></canvas>`,
})
export class NeuralBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private zone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);

  private ctx!: CanvasRenderingContext2D;
  private nodes: Node[] = [];
  private w = 0;
  private h = 0;
  private raf = 0;
  private running = false;
  private inView = true;
  private reduced = false;
  private pointer = { x: -9999, y: -9999 };
  private cleanup: Array<() => void> = [];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.zone.runOutsideAngular(() => {
      this.resize();
      const onResize = () => { this.resize(); if (!this.running) this.draw(); };
      // Track the element's real size: the first measurement can happen before layout settles.
      if ('ResizeObserver' in window) {
        const ro = new ResizeObserver(() => onResize());
        ro.observe(canvas);
        this.cleanup.push(() => ro.disconnect());
      }
      const onMove = (e: PointerEvent) => {
        const r = canvas.getBoundingClientRect();
        this.pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
      };
      const onLeave = () => (this.pointer = { x: -9999, y: -9999 });
      const onVis = () => this.toggle();
      window.addEventListener('resize', onResize, { passive: true });
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
      document.addEventListener('visibilitychange', onVis);
      this.cleanup.push(
        () => window.removeEventListener('resize', onResize),
        () => window.removeEventListener('pointermove', onMove),
        () => document.removeEventListener('pointerleave', onLeave),
        () => document.removeEventListener('visibilitychange', onVis),
      );

      const io = new IntersectionObserver(([e]) => { this.inView = e.isIntersecting; this.toggle(); });
      io.observe(canvas);
      this.cleanup.push(() => io.disconnect());

      this.draw();
      this.toggle();
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.running = false;
    this.cleanup.forEach(fn => fn());
  }

  private toggle(): void {
    const shouldRun = !this.reduced && this.inView && document.visibilityState === 'visible';
    if (shouldRun && !this.running) {
      this.running = true;
      const loop = () => {
        if (!this.running) return;
        this.step();
        this.draw();
        this.raf = requestAnimationFrame(loop);
      };
      this.raf = requestAnimationFrame(loop);
    } else if (!shouldRun && this.running) {
      this.running = false;
      cancelAnimationFrame(this.raf);
    }
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    // Rescale existing nodes so a resize doesn't bunch them into one corner.
    if (this.w && this.h && (w !== this.w || h !== this.h)) {
      for (const n of this.nodes) { n.x *= w / this.w; n.y *= h / this.h; }
    }
    this.w = w;
    this.h = h;
    canvas.width = Math.round(this.w * dpr);
    canvas.height = Math.round(this.h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Density scales with area, capped so mobile stays cheap.
    const target = Math.max(24, Math.min(80, Math.round((this.w * this.h) / 16000)));
    while (this.nodes.length < target) {
      this.nodes.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.8,
        hue: Math.random() > 0.55 ? 1 : 0,
      });
    }
    this.nodes.length = target;
  }

  private step(): void {
    for (const n of this.nodes) {
      // Gentle pull toward the pointer for a subtle interactive feel.
      const dx = this.pointer.x - n.x;
      const dy = this.pointer.y - n.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 160 * 160) {
        n.vx += dx * 0.000012;
        n.vy += dy * 0.000012;
      }
      n.vx = Math.max(-0.4, Math.min(0.4, n.vx));
      n.vy = Math.max(-0.4, Math.min(0.4, n.vy));
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -20) n.x = this.w + 20; else if (n.x > this.w + 20) n.x = -20;
      if (n.y < -20) n.y = this.h + 20; else if (n.y > this.h + 20) n.y = -20;
    }
  }

  private draw(): void {
    const { ctx, nodes } = this;
    ctx.clearRect(0, 0, this.w, this.h);
    const maxDist = 140;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxDist) {
          const alpha = (1 - d / maxDist) * 0.22;
          ctx.strokeStyle = a.hue && b.hue ? `rgba(139,108,255,${alpha})` : `rgba(76,141,255,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      ctx.fillStyle = n.hue ? 'rgba(185,166,255,0.75)' : 'rgba(141,182,255,0.75)';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
