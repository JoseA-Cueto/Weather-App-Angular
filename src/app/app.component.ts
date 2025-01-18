import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

@Component({
  selector: 'app-root',
  standalone: true,  // Marca el componente como standalone
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],  // Agrega HttpClientModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';
  isSidebarExpanded = false;

  expandSidebar() {
    this.isSidebarExpanded = true;
  }

  collapseSidebar() {
    this.isSidebarExpanded = false;
  }
}


