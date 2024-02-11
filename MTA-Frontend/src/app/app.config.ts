import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './Services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),provideRouter(routes),provideHttpClient(withInterceptors([AuthInterceptor]))]
  // providers: [provideHttpClient(),provideRouter(routes),[{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]]
};

 