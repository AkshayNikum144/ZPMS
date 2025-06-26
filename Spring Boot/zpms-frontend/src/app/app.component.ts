// src/app/app.component.ts

import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NavbarComponent, SidebarComponent, CommonModule, NgClass],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zpms-frontend';

  showHeaderFooter = true;
  showSidebar = true;
  isPublicView = false;
  isSidebarVisibleOnMobile = false; // ✅ New state for mobile toggle

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const publicRoutes = ['/login', '/register'];
        this.isPublicView = publicRoutes.includes(event.urlAfterRedirects);
        this.showSidebar = !this.isPublicView;
        this.showHeaderFooter = true;
        this.isSidebarVisibleOnMobile = false; // ✅ Close sidebar on route change
      }
    });
  }

  // ✅ New method to be called by the navbar button
  toggleSidebar(): void {
    this.isSidebarVisibleOnMobile = !this.isSidebarVisibleOnMobile;
  }
}