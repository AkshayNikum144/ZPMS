// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
// import { RegisterComponent } from './app/register/register.component';
// import { provideHttpClient } from '@angular/common/http';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

  
// bootstrapApplication(RegisterComponent, {
//   providers: [provideHttpClient()]
// });
// main.ts
// src/main.ts (or wherever your bootstrapApplication call is)

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Import these

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations'; // Your defined routes

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Your existing router provider
    provideHttpClient(withInterceptorsFromDi()), provideAnimations() // ✅ ADD THIS LINE
    // If you don't use DI-based interceptors (yet), you can just use provideHttpClient()
    // provideHttpClient()
  ]
}).catch(err => console.error(err));