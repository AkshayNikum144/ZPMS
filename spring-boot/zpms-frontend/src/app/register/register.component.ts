// src/app/register/register.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterService } from '../register.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  selectedFile: File | null = null;
  departments = [ 'Admin', 'शिक्षण विभाग (Education)', 'आरोग्य विभाग (Health)', 'शाळा विभाग (School)' ];
  message = '';

  constructor(private fb: FormBuilder, private registerService: RegisterService) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      department: ['', Validators.required],
      role: ['FIELD', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  
  // This function is not used in the template, can be removed if not needed.
  togglePasswordVisibility() {}

  onSubmit() {
    if (this.registerForm.invalid) {
      this.message = 'Please fill all required fields correctly.';
      return;
    }
    if (!this.selectedFile) {
      this.message = 'Please upload a profile photo.';
      return;
    }

    const formData = new FormData();
    Object.entries(this.registerForm.value).forEach(([key, value]) => {
      if (key !== 'confirmPassword' && value !== null) {
        formData.append(key, value as string);
      }
    });
    formData.append('photo', this.selectedFile);

    // This call is now valid.
    this.registerService.registerUser(formData).subscribe({
      next: (res: any) => {
        this.message = res?.message || 'Registration successful!';
        this.registerForm.reset();
        this.selectedFile = null;
      },
      // Add the correct type for the error object
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.message = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}