// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// // This interface represents the data sent TO the backend.
// // Note the absence of server-generated fields and image files.
// export interface ArogyaFormData {
//   arogya_kendra_name: string;
//   upkendra: string;
//   inspection_officer: string;
//   officer_role: string;
//   taluka: string;
//   inspection_date: string;
//   upkendra_sankhya: number | null;
//   gavanchi_sankhya: number | null;
//   HealthCenterAvailability247: boolean | null;
//   HealthCenterAvailabilityIPHS: boolean | null;
//   RKS_Sthapan: boolean | null;
//   RKS_Nondani: boolean | null;
//   RKS_Sabha_Niyamit: boolean | null;
//   RKS_Ekun_Sabha: number | null;
//   Executive_Meetings: number | null;
//   Government_Meetings: number | null;
//   bahya_parisara_swachata: boolean | null;
//   vruksharopan: boolean | null;
//   biomedical_waste_vyavastha: boolean | null;
//   pani_purvatha: boolean | null;
//   vidyut_purvatha: boolean | null;
//   vahan_chalu: boolean | null;
//   aushadhancha_satha: boolean | null;
//   vaidyakiya_adhikari_opd: boolean | null;
//   lasikaran_divas: boolean | null;
//   mahiti_adhikar_board: boolean | null;
//   sanrakshak_bhint: boolean | null;
//   lokseva_hakk_board: boolean | null;
//   vai_opd_diwas: boolean | null;
//   saha_rashtriya_aarogya: boolean | null;
//   rugnansathi_waiting: boolean | null;
//   delivery_kit: boolean | null;
//   baby_weight_machine: boolean | null;
//   cot_bed: boolean | null;
//   prasuti_kakshat_protocol: boolean | null;
//   emergency_tray: boolean | null;
//   adi_sirinj: boolean | null;
//   rugnana_kespaper: boolean | null;
//   baherun_aushadhi: boolean | null;
//   daily_expenditure: number | null;
//   kespaper_opd_fee: number | null;
//   weight_machine_bp: boolean | null;
//   delivery_room_swachata: boolean | null;
//   karmachari_ganveshat: boolean | null;
//   iec_material: boolean | null;
//   arv_asv_satha: boolean | null;
//   ort_corner: boolean | null;
//   pani_namune_tapasani: boolean | null;
//   opd_sankhya: number | null;
//   ipd_sankhya: number | null;
//   delivery_sankhya: number | null;
//   kutumb_kalyan_shasrkriya: number | null;
//   referral_sankhya: number | null;
//   takraar_pustika: boolean | null;
//   rugnanchya_natewaikansathi_suvidha: boolean | null;
//   parisarat_sathichya_aajarancha_pradurbhav: string;
//   mata_mrutyu_sandarbh: string;
//   _24_taas_atyavashyak_seva: boolean | null;
//   paa_kendra_adiadchani: string;
//   paa_kendramadhye_nikami_vastu: string;
//   vaia_karmachari_atyavashyak_seva: string;
//   prashikshan_aavashyak_karmcharyache_naav: string;
//   drinking_water: boolean | null;
//   telephone: boolean | null;
//   generator_inverter: boolean | null;
//   vehicle: boolean | null;
//   computer_internet: boolean | null;
//   solar_water_heater: boolean | null;
// }

// // This interface represents the full object received FROM the backend.
// export interface ArogyaFormResponse extends ArogyaFormData {
//     id: number;
//     created_at: string;
//     image_filename_1?: string;
//     image_filename_2?: string;
//     image_filename_3?: string;
//     image_filename_4?: string;
//     status: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ArogyaFormService {
//   private apiUrl = 'http://localhost:8080/api/arogya-forms';
//   private httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };

//   constructor(private http: HttpClient) { }

//   private handleError(error: HttpErrorResponse) {
//     console.error('API Error:', error);
//     let errorMessage = 'An unknown error occurred!';
//     if (error.error instanceof ErrorEvent) {
//       errorMessage = `Error: ${error.error.message}`;
//     } else {
//         errorMessage = `Server returned code ${error.status}, error message is: ${error.message}`;
//         if(error.error && typeof error.error === 'object') {
//            errorMessage += `\nDetails: ${JSON.stringify(error.error)}`;
//         }
//     }
//     return throwError(() => new Error(errorMessage));
//   }

//   createArogyaForm(arogyaData: ArogyaFormData): Observable<ArogyaFormResponse> {
//     return this.http.post<ArogyaFormResponse>(this.apiUrl, arogyaData, this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }

//   getAllArogyaForms(): Observable<ArogyaFormResponse[]> {
//     return this.http.get<ArogyaFormResponse[]>(this.apiUrl)
//       .pipe(catchError(this.handleError));
//   }

//   getArogyaFormById(id: number): Observable<ArogyaFormResponse> {
//     return this.http.get<ArogyaFormResponse>(`${this.apiUrl}/${id}`)
//       .pipe(catchError(this.handleError));
//   }

//   updateArogyaForm(id: number, arogyaData: ArogyaFormData): Observable<ArogyaFormResponse> {
//     return this.http.put<ArogyaFormResponse>(`${this.apiUrl}/${id}`, arogyaData, this.httpOptions)
//       .pipe(catchError(this.handleError));
//   }

