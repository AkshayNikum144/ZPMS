// src/app/arogya.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

// --- DATA MODELS ---

export interface Hospital {
  id: number;
  phcName: string;
  subcenterName: string;
  inspection_date: string;
  isReportSubmitted: boolean;
  [key: string]: any;
}

export interface ChecklistData {
  taluka: string;
  prathmik_arogya_kendra: string;
  bheticha_dinank: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArogyaService {

  private mockHospitals: Hospital[] = [
    { id: 1, phcName: 'Kudal', subcenterName: 'Nerur', inspection_date: '2023-10-20', isReportSubmitted: false },
    { id: 2, phcName: 'Kudal', subcenterName: 'Bambuli', inspection_date: '2023-09-05', isReportSubmitted: true },
    { id: 3, phcName: 'Vengurla', subcenterName: 'Shiroda', inspection_date: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], isReportSubmitted: false },
    { id: 4, phcName: 'Kasal', subcenterName: 'Akeri', inspection_date: '2023-10-15', isReportSubmitted: true },
    { id: 5, phcName: 'Kasal', subcenterName: 'Salgaon', inspection_date: new Date().toISOString().split('T')[0], isReportSubmitted: false },
  ];

  constructor() { }

  // --- METHODS FOR THE REPORT COMPONENT ---

  getAllHospitals(): Observable<Hospital[]> {
    return of(this.mockHospitals).pipe(delay(500));
  }
  
  getHospitalById(id: number): Observable<Hospital | undefined> {
    const hospital = this.mockHospitals.find(h => h.id === id);
    return of(hospital).pipe(delay(300));
  }

  // --- METHODS FOR THE CHECKLIST FORM & REPORT FILTER ---

  getTalukas(): Observable<string[]> {
    const talukas = ['सर्व तालुके', ...new Set(this.mockHospitals.map(h => h.phcName))];
    return of(talukas.sort());
  }
  
  // *** THIS IS THE SINGLE, CORRECT IMPLEMENTATION ***
  getArogyaKendras(taluka: string): Observable<string[]> {
    const kendras = this.mockHospitals
      .filter(h => h.phcName === taluka)
      .map(h => h.subcenterName);
      
    // Add the "All" option to the list for this dropdown
    return of(['सर्व आरोग्य केंद्र', ...new Set(kendras)].sort());
  }
  
  submitChecklist(data: ChecklistData): Observable<any> {
    const newId = Math.max(...this.mockHospitals.map(h => h.id)) + 1;
    
    const newHospitalEntry: Hospital = {
      id: newId,
      phcName: data.taluka,
      subcenterName: data.prathmik_arogya_kendra,
      inspection_date: data.bheticha_dinank,
      isReportSubmitted: false
    };

    this.mockHospitals.push(newHospitalEntry);
    console.log('Added new entry to mock DB:', newHospitalEntry);
    
    return of({ success: true, newData: newHospitalEntry });
  }

  // --- METHOD FOR THE DETAILED FORM ---

  updateArogyaForm(id: number, formData: FormData): Observable<any> {
    console.log(`Updating form for ID ${id}:`, Object.fromEntries(formData.entries()));
    const index = this.mockHospitals.findIndex(h => h.id === id);
    if(index !== -1) {
      this.mockHospitals[index].isReportSubmitted = true;
    }
    return of({ success: true, message: 'Form Updated' }).pipe(delay(1000));
  }
}