// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
// import { RegisterService } from '../register.service';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [
//     RouterLink,
//     FormsModule,
//     CommonModule,
//     MdbDropdownModule  // ✅ MDB Dropdown support
//   ],
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss']
// })
// export class NavbarComponent implements OnInit {
//   full_name: string | null = null;
//   @Input() isPublic: boolean = false;
//   @Output() sidebarToggle = new EventEmitter<void>();

//   constructor(private registerService: RegisterService, private router: Router) {}

//   ngOnInit(): void {
//     const user = this.registerService.getUser();
//     this.full_name = user?.fullName || null;
//   }

//   logout(): void {
//     this.registerService.logout();
//     this.full_name = null;
//     this.router.navigate(['/login']);
//   }

//   onToggleSidebar(): void {
//     this.sidebarToggle.emit();
//   }
// }
// src/app/navbar/navbar.component.ts
// THIS CODE IS CORRECT - NO CHANGES NEEDED

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
 
    MdbDropdownModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  full_name: string | null = null;
  @Input() isPublic: boolean = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  constructor(private registerService: RegisterService, private router: Router) {}

  ngOnInit(): void {
    const user = this.registerService.getUser();
    this.full_name = user?.fullName || null;
  }

  logout(): void {
    this.registerService.logout();
    this.full_name = null;
    this.router.navigate(['/login']);
  }

  onToggleSidebar(): void {
    this.sidebarToggle.emit();
  }
}