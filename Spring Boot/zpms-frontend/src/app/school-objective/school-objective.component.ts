// // // src/app/school-objective/school-objective.component.ts
// // // FINAL CORRECTED CODE

// // import { Component, OnInit } from '@angular/core';
// // import { School, SchoolService } from '../school.service';
// // import { CommonModule, DatePipe } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { Router, RouterModule, ActivatedRoute } from '@angular/router';

// // @Component({
// //   selector: 'app-school-objective',
// //   standalone: true,
// //   imports: [CommonModule, FormsModule, RouterModule],
// //   providers: [DatePipe, SchoolService],
// //   templateUrl: './school-objective.component.html',
// //   styleUrls: ['./school-objective.component.scss']
// // })
// // export class SchoolObjectiveComponent implements OnInit {

// //   allSchools: School[] = [];
// //   filteredSchools: School[] = [];
// //   selectedTaluka: string = 'सर्व तालुके';
// //   selectedSchoolName: string = 'सर्व शाळा';
// //   fromDate: string = '';
// //   toDate: string = '';
// //   searchTerm: string = '';
// //   entriesToShow: number = 10;
// //   availableTalukas: string[] = [];
// //   availableSchoolNames: string[] = [];
// //   isLoading: boolean = false;

// //   constructor(
// //     private schoolService: SchoolService,
// //     private router: Router,
// //     private route: ActivatedRoute
// //   ) { }

// //   ngOnInit(): void {
// //     // ===================================================================
// //     // ====================== WHY THIS PATTERN WORKS =====================
// //     // This `subscribe` block runs EVERY time the URL's query parameters
// //     // change (e.g., /school-objective?refresh=12345). By navigating
// //     // back from the form with a query parameter, we force this code
// //     // to run again, which in turn calls the data loading method.
// //     // ===================================================================
// //     this.route.queryParamMap.subscribe(params => {
// //       // Restore filters if they are passed in the URL
// //       const initialTaluka = params.get('taluka') || 'सर्व तालुके';
// //       const initialSchoolName = params.get('schoolName') || 'सर्व शाळा';
      
// //       // This re-fetches fresh data from the server!
// //       this.loadSchoolsAndApplyInitialFilters(initialTaluka, initialSchoolName);
// //     });
// //   }

// //   loadSchoolsAndApplyInitialFilters(initialTaluka: string, initialSchoolName: string): void {
// //     this.isLoading = true;
// //     this.schoolService.getAllSchools().subscribe({
// //       next: (data) => {
// //         // This now gets the LATEST data from the server, where isReportSubmitted is `true`.
// //         this.allSchools = data.map(school => ({
// //           ...school,
// //           id: Number(school.id),
// //           isReportSubmitted: school.isReportSubmitted === true || String(school.isReportSubmitted).toLowerCase() === 'true'
// //         }));

// //         this.populateAllDropdowns();
        
// //         // Set filters based on the values from the URL
// //         this.selectedTaluka = initialTaluka;
// //         this.updateSchoolNameDropdown(); // Update school list based on taluka
// //         this.selectedSchoolName = initialSchoolName;
        
// //         this.applyFilters();
// //         this.isLoading = false;
// //       },
// //       error: (error) => {
// //         console.error('Error fetching schools:', error);
// //         this.isLoading = false;
// //       }
// //     });
// //   }

// //   populateAllDropdowns(): void {
// //     this.availableTalukas = ['सर्व तालुके', ...Array.from(new Set(this.allSchools.map(s => s.taluka).filter(Boolean)))].sort();
// //     this.updateSchoolNameDropdown();
// //   }

// //   onTalukaChange(): void {
// //     this.selectedSchoolName = 'सर्व शाळा';
// //     this.updateSchoolNameDropdown();
// //     this.applyFilters();
// //   }

// //   updateSchoolNameDropdown(): void {
// //     let schoolsForDropdown = this.allSchools;
// //     if (this.selectedTaluka && this.selectedTaluka !== 'सर्व तालुके') {
// //       schoolsForDropdown = this.allSchools.filter(s => s.taluka === this.selectedTaluka);
// //     }
// //     this.availableSchoolNames = ['सर्व शाळा', ...Array.from(new Set(schoolsForDropdown.map(s => s.schoolName).filter(Boolean)))].sort();
// //   }

