// school-report.component.ts

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { School, SchoolService } from '../school.service';
import { Router } from '@angular/router';

@Component({
  // ... component metadata is unchanged
  selector: 'app-school-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DatePipe], 
  templateUrl: './school-report.component.html',
  styleUrls: ['./school-report.component.scss']
})
export class SchoolReportComponent implements OnInit {
  // ... properties are unchanged
  reportForm!: FormGroup;
  isLoading = false;
  talukas: string[] = [];
  schoolNames: string[] = [];
  schoolTypes: string[] = [];
  private allSchoolsData: School[] = [];
  private fb = inject(FormBuilder);
  private schoolService = inject(SchoolService);
  private datePipe = inject(DatePipe);
  private router = inject(Router);

  // ... ngOnInit, loadDropdownData, filterSchoolNames are unchanged
  ngOnInit(): void {
    this.reportForm = this.fb.group({
      taluka: ['', Validators.required],
      schoolName: ['', Validators.required],
      schoolType: ['', Validators.required],
      visitDate: [null, Validators.required]
    });
    this.loadDropdownData();
    this.reportForm.get('taluka')?.valueChanges.subscribe(selectedTaluka => {
      this.filterSchoolNames(selectedTaluka);
      this.reportForm.get('schoolName')?.setValue('');
      this.reportForm.get('schoolType')?.setValue('');
    });
    this.reportForm.get('schoolName')?.valueChanges.subscribe(selectedSchoolName => {
      const selectedTaluka = this.reportForm.get('taluka')?.value;
      const school = this.allSchoolsData.find(
        s => s.taluka === selectedTaluka && s.schoolName === selectedSchoolName
      );
      if (school && school.category) {
        this.reportForm.get('schoolType')?.setValue(school.category, { emitEvent: false });
      }
    });
  }
  loadDropdownData(): void {
    this.isLoading = true;
    this.schoolService.getAllSchools().pipe(finalize(() => this.isLoading = false)).subscribe({
      next: (schools) => {
        this.allSchoolsData = schools;
        this.talukas = [...new Set(schools.map(s => s.taluka).filter(Boolean))].sort();
        this.schoolTypes = [...new Set(schools.map(s => s.category).filter((c): c is string => typeof c === 'string'))].sort();
      },
      error: (err) => {
        console.error('Error fetching school data:', err);
        Swal.fire('Error', 'Could not load school data.', 'error');
      }
    });
  }
  filterSchoolNames(taluka: string | null): void {
    if (taluka) {
      this.schoolNames = [...new Set(
        this.allSchoolsData.filter(s => s.taluka === taluka).map(s => s.schoolName).filter(Boolean)
      )].sort();
    } else {
      this.schoolNames = [];
    }
  }


  // --- MODIFIED onSubmit METHOD ---
  onSubmit(): void {
    if (this.reportForm.invalid) {
      this.reportForm.markAllAsTouched();
      Swal.fire('Validation Error', 'Please fill all required fields.', 'warning');
      return;
    }

    this.isLoading = true;
    const formValue = this.reportForm.value;

    const selectedSchool = this.allSchoolsData.find(
      s => s.taluka === formValue.taluka &&
           s.schoolName === formValue.schoolName
    );

    if (!selectedSchool) {
      Swal.fire('Error', 'School not found for the selected Taluka and Name.', 'error');
      this.isLoading = false;
      return;
    }

    const reportData: School = {
      ...selectedSchool,
      category: formValue.schoolType,
      id: undefined,
      date: this.datePipe.transform(formValue.visitDate, 'yyyy-MM-dd') || ''
    };

    this.schoolService.createSchool(reportData).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: () => { // We don't need the createdReport object anymore
        Swal.fire('Success', 'Report submitted successfully!', 'success').then(() => {
          // Navigate to the objectives view, passing the school's identity as parameters
          this.router.navigate(['/school-objective'], { 
            queryParams: { 
              taluka: reportData.taluka, 
              schoolName: reportData.schoolName 
            } 
          });
        });
      },
      error: (err) => {
        console.error('Submission error:', err);
        Swal.fire('Error', 'Submission failed.', 'error');
      }
    });
  }

  // ... onReset and isInvalid are unchanged
  onReset(): void {
    this.reportForm.reset({
      taluka: '',
      schoolName: '',
      schoolType: '',
      visitDate: null
    });
    this.schoolNames = [];
  }
  isInvalid(controlName: string): boolean {
    const control = this.reportForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}