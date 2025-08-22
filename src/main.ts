import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app/app';
import { provideZonelessChangeDetection } from '@angular/core';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideZonelessChangeDetection(),
    ...appConfig.providers,
  ],
}).catch((err) => console.error(err));