// //   applyFilters(): void {
// //     let schools = [...this.allSchools];
// //     if (this.selectedTaluka && this.selectedTaluka !== 'सर्व तालुके') {
// //       schools = schools.filter(s => s.taluka === this.selectedTaluka);
// //     }
// //     if (this.selectedSchoolName && this.selectedSchoolName !== 'सर्व शाळा') {
// //       schools = schools.filter(s => s.schoolName === this.selectedSchoolName);
// //     }
// //     if (this.fromDate) {
// //         const from = new Date(this.fromDate);
// //         from.setHours(0, 0, 0, 0);
// //         schools = schools.filter(s => {
// //             if (!s.date) return false;
// //             const schoolDate = new Date(s.date);
// //             return schoolDate >= from;
// //         });
// //     }
// //     if (this.toDate) {
// //         const to = new Date(this.toDate);
// //         to.setHours(23, 59, 59, 999);
// //         schools = schools.filter(s => {
// //             if (!s.date) return false;
// //             const schoolDate = new Date(s.date);
// //             return schoolDate <= to;
// //         });
// //     }
// //     if (this.searchTerm) {
// //         const term = this.searchTerm.toLowerCase();
// //         schools = schools.filter(s =>
// //             s.schoolName?.toLowerCase().includes(term) ||
// //             s.headmastersName?.toLowerCase().includes(term) ||
// //             s.udiseNumber?.toLowerCase().includes(term) ||
// //             s.taluka?.toLowerCase().includes(term) ||
// //             s.headmastersMobileNumber?.includes(term)
// //         );
// //     }
// //     this.filteredSchools = schools;
// //   }
  
// //   onShowClick(): void {
// //       this.applyFilters();
// //   }

// //   onRemoveFiltersClick(): void {
// //     // Navigate with a query param to ensure a clean reload
// //     this.router.navigate(['/school-objective'], { queryParams: { removed: new Date().getTime() } });
// //   }

// //   isReportPending(school: School): boolean {
// //     if (!school.date || school.isReportSubmitted) {
// //       return false; 
// //     }
// //     const today = new Date();
// //     today.setHours(0, 0, 0, 0); 
// //     const visitDate = new Date(school.date);
// //     visitDate.setHours(0, 0, 0, 0);
// //     return visitDate > today;
// //   }

// //   canFillReport(school: School): boolean {
// //     if (!school.date || school.isReportSubmitted) {
// //       return false;
// //     }
// //     const today = new Date();
// //     today.setHours(0, 0, 0, 0);
// //     const visitDate = new Date(school.date);
// //     visitDate.setHours(0, 0, 0, 0);
// //     return visitDate <= today;
// //   }

// //   canViewReport(school: School): boolean {
// //     return school.isReportSubmitted === true;
// //   }

// //   exportToExcel(): void {
// //     if (this.filteredSchools.length === 0) {
// //       alert('No data to export.');
// //       return;
// //     }
// //     alert('Excel export functionality needs a dedicated library (e.g., xlsx). See console for data.');
// //   }

// //   // ==========================================================
// //   // ================ CHANGE THIS METHOD ======================
// //   // Pass the current filter values to the form page so it can
// //   // pass them back upon return.
// //   // ==========================================================
// //   navigateToFillVisitForm(schoolId?: number): void {
// //     if (typeof schoolId !== 'number') {
// //       alert('त्रुटी: शाळेचा आयडी उपलब्ध नाही.');
// //       return;
// //     }
// //     this.router.navigate(['/school-visit-form', schoolId], {
// //       queryParams: {
// //         // Pass the current filters
// //         taluka: this.selectedTaluka,
// //         schoolName: this.selectedSchoolName
// //       }
// //     });
// //   }

// //   navigateToViewVisitReport(schoolId?: number): void {
// //     if (typeof schoolId !== 'number') {
// //       alert('त्रुटी: शाळेचा आयडी उपलब्ध नाही.');
// //       return;
// //     }
// //     this.router.navigate(['/school-visit-report', schoolId]);
// //   }

