import { ChangeDetectionStrategy, Component } from '@angular/core';
import { personalData } from '@/utils/data/personal-data';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <a [href]="link" target="_blank" rel="noopener noreferrer" aria-label="Message Mahdi on WhatsApp"
    class="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-xl border border-signal/30 bg-night-800/90 text-signal shadow-card backdrop-blur transition-all duration-300 hover:border-signal/70 hover:bg-signal-soft">
    <app-icon name="whatsapp" [size]="20" />
  </a>`,
})
export class WhatsappButtonComponent {
  readonly link = 'https://wa.me/' + personalData.phone.replace(/[^\d]/g, '');
}
