import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { personalData } from '@/utils/data/personal-data';
import { IconComponent } from '@/app/components/shared/icon/icon.component';
import { RevealDirective } from '@/app/components/shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  readonly personalData = personalData;
  readonly phoneLink = 'tel:' + personalData.phone.replace(/\s/g, '');
  readonly whatsappLink = 'https://wa.me/' + personalData.phone.replace(/[^\d]/g, '');
  emailCopied = signal(false);

  copyEmail(): void {
    const done = () => {
      this.emailCopied.set(true);
      setTimeout(() => this.emailCopied.set(false), 2000);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(this.personalData.email).then(done).catch(() => this.fallbackCopy(done));
    } else {
      this.fallbackCopy(done);
    }
  }

  /** For non-secure contexts or browsers without the async Clipboard API. */
  private fallbackCopy(done: () => void): void {
    const ta = document.createElement('textarea');
    ta.value = this.personalData.email;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      if (document.execCommand('copy')) done();
    } finally {
      document.body.removeChild(ta);
    }
  }
}
