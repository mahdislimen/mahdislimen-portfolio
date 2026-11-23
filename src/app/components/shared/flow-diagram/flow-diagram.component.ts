import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, PLATFORM_ID, computed, inject, input, signal,
} from '@angular/core';
import { isPlatformBrowser, NgClass, NgTemplateOutlet } from '@angular/common';
import { FlowDiagram, FlowNode, FlowTone } from '@/core/models/flow.interface';
import { IconComponent } from '../icon/icon.component';

interface Segment {
  zoneId: string;
  label: string;
  tone: FlowTone;
  nodes: Array<{ node: FlowNode; index: number }>;
}

const TONE: Record<FlowTone, { lane: string; label: string; node: string; nodeActive: string; icon: string; edge: string }> = {
  neutral: {
    lane: 'border-line bg-white/[0.015]',
    label: 'text-faint',
    node: 'border-line bg-night-800',
    nodeActive: 'border-electric/70 bg-electric-soft shadow-glow',
    icon: 'text-electric-300',
    edge: '#4C8DFF',
  },
  ai: {
    lane: 'border-violet/25 bg-violet/[0.04]',
    label: 'text-violet-300',
    node: 'border-violet/20 bg-night-800',
    nodeActive: 'border-violet/70 bg-violet-soft shadow-[0_0_0_1px_rgba(139,108,255,.35),0_10px_40px_-12px_rgba(139,108,255,.45)]',
    icon: 'text-violet-300',
    edge: '#8B6CFF',
  },
  deterministic: {
    lane: 'border-signal/25 bg-signal/[0.04]',
    label: 'text-signal',
    node: 'border-signal/20 bg-night-800',
    nodeActive: 'border-signal/70 bg-signal-soft shadow-[0_0_0_1px_rgba(45,212,191,.35),0_10px_40px_-12px_rgba(45,212,191,.4)]',
    icon: 'text-signal',
    edge: '#2DD4BF',
  },
  data: {
    lane: 'border-[#F5B454]/25 bg-[#F5B454]/[0.035]',
    label: 'text-[#F5B454]',
    node: 'border-[#F5B454]/20 bg-night-800',
    nodeActive: 'border-[#F5B454]/70 bg-[#F5B454]/10 shadow-[0_0_0_1px_rgba(245,180,84,.35),0_10px_40px_-12px_rgba(245,180,84,.35)]',
    icon: 'text-[#F5B454]',
    edge: '#F5B454',
  },
};

/**
 * Interactive architecture diagram. Hover, focus or click a node to read what
 * it does; "Trace a request" walks the path step by step. The trace also plays
 * once automatically when the diagram first scrolls into view.
 */
@Component({
  selector: 'app-flow-diagram',
  standalone: true,
  imports: [NgClass, NgTemplateOutlet, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './flow-diagram.component.html',
})
export class FlowDiagramComponent implements AfterViewInit, OnDestroy {
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private platformId = inject(PLATFORM_ID);

  diagram = input.required<FlowDiagram>();
  /** Compact = always vertical rows (for narrow cards). */
  compact = input<boolean>(false);
  autoplay = input<boolean>(true);

  readonly tone = TONE;
  active = signal<number>(0);          // -2 = rail selected
  progress = signal<number>(-1);       // highest node reached by the trace
  tracing = signal(false);
  private timers: ReturnType<typeof setTimeout>[] = [];
  private io?: IntersectionObserver;

  segments = computed<Segment[]>(() => {
    const d = this.diagram();
    const out: Segment[] = [];
    d.nodes.forEach((node, index) => {
      const zone = d.zones.find(z => z.id === node.zone) ?? { id: 'none', label: '', tone: 'neutral' as FlowTone };
      const last = out[out.length - 1];
      if (last && last.zoneId === zone.id) last.nodes.push({ node, index });
      else out.push({ zoneId: zone.id, label: zone.label, tone: zone.tone, nodes: [{ node, index }] });
    });
    return out;
  });

  activeNode = computed(() => this.diagram().nodes[this.active()] ?? null);
  activeTone = computed<FlowTone>(() => {
    const n = this.activeNode();
    return this.diagram().zones.find(z => z.id === n?.zone)?.tone ?? 'neutral';
  });

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || !this.autoplay()) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      this.progress.set(this.diagram().nodes.length - 1);
      return;
    }
    this.io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        this.trace();
        this.io?.disconnect();
      }
    }, { threshold: 0.35 });
    this.io.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.clearTimers();
    this.io?.disconnect();
  }

  select(i: number): void {
    if (this.tracing()) this.stopTrace();
    this.active.set(i);
    if (i >= 0 && this.progress() < i) this.progress.set(Math.max(this.progress(), i));
  }

  trace(): void {
    this.clearTimers();
    const n = this.diagram().nodes.length;
    const reduced = isPlatformBrowser(this.platformId) && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      this.progress.set(n - 1);
      this.active.set(n - 1);
      return;
    }
    this.tracing.set(true);
    this.progress.set(-1);
    for (let i = 0; i < n; i++) {
      this.timers.push(setTimeout(() => {
        this.progress.set(i);
        this.active.set(i);
        if (i === n - 1) this.tracing.set(false);
      }, 250 + i * 650));
    }
  }

  private stopTrace(): void {
    this.clearTimers();
    this.tracing.set(false);
    this.progress.set(this.diagram().nodes.length - 1);
  }

  private clearTimers(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }

  nodeClasses(index: number, tone: FlowTone): string {
    const t = this.tone[tone];
    if (index === this.active()) return t.nodeActive;
    return this.progress() >= index ? `${t.node} opacity-100` : `${t.node} opacity-60`;
  }

  /** Wrapper + vertical/horizontal svg classes for a connector (literal strings for Tailwind). */
  edgeLayout(between: boolean): { wrap: string; v: string; h: string } {
    if (!this.compact()) return { wrap: 'h-5 w-full lg:h-auto lg:w-5', v: 'block lg:hidden', h: 'hidden lg:block' };
    if (between) return { wrap: 'h-4 w-full sm:h-auto sm:w-5', v: 'block sm:hidden', h: 'hidden sm:block' };
    return { wrap: 'h-3 w-full', v: 'block', h: 'hidden' };
  }

  edgeColor(index: number, tone: FlowTone): string {
    return this.progress() >= index ? this.tone[tone].edge : 'rgba(148,163,184,0.35)';
  }
}
