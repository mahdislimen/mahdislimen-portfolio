import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Illustrative dashboard visual for the Quality Defect Management platform.
 * Deliberately has no numbers: it shows the kind of interface, not real data.
 */
@Component({
  selector: 'app-quality-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <figure class="overflow-hidden rounded-xl border border-line bg-night-900/90">
    <div class="flex items-center justify-between border-b border-line px-3 py-2">
      <span class="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">Quality · PPM overview</span>
      <span class="flex gap-1" aria-hidden="true">
        <span class="h-1.5 w-6 rounded-full bg-electric/60"></span><span class="h-1.5 w-4 rounded-full bg-white/10"></span>
      </span>
    </div>
    <svg viewBox="0 0 360 190" class="block w-full" role="img"
      aria-label="Illustrative dashboard layout with KPI tiles, a PPM trend line and defect category bars. No real data shown.">
      <defs>
        <linearGradient id="qd-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="#4C8DFF" stop-opacity=".35"/><stop offset="1" stop-color="#4C8DFF" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <!-- KPI tiles (skeleton values) -->
      @for (k of kpis; track $index) {
        <g [attr.transform]="'translate(' + (12 + $index * 114) + ',12)'">
          <rect width="106" height="40" rx="6" fill="rgba(255,255,255,.03)" stroke="rgba(148,163,184,.14)"/>
          <rect x="10" y="10" width="40" height="5" rx="2.5" fill="rgba(148,163,184,.35)"/>
          <rect x="10" y="22" [attr.width]="k.w" height="9" rx="3" [attr.fill]="k.c"/>
        </g>
      }
      <!-- Trend panel -->
      <rect x="12" y="62" width="214" height="116" rx="6" fill="rgba(255,255,255,.02)" stroke="rgba(148,163,184,.14)"/>
      @for (y of [92, 118, 144]; track y) {
        <line x1="22" x2="216" [attr.y1]="y" [attr.y2]="y" stroke="rgba(148,163,184,.10)"/>
      }
      <path d="M22 150 C45 140 58 120 80 124 S118 98 140 104 S180 84 216 80 L216 168 L22 168 Z" fill="url(#qd-area)" class="fade-area"/>
      <path d="M22 150 C45 140 58 120 80 124 S118 98 140 104 S180 84 216 80" fill="none" stroke="#4C8DFF" stroke-width="2"
        stroke-linecap="round" class="draw-line" pathLength="1"/>
      <line x1="22" x2="216" y1="110" y2="110" stroke="#F5B454" stroke-width="1" stroke-dasharray="3 4" opacity=".7"/>
      <rect x="22" y="70" width="46" height="5" rx="2.5" fill="rgba(148,163,184,.35)"/>
      <!-- Defect categories -->
      <rect x="234" y="62" width="114" height="116" rx="6" fill="rgba(255,255,255,.02)" stroke="rgba(148,163,184,.14)"/>
      <rect x="244" y="70" width="40" height="5" rx="2.5" fill="rgba(148,163,184,.35)"/>
      @for (b of bars; track $index) {
        <rect [attr.x]="250 + $index * 19" [attr.y]="166 - b" width="11" [attr.height]="b" rx="2"
          [attr.fill]="$index === 1 ? '#8B6CFF' : 'rgba(76,141,255,.55)'" class="grow-bar"
          [style.transition-delay]="(300 + $index * 90) + 'ms'"/>
      }
    </svg>
    <figcaption class="border-t border-line px-3 py-2 text-[11px] italic text-faint">Illustrative interface. No production data shown.</figcaption>
  </figure>`,
})
export class QualityDashboardComponent {
  readonly kpis = [
    { w: 54, c: 'rgba(76,141,255,.7)' },
    { w: 42, c: 'rgba(139,108,255,.7)' },
    { w: 60, c: 'rgba(45,212,191,.6)' },
  ];
  readonly bars = [62, 80, 48, 34, 22];
}
