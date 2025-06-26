import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define an interface for the Hospital data structure
export interface Hospital {
  id?: number;
  phcName: string;
  subcenterName: string;
  villagePhcId: string;
  monthName: string;

  cataractSuspectedTotal: number | null;
  cataractScreenedTotal: number | null;
  cataractMatureCases: number | null;
  cataractImmatureCases: number | null;
  cataractSurgeryDone: number | null;
  cataractFollowupTotal: number | null;

  htnSuspectedTotal: number | null;
  htnReferredTotal: number | null;
  htnOnTreatmentTotal: number | null;
  htnOnCounselingNotOnTreatment: number | null;
  htnTreatmentAndFollowup: number | null;

  dmSuspectedTotal: number | null;
  dmReferredTotal: number | null;
  dmOnTreatmentTotal: number | null;
  dmOnCounselingNotOnTreatment: number | null;
  dmTreatmentFollowup: number | null;

  tbSuspectedTotal: number | null;
  tbReferredForXrayTotal: number | null;
  tbSputumCollectedTotal: number | null;
  tbDiagnosedTotal: number | null;
  tbOnTreatmentTotal: number | null;

  leprosySuspectedTotal: number | null;
  leprosyReferredTotal: number | null;
  leprosyDiagnosedTotal: number | null;
  leprosyOnTreatmentTotal: number | null;
  leprosyReconstructiveSurgeryTotal: number | null;

  oralCancerSuspectedTotal: number | null;
  oralCancerReferredTotal: number | null;
  oralCancerDiagnosedTotal: number | null;
  oralCancerChemoTherapy: number | null;
  oralCancerSurgeryDone: number | null;

  breastCancerSuspectedTotal: number | null;
  breastCancerReferredTotal: number | null;
  breastCancerDiagnosedTotal: number | null;
  breastCancerChemoTherapy: number | null;
  breastCancerSurgeryDone: number | null;

  cervicalCancerSuspectedTotal: number | null;
  cervicalCancerReferredTotal: number | null;
  cervicalCancerDiagnosedTotal: number | null;
  cervicalCancerChemoTherapy: number | null;
  cervicalCancerSurgeryDone: number | null;

  hplcSamplesSentTotal: number | null;
  hplcAsCarrierCount: number | null;
  hplcSsCarrierCount: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private apiUrl = 'http://localhost:8080/api/hospitals';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAllHospitals(): Observable<Hospital[]> {
    return this.http.get<Hospital[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getHospitalById(id: number): Observable<Hospital> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Hospital>(url)
      .pipe(catchError(this.handleError));
  }

  createHospital(hospitalData: Hospital): Observable<Hospital> {
    return this.http.post<Hospital>(this.apiUrl, hospitalData, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateHospital(id: number, hospitalData: Hospital): Observable<Hospital> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Hospital>(url, hospitalData, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteHospital(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && typeof error.error === 'string') {
        errorMessage += `\nServer Error: ${error.error}`;
      } else if (error.error && error.error.message) {
        errorMessage += `\nServer Error: ${error.error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}