//   deleteArogyaForm(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`)
//       .pipe(catchError(this.handleError));
//   }
//     submitArogyaForm(formData: FormData): Observable<ArogyaFormResponse> {
//     return this.http.post<ArogyaFormResponse>(this.apiUrl, formData).pipe(
//       catchError(this.handleError)
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interfaces remain the same, they are well-defined.
export interface ArogyaFormData {
  arogya_kendra_name: string;
  upkendra: string;
  inspection_officer: string;
  officer_role: string;
  taluka: string;
  inspection_date: string;
  upkendra_sankhya: number | null;
  gavanchi_sankhya: number | null;
  HealthCenterAvailability247: boolean | null;
  HealthCenterAvailabilityIPHS: boolean | null;
  RKS_Sthapan: boolean | null;
  RKS_Nondani: boolean | null;
  RKS_Sabha_Niyamit: boolean | null;
  RKS_Ekun_Sabha: number | null;
  Executive_Meetings: number | null;
  Government_Meetings: number | null;
  bahya_parisara_swachata: boolean | null;
  vruksharopan: boolean | null;
  biomedical_waste_vyavastha: boolean | null;
  pani_purvatha: boolean | null;
  vidyut_purvatha: boolean | null;
  vahan_chalu: boolean | null;
  aushadhancha_satha: boolean | null;
  vaidyakiya_adhikari_opd: boolean | null;
  lasikaran_divas: boolean | null;
  mahiti_adhikar_board: boolean | null;
  sanrakshak_bhint: boolean | null;
  lokseva_hakk_board: boolean | null;
  vai_opd_diwas: boolean | null;
  saha_rashtriya_aarogya: boolean | null;
  rugnansathi_waiting: boolean | null;
  delivery_kit: boolean | null;
  baby_weight_machine: boolean | null;
  cot_bed: boolean | null;
  prasuti_kakshat_protocol: boolean | null;
  emergency_tray: boolean | null;
  adi_sirinj: boolean | null;
  rugnana_kespaper: boolean | null;
  baherun_aushadhi: boolean | null;
  daily_expenditure: number | null;
  kespaper_opd_fee: number | null;
  weight_machine_bp: boolean | null;
  delivery_room_swachata: boolean | null;
  karmachari_ganveshat: boolean | null;
  iec_material: boolean | null;
  arv_asv_satha: boolean | null;
  ort_corner: boolean | null;
  pani_namune_tapasani: boolean | null;
  opd_sankhya: number | null;
  ipd_sankhya: number | null;
  delivery_sankhya: number | null;
  kutumb_kalyan_shasrkriya: number | null;
  referral_sankhya: number | null;
  takraar_pustika: boolean | null;
  rugnanchya_natewaikansathi_suvidha: boolean | null;
  parisarat_sathichya_aajarancha_pradurbhav: string;
  mata_mrutyu_sandarbh: string;
  _24_taas_atyavashyak_seva: boolean | null;
  paa_kendra_adiadchani: string;
  paa_kendramadhye_nikami_vastu: string;
  vaia_karmachari_atyavashyak_seva: string;
  prashikshan_aavashyak_karmcharyache_naav: string;
  drinking_water: boolean | null;
  telephone: boolean | null;
  generator_inverter: boolean | null;
  vehicle: boolean | null;
  computer_internet: boolean | null;
  solar_water_heater: boolean | null;
}

export interface ArogyaFormResponse extends ArogyaFormData {
    id: number;
    created_at: string;
    image_filename_1?: string;
    image_filename_2?: string;
    image_filename_3?: string;
    image_filename_4?: string;
    status: string;
}


@Injectable({
  providedIn: 'root'
})
export class ArogyaFormService {
  private apiUrl = 'http://localhost:8080/api/arogya-forms';

  // REMOVED: The httpOptions object is no longer needed for create/update.
  // The browser will automatically set the correct 'multipart/form-data' header
  // when you send FormData.

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
        errorMessage = `Server returned code ${error.status}, error message is: ${error.message}`;
        if(error.error && typeof error.error === 'object') {
           errorMessage += `\nDetails: ${JSON.stringify(error.error)}`;
        }
    }
    return throwError(() => new Error(errorMessage));
  }

  // RENAMED & CORRECTED: This is the single, correct way to create a form with images.
  createArogyaForm(formData: FormData): Observable<ArogyaFormResponse> {
    // This correctly sends the form data, including files.
    return this.http.post<ArogyaFormResponse>(this.apiUrl, formData).pipe(
      catchError(this.handleError)
    );
  }

  // UNCHANGED: This method is correct.
  getAllArogyaForms(): Observable<ArogyaFormResponse[]> {
    return this.http.get<ArogyaFormResponse[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }
  
  // UNCHANGED: This method is correct.
  getArogyaFormById(id: number): Observable<ArogyaFormResponse> {
    return this.http.get<ArogyaFormResponse>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // MODIFIED: This now accepts FormData, allowing you to update text and images at the same time.
  updateArogyaForm(id: number, formData: FormData): Observable<ArogyaFormResponse> {
    // NOTE: Your backend must be configured to handle a PUT/POST request with multipart/form-data for updates.
    return this.http.put<ArogyaFormResponse>(`${this.apiUrl}/${id}`, formData)
      .pipe(catchError(this.handleError));
  }

  // UNCHANGED: This method is correct.
  deleteArogyaForm(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // REMOVED: The old `createArogyaForm` and `submitArogyaForm` are now consolidated into the new `createArogyaForm`.
}