import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { jwtInterceptor } from '@frontend/users';
import { NgxStripeModule } from 'ngx-stripe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom(BrowserModule),
    importProvidersFrom([BrowserAnimationsModule]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([jwtInterceptor])),

    importProvidersFrom(
      NgxStripeModule.forRoot(
        'pk_test_51QJG76FCczDn7rhWb4lgFqY1RnPSNeRKGSUE4niCbtcM9fiBjS7o9bXghGuAIrBOWEo75GaNi7dLtrndnaweEivX00fPzEuGdf'
      )
    ),
  ],
};
