// // src/app/register.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';
// import { UserRegister } from '../UserRegister'; // Ensure this path is correct

// // Define a type for the login payload for clarity
// export interface LoginPayload {
//   email: string;
//   password: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class RegisterService {
//   private apiUrl = 'http://localhost:8080/api/register'; // Your backend API URL
//  private baseUrl = 'http://localhost:8080/api/login'; 
//   constructor(private http: HttpClient) { }

//   /**
//    * FIX #1: The registerUser method now correctly accepts FormData,
//    * which is what you are sending from your component to handle the file upload.
//    * The return type is `any` because the backend response might vary.
//    */
//   registerUser(formData: FormData): Observable<any> {
//     return this.http.post<any>(`${this.apiUrl}`, formData);
//   }

//   /**
//    * FIX #2: Add the missing loginUser method.
//    * It takes a LoginPayload and expects a response containing user data.
//    */
//   loginUser(credentials: LoginPayload): Observable<any> {
//     return this.http.post<any>(`${this.baseUrl}`, credentials).pipe(
//       tap(response => {
//         // If the login is successful and a user object is returned, save it.
//         if (response && response.success && response.user) {
//           this.setUser(response.user);
//         }
//       })
//     );
//   }

//   // --- Session Management Methods ---

//   setUser(user: UserRegister): void {
//     localStorage.setItem('currentUser', JSON.stringify(user));
//   }

//   getUser(): UserRegister | null {
//     const userJson = localStorage.getItem('currentUser');
//     return userJson ? (JSON.parse(userJson) as UserRegister) : null;
//   }

//   logout(): void {
//     localStorage.removeItem('currentUser');
//   }
// }

// src/app/register.service.ts

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserRegister } from '../UserRegister'; // Ensure this path is correct

export interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:8080/api'; // Consolidated base URL

  // ✅ STEP 1: Inject PLATFORM_ID to detect server vs. browser environments.
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // --- API Methods ---

  registerUser(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, formData);
  }

  loginUser(credentials: LoginPayload): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // On successful login, save the user session.
        if (response && response.success && response.user) {
          this.setUser(response.user);
        }
      })
    );
  }

  // --- Session Management Methods (Now SSR-SAFE) ---

  /**
   * ✅ FIX: This method now only accesses localStorage when in a browser.
   */
  setUser(user: UserRegister): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  /**
   * ✅ FIX: This method now only accesses localStorage when in a browser.
   * On the server, it correctly returns null without crashing.
   */
  getUser(): UserRegister | null {
    if (isPlatformBrowser(this.platformId)) {
      const userJson = localStorage.getItem('currentUser');
      return userJson ? (JSON.parse(userJson) as UserRegister) : null;
    }
    return null;
  }

  /**
   * ✅ FIX: This method now only accesses localStorage when in a browser.
   */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
  }
}