import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interface for the Report Component's data
export interface Hospital {
  id?: number;
  phcName: string;
  subcenterName: string;
  villagePhcId: string;
  monthName: string;
  [key: string]: any; // Allows for other properties
}

// Interface for the simple Checklist Form's data
export interface ChecklistData {
    taluka: string;
    prathmik_arogya_kendra: string;
    bheticha_dinank: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArogyaService {
  // Your real backend API URL
  private apiUrl = 'http://localhost:8080/api/hospitals';

  constructor(private http: HttpClient) { }

  /**
   * Fetches all hospital records from the database.
   * This is used by the Report Component.
   */
  getAllHospitals(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  /**
   * Submits the simple checklist form.
   * NOTE: This is a demo method as the simple form cannot create a full 'Hospital' object.
   */
  submitChecklist(data: ChecklistData): Observable<any> {
    console.log('DEMO SUBMIT: This simple form cannot create a full hospital record.', data);
    return of({ success: true, message: 'Demo submission successful.' });
  }

  /**
   * Provides dummy data for the Taluka dropdowns in both components.
   */
  getTalukas(): Observable<string[]> {
    // In a real app, this data might come from another API endpoint.
    return of(['सर्व तालुके', 'Kalmeshwar', 'Hingna', 'Bhiwapur', 'Ramtek', 'Nagpur']);
  }

  /**
   * Provides dummy data for the Arogya Kendra dropdown in the checklist form.
   */
  getArogyaKendras(taluka: string): Observable<string[]> {
    const allKendras: { [key: string]: string[] } = {
      'Kalmeshwar': ['Dhapewada', 'Mohpa'],
      'Hingna': ['Adegaon', 'Kanholibara'],
      'Bhiwapur': ['Jawli', 'Nand', 'Temburdoha'],
      'Ramtek': ['Ramtek Gramin'],
      'Nagpur': ['Nagpur Gramin']
    };
    return of(allKendras[taluka] || []);
  }

  /**
   * Basic error handler for HTTP requests.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}