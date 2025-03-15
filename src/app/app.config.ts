import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { reqHeaderInterceptor } from './core/interceptor/req-header.interceptor';
import { resErrorInterceptor } from './core/interceptor/res-error.interceptor';
import { loadingInterceptor } from './core/interceptor/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions()), provideClientHydration(), provideHttpClient(withFetch(), withInterceptors([reqHeaderInterceptor, resErrorInterceptor, loadingInterceptor])),importProvidersFrom(BrowserAnimationsModule , NgxSpinnerModule), provideToastr()]
};
