import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { experiences } from '@/utils/data/experience';
import { featuredProjects } from '@/utils/data/featured-projects';
import { personalData } from '@/utils/data/personal-data';

describe('Portfolio', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('creates the app shell with navbar and footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('header nav')).toBeTruthy();
    expect(el.querySelector('footer')).toBeTruthy();
  });

  it('links the CV download to the bundled PDF', () => {
    expect(personalData.resume).toBe('assets/Mahdi_Slimen_CV.pdf');
  });

  it('keeps CV dates and titles for each role', () => {
    const byCompany = Object.fromEntries(experiences.map(e => [e.company, e]));
    expect(byCompany['UniQ Soft Technology'].duration).toBe('Dec 2024 – Jun 2026');
    expect(byCompany['HUBER+SUHNER'].duration).toBe('Feb 2024 – Jul 2024');
    expect(byCompany['INOVTECH ENGINEERING'].duration).toBe('Jun 2023 – Oct 2023');
    expect(byCompany['Sartex Groupe'].duration).toBe('Aug 2021 – Jan 2023');
  });

  it('never ships demo or repository links for local projects', () => {
    for (const p of featuredProjects) {
      const json = JSON.stringify(p);
      expect(json).not.toMatch(/https?:\/\//);
    }
  });
});
