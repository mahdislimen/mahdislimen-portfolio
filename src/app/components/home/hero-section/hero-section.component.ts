import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { personalData } from '@/utils/data/personal-data';
import { IconComponent } from '@/app/components/shared/icon/icon.component';
import { NeuralBackgroundComponent } from '@/app/components/shared/neural-background/neural-background.component';

interface TraceLine {
  kind: 'user' | 'agent' | 'llm' | 'tool' | 'core' | 'out';
  label: string;
  text: string;
  ok?: boolean;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [NgClass, IconComponent, NeuralBackgroundComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  readonly personalData = personalData;

  /** Illustrative run of the hybrid agent pattern. It is not real output or real data. */
  readonly trace: TraceLine[] = [
    { kind: 'user', label: 'user', text: '"Which supplier invoices are still open this month?"' },
    { kind: 'agent', label: 'agent', text: 'plan → retrieve invoices, then summarise' },
    { kind: 'llm', label: 'llm', text: 'select tool  ap.list_open_invoices' },
    { kind: 'tool', label: 'tool', text: 'call  ap.list_open_invoices(period="current")', ok: true },
    { kind: 'core', label: 'core', text: 'spring-boot/ap-service  → postgres', ok: true },
    { kind: 'out', label: 'out', text: '{ "type": "invoice_summary", "items": [ … ] }' },
  ];

  readonly kindClass: Record<TraceLine['kind'], string> = {
    user: 'text-electric-300',
    agent: 'text-violet-300',
    llm: 'text-violet-300',
    tool: 'text-violet-300',
    core: 'text-signal',
    out: 'text-[#F5B454]',
  };
}