// //   getSchoolType(category?: string): string {
// //     return category || 'N/A';
// //   }
// // }

// // src/app/school-objective/school-objective.component.ts

// import { Component, OnInit } from '@angular/core';
// import { School, SchoolService } from '../school.service';
// import { CommonModule, DatePipe } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterModule, ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-school-objective',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],
//   providers: [DatePipe, SchoolService],
//   templateUrl: './school-objective.component.html',
//   styleUrls: ['./school-objective.component.scss']
// })
// export class SchoolObjectiveComponent implements OnInit {

//   allSchools: School[] = [];
//   filteredSchools: School[] = [];
//   selectedTaluka: string = 'सर्व तालुके';
//   selectedSchoolName: string = 'सर्व शाळा';
//   fromDate: string = '';
//   toDate: string = '';
//   searchTerm: string = '';
//   entriesToShow: number = 10;
//   availableTalukas: string[] = [];
//   availableSchoolNames: string[] = [];
//   isLoading: boolean = false;

//   constructor(
//     private schoolService: SchoolService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) { }

//   ngOnInit(): void {
//     // This `subscribe` block runs EVERY time the URL's query parameters change.
//     // By navigating back from the form with a query parameter, we force this code
//     // to run again, which in turn calls the data loading method.
//     this.route.queryParamMap.subscribe(params => {
//       // Restore filters if they are passed in the URL
//       const initialTaluka = params.get('taluka') || 'सर्व तालुके';
//       const initialSchoolName = params.get('schoolName') || 'सर्व शाळा';
      
//       // This re-fetches fresh data from the server!
//       this.loadSchoolsAndApplyInitialFilters(initialTaluka, initialSchoolName);
//     });
//   }

//   loadSchoolsAndApplyInitialFilters(initialTaluka: string, initialSchoolName: string): void {
//     this.isLoading = true;
//     this.schoolService.getAllSchools().subscribe({
//       next: (data) => {
//         // This now gets the LATEST data from the server, where isReportSubmitted is `true`.
//         this.allSchools = data.map(school => ({
//           ...school,
//           id: Number(school.id),
//           isReportSubmitted: school.isReportSubmitted === true || String(school.isReportSubmitted).toLowerCase() === 'true'
//         }));

//         this.populateAllDropdowns();
        
//         // Set filters based on the values from the URL
//         this.selectedTaluka = initialTaluka;
//         this.updateSchoolNameDropdown(); // Update school list based on taluka
//         this.selectedSchoolName = initialSchoolName;
        
//         this.applyFilters();
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Error fetching schools:', error);
//         this.isLoading = false;
//       }
//     });
//   }

//   populateAllDropdowns(): void {
//     this.availableTalukas = ['सर्व तालुके', ...Array.from(new Set(this.allSchools.map(s => s.taluka).filter(Boolean)))].sort();
//     this.updateSchoolNameDropdown();
//   }

//   onTalukaChange(): void {
//     this.selectedSchoolName = 'सर्व शाळा';
//     this.updateSchoolNameDropdown();
//     this.applyFilters();
//   }

//   updateSchoolNameDropdown(): void {
//     let schoolsForDropdown = this.allSchools;
//     if (this.selectedTaluka && this.selectedTaluka !== 'सर्व तालुके') {
//       schoolsForDropdown = this.allSchools.filter(s => s.taluka === this.selectedTaluka);
//     }
//     this.availableSchoolNames = ['सर्व शाळा', ...Array.from(new Set(schoolsForDropdown.map(s => s.schoolName).filter(Boolean)))].sort();
//   }

