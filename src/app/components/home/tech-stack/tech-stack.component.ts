import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ecosystem } from '@/utils/data/expertise';
import { RevealDirective } from '@/app/components/shared/directives/reveal.directive';

/**
 * Technology ecosystem: the engineer at the root, five clusters branching off.
 * Hovering or focusing a cluster (or picking it in the legend) highlights that
 * branch and dims the rest.
 */
@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tech-stack.component.html',
})
export class TechStackComponent {
  readonly clusters = ecosystem;
  readonly total = ecosystem.reduce((n, c) => n + c.items.length, 0);
  focus = signal<string | null>(null);
  pinned = signal<string | null>(null);

  current(): string | null {
    return this.focus() ?? this.pinned();
  }

  dimmed(id: string): boolean {
    const c = this.current();
    return c !== null && c !== id;
  }

  togglePin(id: string): void {
    this.pinned.update(p => (p === id ? null : id));
  }
}
