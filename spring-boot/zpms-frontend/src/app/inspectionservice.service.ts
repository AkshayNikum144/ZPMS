// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// // --- Interface for the form payload ---
// export interface AnganwadiInspectionPayload {
//   taluka: string;
//   villageName: string;
//   anganwadiNumber: string;
//   workerName: string;
//   anganwadiHelperName: string;
//   workerHelperPresent: string;
//   centerSurroundingsClean: string;
//   centerCategory: string;
//   buildingType: string;
//   toiletAvailable: string;
//   toiletUsage: string;
//   drinkingWaterSupply: string;
//   inspectionDate: string;
//   electricitySupply: string;
//   childrenWeightMeasured: number | null;
//   normalWeightChildren: number | null;
//   totalEnrollment: number | null;
//   childrenPresent: number | null;
//   suwChildren: number | null;
//   muwChildren: number | null;
//   samChildren: number | null;
//   mamChildren: number | null;
//   breakfastMeal: string;
//   tasteQuality: string;
//   campaignsDetails: string;
//   anganwadiFeedbackSuggestions: string;
//   shera: string;
//   status?: string;
// }


// // --- THIS IS THE INTERFACE TO CORRECT ---
// // Full inspection object returned by the backend
// export interface AnganwadiInspection extends AnganwadiInspectionPayload {
//   id: number;
//   // CORRECTION: Add the optional photo filename properties here
//   photo1_filename?: string;
//   photo2_filename?: string;
//   photo3_filename?: string;
//   photo4_filename?: string;
// }


// @Injectable({
//   providedIn: 'root'
// })
// export class InspectionserviceService {
//   private apiUrl = 'http://localhost:8080/api/inspections';

//   constructor(private http: HttpClient) { }

//   private handleError(error: HttpErrorResponse) {
//     console.error('API Error:', error);
//     let errorMessage = 'An unknown error occurred!';
//     if (error.error instanceof ErrorEvent) {
//       errorMessage = `A client-side error occurred: ${error.error.message}`;
//     } else {
//       errorMessage = `Server returned code ${error.status}, error message is: ${error.message}`;
//        if (error.error && typeof error.error === 'string') {
//         errorMessage = error.error;
//       }
//     }
//     return throwError(() => new Error(errorMessage));
//   }

//   // No changes needed for the methods below this point
//   getAllInspections(): Observable<AnganwadiInspection[]> {
//     return this.http.get<AnganwadiInspection[]>(this.apiUrl).pipe(catchError(this.handleError));
//   }

//   getInspectionById(id: number): Observable<AnganwadiInspection> {
//     return this.http.get<AnganwadiInspection>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
//   }

//   submitInspection(formData: FormData): Observable<AnganwadiInspection> {
//     return this.http.post<AnganwadiInspection>(this.apiUrl, formData).pipe(catchError(this.handleError));
//   }

//   updateInspection(id: number, formData: FormData): Observable<AnganwadiInspection> {
//     return this.http.put<AnganwadiInspection>(`${this.apiUrl}/${id}`, formData).pipe(catchError(this.handleError));
//   }

//   deleteInspection(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// --- INTERFACES ---
export interface AnganwadiInspectionPayload {
  taluka: string;
  villageName: string;
  anganwadiNumber: string;
  workerName: string;
  anganwadiHelperName: string;
  workerHelperPresent: string;
  centerSurroundingsClean: string;
  centerCategory: string;
  buildingType: string;
  toiletAvailable: string;
  toiletUsage: string;
  drinkingWaterSupply: string;
  inspectionDate: string;
  electricitySupply: string;
  childrenWeightMeasured: number | null;
  normalWeightChildren: number | null;
  totalEnrollment: number | null;
  childrenPresent: number | null;
  suwChildren: number | null;
  muwChildren: number | null;
  samChildren: number | null;
  mamChildren: number | null;
  breakfastMeal: string;
  tasteQuality: string;
  campaignsDetails: string;
  anganwadiFeedbackSuggestions: string;
  shera: string;
  status?: string;
}

export interface AnganwadiInspection extends AnganwadiInspectionPayload {
  id: number;
  photo1_filename?: string;
  photo2_filename?: string;
  photo3_filename?: string;
  photo4_filename?: string;
}

@Injectable({
  providedIn: 'root'
})
export class InspectionserviceService {
  private apiUrl = 'http://localhost:8080/api/inspections';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code ${error.status}, error message is: ${error.message}`;
       if (error.error && typeof error.error === 'string') {
        errorMessage = error.error;
      }
    }
    return throwError(() => new Error(errorMessage));
  }

  getAllInspections(): Observable<AnganwadiInspection[]> {
    return this.http.get<AnganwadiInspection[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getInspectionById(id: number): Observable<AnganwadiInspection> {
    return this.http.get<AnganwadiInspection>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  submitInspection(formData: FormData): Observable<AnganwadiInspection> {
    return this.http.post<AnganwadiInspection>(this.apiUrl, formData).pipe(catchError(this.handleError));
  }

  updateInspection(id: number, formData: FormData): Observable<AnganwadiInspection> {
    return this.http.put<AnganwadiInspection>(`${this.apiUrl}/${id}`, formData).pipe(catchError(this.handleError));
  }

  deleteInspection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }
}