//   applyFilters(): void {
//     let schools = [...this.allSchools];
//     if (this.selectedTaluka && this.selectedTaluka !== 'सर्व तालुके') {
//       schools = schools.filter(s => s.taluka === this.selectedTaluka);
//     }
//     if (this.selectedSchoolName && this.selectedSchoolName !== 'सर्व शाळा') {
//       schools = schools.filter(s => s.schoolName === this.selectedSchoolName);
//     }
//     if (this.fromDate) {
//         const from = new Date(this.fromDate);
//         from.setHours(0, 0, 0, 0);
//         schools = schools.filter(s => {
//             if (!s.date) return false;
//             const schoolDate = new Date(s.date);
//             return schoolDate >= from;
//         });
//     }
//     if (this.toDate) {
//         const to = new Date(this.toDate);
//         to.setHours(23, 59, 59, 999);
//         schools = schools.filter(s => {
//             if (!s.date) return false;
//             const schoolDate = new Date(s.date);
//             return schoolDate <= to;
//         });
//     }
//     if (this.searchTerm) {
//         const term = this.searchTerm.toLowerCase();
//         schools = schools.filter(s =>
//             s.schoolName?.toLowerCase().includes(term) ||
//             s.headmastersName?.toLowerCase().includes(term) ||
//             s.udiseNumber?.toLowerCase().includes(term) ||
//             s.taluka?.toLowerCase().includes(term) ||
//             s.headmastersMobileNumber?.includes(term)
//         );
//     }
//     this.filteredSchools = schools;
//   }
  
//   onShowClick(): void {
//       this.applyFilters();
//   }

//   onRemoveFiltersClick(): void {
//     this.router.navigate(['/school-objective'], { queryParams: { removed: new Date().getTime() } });
//   }

//   isReportPending(school: School): boolean {
//     if (!school.date || school.isReportSubmitted) {
//       return false; 
//     }
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); 
//     const visitDate = new Date(school.date);
//     visitDate.setHours(0, 0, 0, 0);
//     return visitDate > today;
//   }

//   canFillReport(school: School): boolean {
//     if (!school.date || school.isReportSubmitted) {
//       return false;
//     }
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const visitDate = new Date(school.date);
//     visitDate.setHours(0, 0, 0, 0);
//     return visitDate <= today;
//   }

//   canViewReport(school: School): boolean {
//     return school.isReportSubmitted === true;
//   }

//   exportToExcel(): void {
//     if (this.filteredSchools.length === 0) {
//       alert('No data to export.');
//       return;
//     }
//     alert('Excel export functionality needs a dedicated library (e.g., xlsx). See console for data.');
//   }

//   // Pass the current filter values to the form page so it can pass them back upon return.
//   navigateToFillVisitForm(schoolId?: number): void {
//     if (typeof schoolId !== 'number') {
//       alert('त्रुटी: शाळेचा आयडी उपलब्ध नाही.');
//       return;
//     }
//     this.router.navigate(['/school-visit-form', schoolId], {
//       queryParams: {
//         taluka: this.selectedTaluka,
//         schoolName: this.selectedSchoolName
//       }
//     });
//   }

//   navigateToViewVisitReport(schoolId?: number): void {
//     if (typeof schoolId !== 'number') {
//       alert('त्रुटी: शाळेचा आयडी उपलब्ध नाही.');
//       return;
//     }
//     this.router.navigate(['/school-visit-report', schoolId]);
//   }

//   getSchoolType(category?: string): string {
//     return category || 'N/A';
//   }
// }
import { Component, OnInit } from '@angular/core';
import { School, SchoolService } from '../school.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-school-objective',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [DatePipe, SchoolService],
  templateUrl: './school-objective.component.html',
  styleUrls: ['./school-objective.component.scss']
})
export class SchoolObjectiveComponent implements OnInit {

  allSchools: School[] = [];
  filteredSchools: School[] = [];
  selectedTaluka: string = 'सर्व तालुके';
  selectedSchoolName: string = 'सर्व शाळा';
  fromDate: string = '';
  toDate: string = '';
  searchTerm: string = '';
  entriesToShow: number = 10;
  availableTalukas: string[] = [];
  availableSchoolNames: string[] = [];
  isLoading: boolean = false;

