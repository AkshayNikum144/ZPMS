import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Anganwadi { // Define an interface for your data
  id?: number; // Optional for create, present for read/update. Backend uses Long.
  entryDate: string; // yyyy-MM-dd
  projectName: string;
  beatName: string;
  anganwadiCenterName: string;
  anganwadiNumber: string;
  anganwadiWorkerName: string;
  workerMobileNumber: string;
  workerServiceDurationYears: number;
  workerResponsibility?: string;
  beneficiaries0To6Months?: number;
  beneficiariesTotal?: number;
  foodSupply6Months3Years?: string;
  drinkingWaterFacility: string;
  educationalMaterialAvailable: string;
  toyMaterialAvailable: string;
  medicalCheckupFacility: string;
  remarks?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnganwadiService {
  private apiUrl = 'http://localhost:8080/api/anganwadi'; // Ensure this matches backend

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 400 && error.error) {
        // Handle validation errors from Spring Boot
        const validationErrors = error.error;
        errorMessage = 'Validation failed:\n';
        if (typeof validationErrors === 'object' && validationErrors !== null) {
          for (const key in validationErrors) {
            if (validationErrors.hasOwnProperty(key)) {
              errorMessage += `${key}: ${validationErrors[key]}\n`;
            }
          }
        } else if (typeof validationErrors === 'string') {
            errorMessage = validationErrors; // Use the direct error message if it's a string
        } else {
             errorMessage = `Error Code: ${error.status}\nMessage: ${error.message || 'Server error'}`;
        }
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        if(error.error && typeof error.error === 'string') {
            errorMessage += `\nServer Message: ${error.error}`;
        }
      }
    }
    return throwError(() => new Error(errorMessage.trim()));
  }

  getAllAnganwadis(): Observable<Anganwadi[]> {
    return this.http.get<Anganwadi[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getAnganwadiById(id: number): Observable<Anganwadi> {
    return this.http.get<Anganwadi>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  createAnganwadi(data: Anganwadi): Observable<Anganwadi> {
    return this.http.post<Anganwadi>(this.apiUrl, data).pipe(catchError(this.handleError));
  }

  updateAnganwadi(id: number, data: Anganwadi): Observable<Anganwadi> {
    return this.http.put<Anganwadi>(`${this.apiUrl}/${id}`, data).pipe(catchError(this.handleError));
  }

  deleteAnganwadi(id: number): Observable<void> { // Changed to void as backend returns 204 No Content
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }
}