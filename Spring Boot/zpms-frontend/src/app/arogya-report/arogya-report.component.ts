import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ArogyaService, Hospital } from '../arogya.service';

@Component({
  selector: 'app-arogya-report',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule ],
  providers: [DatePipe],
  templateUrl: './arogya-report.component.html',
  styleUrls: ['./arogya-report.component.scss']
})
export class ArogyaReportComponent implements OnInit {
  allData: Hospital[] = [];
  filteredData: Hospital[] = [];
  
  talukas$: Observable<string[]> = of([]);
  kendras$: Observable<string[]> = of([]);

  filterForm: FormGroup;
  searchTerm: string = '';

  constructor(
    private arogyaService: ArogyaService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.filterForm = this.fb.group({
      taluka: [''],
      kendra: [{ value: '', disabled: true }],
      fromDate: [''],
      toDate: ['']
    });
  }

  ngOnInit(): void {
    this.talukas$ = this.arogyaService.getTalukas();

    this.filterForm.get('taluka')?.valueChanges.subscribe(talukaValue => {
      const kendraControl = this.filterForm.get('kendra');
      if (talukaValue && talukaValue !== 'सर्व तालुके') {
        this.kendras$ = this.arogyaService.getArogyaKendras(talukaValue);
        kendraControl?.enable();
      } else {
        this.kendras$ = of([]);
        kendraControl?.disable();
      }
      kendraControl?.reset('');
    });
    
    this.route.queryParamMap.subscribe(params => {
      const initialTaluka = params.get('taluka');
      const initialKendra = params.get('kendra');
      this.loadDataAndApplyInitialFilters(initialTaluka, initialKendra);
    });
  }

  loadDataAndApplyInitialFilters(initialTaluka: string | null, initialKendra: string | null): void {
    this.arogyaService.getAllHospitals().subscribe({
      next: (data: Hospital[]) => {
        this.allData = data;
        
        if (initialTaluka && initialKendra) {
          this.filterForm.patchValue({ taluka: initialTaluka });
          setTimeout(() => {
            this.filterForm.patchValue({ kendra: initialKendra });
            this.applyFilters();
          }, 0);
        } else {
          this.filteredData = [...this.allData];
        }
      },
      error: (err: any) => console.error('Failed to fetch data:', err)
    });
  }

  applyFilters(): void {
    const { taluka, kendra, fromDate, toDate } = this.filterForm.value;
    let data = [...this.allData];

    if (taluka && taluka !== 'सर्व तालुके') {
      data = data.filter(item => item.phcName === taluka);
    }
    
    if (kendra && kendra !== 'सर्व आरोग्य केंद्र') {
      data = data.filter(item => item.subcenterName === kendra);
    }
    
    if (fromDate) {
      data = data.filter(item => item.inspection_date >= fromDate);
    }

    if (toDate) {
      data = data.filter(item => item.inspection_date <= toDate);
    }
    
    this.filteredData = data;
  }

  resetFilters(): void {
    this.router.navigate(['/arogya-report']).then(() => {
      this.filterForm.reset({ taluka: '', kendra: { value: '', disabled: true }, fromDate: '', toDate: '' });
      this.searchTerm = '';
      this.filteredData = [...this.allData];
    });
  }

  // --- REVISED BUTTON LOGIC ---

  /**
   * Shows "अहवाल प्रलंबित आहे" (Report is Pending).
   * Returns true if the report is NOT submitted and the inspection date is in the FUTURE.
   */
  isReportPending(item: Hospital): boolean {
    if (item.isReportSubmitted || !item.inspection_date) {
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    const inspectionDate = new Date(item.inspection_date);
    inspectionDate.setHours(0, 0, 0, 0); // Normalize to start of day

    return inspectionDate > today;
  }

  /**
   * Shows "उद्दिष्टांची माहिती भरा" (Fill Report Information).
   * Returns true if the report is NOT submitted and the inspection date is TODAY.
   */
  canFillReport(item: Hospital): boolean {
    if (item.isReportSubmitted || !item.inspection_date) {
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    const inspectionDate = new Date(item.inspection_date);
    inspectionDate.setHours(0, 0, 0, 0); // Normalize to start of day

    return inspectionDate.getTime() === today.getTime();
  }

  /**
   * Shows "उद्दिष्टांची माहिती पहा" (View Report Information).
   * Returns true if the report HAS been submitted.
   */
  canViewReport(item: Hospital): boolean {
    return !!item.isReportSubmitted;
  }

  // --- Button Actions (Unchanged) ---
  editReport(item: Hospital): void {
    this.router.navigate(['/arogya-form', item.id]);
  }

  viewReport(item: Hospital): void {
    this.router.navigate(['/report-arogya', item.id]);
  }
}