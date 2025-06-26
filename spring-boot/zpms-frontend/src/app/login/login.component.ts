// src/app/login/login.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  message = '';
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.message = 'Please enter valid credentials.';
      return;
    }

    this.registerService.loginUser(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res.success && res.user) {
          // The service now handles saving the user via the `tap` operator
          const department = res.user.department;

          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: `Welcome, ${res.user.fullName}`,
            timer: 2000,
            showConfirmButton: false
          });

          setTimeout(() => {
            switch (department) {
              case 'शिक्षण विभाग (Education)':
                this.router.navigate(['/dashboard']);
                break;
              case 'आरोग्य विभाग (Health)': // Corrected the department name
                this.router.navigate(['/health']);
                break;
              case 'शाळा विभाग (School)':
                this.router.navigate(['/school-report']); // Corrected the route
                break;
              default:
                this.router.navigate(['/dashboard']);
            }
          }, 2000);
        } else {
          // Handle login failure from a successful API call (e.g., wrong password)
          this.message = res.message || 'Invalid credentials';
          Swal.fire('Login Failed', this.message, 'error');
        }
      },
      // FIX #3: Add the correct type for the error object
      error: (err: HttpErrorResponse) => {
        this.message = err.error?.message || 'Login failed. Please try again.';
        Swal.fire('Login Error', this.message, 'error');
      }
    });
  }
}