  constructor(
    private schoolService: SchoolService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const initialTaluka = params.get('taluka') || 'सर्व तालुके';
      const initialSchoolName = params.get('schoolName') || 'सर्व शाळा';
      this.loadSchoolsAndApplyInitialFilters(initialTaluka, initialSchoolName);
    });
  }

  loadSchoolsAndApplyInitialFilters(initialTaluka: string, initialSchoolName: string): void {
    this.isLoading = true;
    this.schoolService.getAllSchools().subscribe({
      next: (data) => {
        this.allSchools = data.map(school => ({
          ...school,
          id: Number(school.id),
          isReportSubmitted: school.isReportSubmitted === true || String(school.isReportSubmitted).toLowerCase() === 'true'
        }));
        this.populateAllDropdowns();
        this.selectedTaluka = initialTaluka;
        this.updateSchoolNameDropdown();
        this.selectedSchoolName = initialSchoolName;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching schools:', error);
        this.isLoading = false;
      }
    });
  }

  populateAllDropdowns(): void {
    this.availableTalukas = ['सर्व तालुke', ...Array.from(new Set(this.allSchools.map(s => s.taluka).filter(Boolean)))].sort();
    this.updateSchoolNameDropdown();
  }

  onTalukaChange(): void {
    this.selectedSchoolName = 'सर्व शाळा';
    this.updateSchoolNameDropdown();
    this.applyFilters();
  }

  updateSchoolNameDropdown(): void {
    let schoolsForDropdown = this.allSchools;
    if (this.selectedTaluka && this.selectedTaluka !== 'सर्व तालुके') {
      schoolsForDropdown = this.allSchools.filter(s => s.taluka === this.selectedTaluka);
    }
    this.availableSchoolNames = ['सर्व शाळा', ...Array.from(new Set(schoolsForDropdown.map(s => s.schoolName).filter(Boolean)))].sort();
  }

  applyFilters(): void {
    let schools = [...this.allSchools];
    if (this.selectedTaluka && this.selectedTaluka !== 'सर्व तालुके') {
      schools = schools.filter(s => s.taluka === this.selectedTaluka);
    }
    if (this.selectedSchoolName && this.selectedSchoolName !== 'सर्व शाळा') {
      schools = schools.filter(s => s.schoolName === this.selectedSchoolName);
    }
    if (this.fromDate) {
        const from = new Date(this.fromDate);
        from.setHours(0, 0, 0, 0);
        schools = schools.filter(s => {
            if (!s.date) return false;
            const schoolDate = new Date(s.date);
            return schoolDate >= from;
        });
    }
    if (this.toDate) {
        const to = new Date(this.toDate);
        to.setHours(23, 59, 59, 999);
        schools = schools.filter(s => {
            if (!s.date) return false;
            const schoolDate = new Date(s.date);
            return schoolDate <= to;
        });
    }
    if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        schools = schools.filter(s =>
            s.schoolName?.toLowerCase().includes(term) ||
            s.headmastersName?.toLowerCase().includes(term) ||
            s.udiseNumber?.toLowerCase().includes(term) ||
            s.taluka?.toLowerCase().includes(term) ||
            s.headmastersMobileNumber?.includes(term)
        );
    }
    this.filteredSchools = schools;
  }
  
  onShowClick(): void { this.applyFilters(); }

  onRemoveFiltersClick(): void { this.router.navigate(['/school-objective'], { queryParams: { removed: new Date().getTime() } }); }

  isReportPending(school: School): boolean {
    if (!school.date || school.isReportSubmitted) return false;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const visitDate = new Date(school.date); visitDate.setHours(0, 0, 0, 0);
    return visitDate > today;
  }

  canFillReport(school: School): boolean {
    if (!school.date || school.isReportSubmitted) return false;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const visitDate = new Date(school.date); visitDate.setHours(0, 0, 0, 0);
    return visitDate <= today;
  }

  canViewReport(school: School): boolean { return school.isReportSubmitted === true; }

  exportToExcel(): void { alert('Excel export functionality needs a dedicated library (e.g., xlsx).'); }

  navigateToFillVisitForm(schoolId?: number): void {
    if (typeof schoolId !== 'number') { alert('त्रुटी: शाळेचा आयडी उपलब्ध नाही.'); return; }
    this.router.navigate(['/school-visit-form', schoolId], {
      queryParams: { taluka: this.selectedTaluka, schoolName: this.selectedSchoolName }
    });
  }

  navigateToViewVisitReport(schoolId?: number): void {
    if (typeof schoolId !== 'number') { alert('त्रुटी: शाळेचा आयडी उपलब्ध नाही.'); return; }
    this.router.navigate(['/school-visit-report', schoolId]);
  }

  getSchoolType(category?: string): string { return category || 'N/A'; }
}