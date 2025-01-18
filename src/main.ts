import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http'; 

// Arrancar la aplicación con el AppComponent, agregando los módulos necesarios
bootstrapApplication(AppComponent, {
  providers: [
    // Asegurarse de que HttpClientModule esté disponible
    provideHttpClient(),
    HttpClientModule,
    CommonModule,
    FormsModule,
    [provideRouter(routes)],
    
    
  ]
})
  .catch(err => console.error(err));
