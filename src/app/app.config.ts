import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

// Lottie, Toastr, reCAPTCHA, HttpClient and client hydration were removed from
// the root providers: no current section uses them, and lottie-web alone added
// roughly 250 KB to the initial bundle. Hydration also needs SSR, which this
// static Netlify build doesn't use.
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled' })),
  ],
};
