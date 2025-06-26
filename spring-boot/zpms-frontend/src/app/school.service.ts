import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the School interface matching your backend entity
export interface School {
  id?: number;
  date: string; // LocalDate will be sent/received as ISO string yyyy-MM-dd
  organizationName: string;
  schoolName: string;
  udiseNumber?: string;
  googleLocationLink?: string;
  category?: string;
  fullAddress?: string;
  taluka: string;
  district: string;
  pincode?: string;
  headmastersName: string;
  headmastersMobileNumber: string;
  isReportSubmitted?: boolean; 
}

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private apiUrl = 'http://localhost:8080/api/school';

  constructor(private http: HttpClient) { }

  // Create new school record
  createSchool(school: School): Observable<School> {
    return this.http.post<School>(this.apiUrl, school);
  }

  // Get all schools
  getAllSchools(): Observable<School[]> {
    return this.http.get<School[]>(this.apiUrl);
  }

  // Get school by ID
  getSchoolById(id: number): Observable<School> {
    return this.http.get<School>(`${this.apiUrl}/${id}`);
  }

  // Update school record
  updateSchool(id: number, school: School): Observable<School> {
    return this.http.put<School>(`${this.apiUrl}/${id}`, school);
  }

  // Delete school record
  deleteSchool(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
   
}
