// src/app/schoolvisit.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SchoolVisitForm {
  id?: number;
  schoolId?: number; // Important for linking the visit to the school
  schoolName?: string;
  approvedTeachers?: number;
  workingTeachers?: number;
  femaleCount?: number;
  maleCount?: number;
  vacantTeachers?: number;
  presentteachers?: number;
  visitedClass?: string;
  grade?: string;
  section?: string;
  boysCount?: number;
  girlsCount?: number;
  totalCount?: number;
  attendancePercentage?: string;
  boysPresent?: number;
  girlsPresent?: number;
  totalPresent?: number;
  attendancePercentagePresent?: string;
  boysAbsent?: number;
  girlsAbsent?: number;
  totalAbsent?: number;
  attendancePercentageAbsent?: string;
  facilities?: { [key: string]: string };
  readingFeedback?: string;
  writingFeedback?: string;
  mathFeedback?: string;
  remark?: string;
  capturedImageData1?: string;
  latitude1?: number;
  longitude1?: number;
  existingImageFilename1?: string;
  capturedImageData2?: string;
  latitude2?: number;
  longitude2?: number;
  existingImageFilename2?: string;
  capturedImageData3?: string;
  latitude3?: number;
  longitude3?: number;
  existingImageFilename3?: string;
  capturedImageData4?: string;
  latitude4?: number;
  longitude4?: number;
  existingImageFilename4?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SchoolVisitService {
  private baseUrl = 'http://localhost:8080/api/school-visits';

  constructor(private http: HttpClient) {}

  getAllVisits(): Observable<SchoolVisitForm[]> {
    return this.http.get<SchoolVisitForm[]>(this.baseUrl);
  }

  getVisitById(id: number): Observable<SchoolVisitForm> {
    return this.http.get<SchoolVisitForm>(`${this.baseUrl}/${id}`);
  }

  createVisit(visit: SchoolVisitForm): Observable<SchoolVisitForm> {
    return this.http.post<SchoolVisitForm>(this.baseUrl, visit);
  }

  updateVisit(id: number, visit: SchoolVisitForm): Observable<SchoolVisitForm> {
    return this.http.put<SchoolVisitForm>(`${this.baseUrl}/${id}`, visit);
  }

  deleteVisit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}