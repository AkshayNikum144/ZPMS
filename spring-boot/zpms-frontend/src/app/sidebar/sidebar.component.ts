// src/app/sidebar/sidebar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core'; // ✅ Import Input, Output, EventEmitter
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent {
  @Input() isOpenOnMobile = false; // ✅ Receive state from parent
  @Output() closeSidebar = new EventEmitter<void>(); // ✅ To close on item click

  activeItem = 'डॅशबोर्ड';

  // ... (your menuItems array remains the same)
  menuItems = [
    { icon: 'fa-home', label: 'डॅशबोर्ड', route: '/dashboard' },
    { icon: 'fa-right-from-bracket', label: 'शाळेचे उद्दिष्ट नोंदवा.', route: '/school-report' },
    { icon: 'fa-gear', label: ' आंगणवाडी उद्दिष्टांची नोंद करा', route: '/aganwadi-report' },
     {icon: 'fa-file-invoice', label: 'आरोग्य अहवाल', route: '/arogya-checklist-form' },
    { icon: 'fa-gear', label: 'शालेय उद्दिष्टांचा अहवाल ', route: '/school-objective' },
    { icon: 'fa-file-invoice', label: 'अंगणवाडी उद्दिष्टांचा अहवाल', route: '/inspection-report' },
   
    { icon: 'fa-file-invoice', label: 'आरोग्य केंद्र अहवाल', route: '/arogya-report' },
    // { icon: 'fa-user', label: 'प्रोफाइल', route: '/profile' },
    // { icon: 'fa-right-from-bracket', label: 'बाहेर पडा', action: () => this.logout() }
  ];

  constructor(private registerService: RegisterService, private router: Router) {}

  setActive(label: string) {
    this.activeItem = label;
  }

  handleItemClick(item: any) {
    this.setActive(item.label);
    if (item.route) {
      this.router.navigate([item.route]);
    } else if (item.action) {
      item.action(); // like logout
    }
    this.closeSidebar.emit(); // ✅ Close sidebar after any click
  }

  logout(): void {
    this.registerService.logout();
    this.router.navigate(['/login']);
  }
}