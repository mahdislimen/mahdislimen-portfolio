import { ChangeDetectionStrategy, Component, HostListener, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { enterpriseFlow, ragIngestFlow, ragQueryFlow } from '@/utils/data/architectures';
import { FlowDiagramComponent } from '@/app/components/shared/flow-diagram/flow-diagram.component';
import { IconComponent } from '@/app/components/shared/icon/icon.component';
import { RevealDirective, SpotlightDirective } from '@/app/components/shared/directives/reveal.directive';

type Tab = 'enterprise' | 'rag';

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [NgClass, FlowDiagramComponent, IconComponent, RevealDirective, SpotlightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './architecture.component.html',
})
export class ArchitectureComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  readonly enterprise = enterpriseFlow;
  readonly ragIngest = ragIngestFlow;
  readonly ragQuery = ragQueryFlow;
  tab = signal<Tab>('enterprise');

  readonly tabs: Array<{ id: Tab; label: string; icon: string }> = [
    { id: 'enterprise', label: 'Enterprise AI integration', icon: 'agent' },
    { id: 'rag', label: 'RAG architecture', icon: 'rag' },
  ];

  readonly principles = [
    { icon: 'shield', title: 'Deterministic core', text: 'Money, rules and state changes live in tested services. The model only calls them.' },
    { icon: 'tool', title: 'Tools, not free text', text: 'Agents act through typed tool schemas and MCP, and return structured outputs.' },
    { icon: 'observability', title: 'Observable by default', text: 'Every run, prompt and tool call is traced with LangSmith for debugging and evaluation.' },
    { icon: 'infra', title: 'Shipped like software', text: 'Containerised, CI/CD-delivered and deployed on Kubernetes and Azure.' },
  ];

  ngOnInit(): void {
    this.syncFromHash();
  }

  /** `#rag-architecture` (linked from the DocChat card) opens the RAG tab. */
  @HostListener('window:hashchange')
  syncFromHash(): void {
    if (isPlatformBrowser(this.platformId) && window.location.hash === '#rag-architecture') this.tab.set('rag');
  }

  onTabKey(e: KeyboardEvent): void {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next: Tab = this.tab() === 'enterprise' ? 'rag' : 'enterprise';
    this.tab.set(next);
    (document.getElementById('tab-' + next) as HTMLElement | null)?.focus();
  }
}
