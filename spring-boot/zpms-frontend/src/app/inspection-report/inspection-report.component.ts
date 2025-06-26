// import { CommonModule, DatePipe } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { InspectionserviceService, AnganwadiInspection } from '../inspectionservice.service'; // Ensure this path and interface are correct

// @Component({
//   selector: 'app-inspection-report',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, DatePipe],
//   templateUrl: './inspection-report.component.html',
//   styleUrls: ['./inspection-report.component.scss']
// })
// export class InspectionReportComponent implements OnInit {
//   filterForm!: FormGroup;
//   allAnganwadis: AnganwadiInspection[] = []; // Stores all fetched inspections
//   tableData: AnganwadiInspection[] = [];     // Stores inspections to be displayed after filtering

//   isLoading: boolean = false;
//   errorMessage: string | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private inspectionService: InspectionserviceService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.filterForm = this.fb.group({
//       taluka: [''],          // Filter by inspection's taluka
//       anganwadiNumber: [''], // Filter by inspection's anganwadiNumber (THIS IS THE KEY FOR THE ANGANWADI DROPDOWN VALUE)
//       fromDate: [''],        // Filter by inspection's inspectionDate
//       toDate: ['']           // Filter by inspection's inspectionDate
//     });
//     this.loadInitialData();
//   }

//   loadInitialData(): void {
//     this.isLoading = true;
//     this.errorMessage = null;
//     this.allAnganwadis = []; // Clear previous data
//     this.tableData = [];    // Clear previous data
//     this.inspectionService.getAllInspections().subscribe({
//       next: (data: AnganwadiInspection[]) => {
//         this.allAnganwadis = data;
//         this.showData(); // Apply initial (empty) filters or load all data
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Error fetching Inspection data:', error);
//         this.errorMessage = `Failed to load inspections: ${error.message || 'Unknown error while fetching data.'}`;
//         this.isLoading = false;
//       }
//     });
//   }

//   // Method called by "Show" button in HTML
//   showData(): void {
//     if (!this.filterForm) return; // Guard if called before ngOnInit

//     const filters = this.filterForm.value;
//     let filteredData = [...this.allAnganwadis];

//     if (filters.taluka) {
//       filteredData = filteredData.filter(insp => insp.taluka?.toLowerCase().includes(filters.taluka.toLowerCase()));
//     }
//     // Filters by anganwadiNumber. Assumes AnganwadiInspection has 'anganwadiNumber'.
//     if (filters.anganwadiNumber) {
//       filteredData = filteredData.filter(insp => insp.anganwadiNumber === filters.anganwadiNumber);
//     }
//     // Assumes AnganwadiInspection has 'inspectionDate'.
//     if (filters.fromDate) {
//       const from = new Date(filters.fromDate);
//       from.setHours(0,0,0,0); // Start of the day
//       filteredData = filteredData.filter(insp => {
//         if (!insp.inspectionDate) return false;
//         const inspectionDate = new Date(insp.inspectionDate);
//         return inspectionDate >= from;
//       });
//     }
//     if (filters.toDate) {
//       const to = new Date(filters.toDate);
//       to.setHours(23,59,59,999); // End of the day
//       filteredData = filteredData.filter(insp => {
//         if (!insp.inspectionDate) return false;
//         const inspectionDate = new Date(insp.inspectionDate);
//         return inspectionDate <= to;
//       });
//     }
//     this.tableData = filteredData;
//   }

//   clearFilters(): void {
//     this.filterForm.reset({
//       taluka: '',
//       anganwadiNumber: '',
//       fromDate: '',
//       toDate: ''
//     });
//     this.showData(); // Re-apply filters (which will show all data)
//   }

//   // Getter for unique Talukas dropdown.
//   // Assumes AnganwadiInspection has 'taluka' property.
//   get uniqueTalukas(): string[] {
//     if (!this.allAnganwadis) return [];
//     const talukas = this.allAnganwadis
//       .map(insp => insp.taluka)
//       .filter((t): t is string => !!t); // Type guard for filtering out undefined/null
//     return Array.from(new Set(talukas)).sort();
//   }

//   // Getter for unique Anganwadis in the selected Taluka.
//   // Returns array of { name: string, number: string }.
//   // Assumes AnganwadiInspection has 'anganwadiHelperName' (for anganwadi name) and 'anganwadiNumber'.
//   get uniqueAnganwadisForSelectedTaluka(): { name: string, number: string }[] {
//     if (!this.filterForm || !this.allAnganwadis) return [];

//     const selectedTaluka = this.filterForm.get('taluka')?.value;
//     let relevantInspections = this.allAnganwadis;

//     if (selectedTaluka) {
//       relevantInspections = this.allAnganwadis.filter(
//         insp => insp.taluka?.toLowerCase() === selectedTaluka.toLowerCase()
//       );
//     }

//     const anganwadisMap = new Map<string, { name: string, number: string }>();
//     relevantInspections.forEach(insp => {
//       // Using anganwadiHelperName for 'name' as suggested by NG1 error.
//       // Fallback to a generic name if anganwadiHelperName is not present.
//       const name = insp.anganwadiHelperName || `अंगणवाडी क्र. ${insp.anganwadiNumber || 'अज्ञात'}`;
//       const number = insp.anganwadiNumber;

//       if (number) { // Anganwadi number is essential to be in the list
//         if (!anganwadisMap.has(number)) {
//           anganwadisMap.set(number, { name: name, number: number });
//         }
//       }
//     });
//     return Array.from(anganwadisMap.values()).sort((a, b) => a.name.localeCompare(b.name));
//   }

//   // Method to view report details, called by button in HTML.
//   // Assumes AnganwadiInspection has 'id', 'anganwadiNumber', and 'anganwadiHelperName'.
//   viewReportDetails(inspectionId: number): void {
//     // console.log('Viewing Inspection Details:', inspection);
//     // // You can navigate to a details page or show a modal
//     // alert(`Viewing details for Inspection ID: ${inspection.id}\nAnganwadi Number: ${inspection.anganwadiNumber}\nAnganwadi Name: ${inspection.anganwadiHelperName || 'N/A'}`);
//     // Example navigation:
//     this.router.navigate(['/view-inspection', inspectionId]);
//   }

//   // This method was in your original component. Keeping it.
//   // Assumes AnganwadiInspection has 'id'.
//   editInspection(inspectionId: number): void {
//     this.router.navigate(['/anganwadi-form', inspectionId]);
//   }
// }

import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InspectionserviceService, AnganwadiInspection } from '../inspectionservice.service';

@Component({
  selector: 'app-inspection-report',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './inspection-report.component.html',
  styleUrls: ['./inspection-report.component.scss']
})
export class InspectionReportComponent implements OnInit {
  filterForm!: FormGroup;
  allAnganwadis: AnganwadiInspection[] = [];
  tableData: AnganwadiInspection[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private inspectionService: InspectionserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      taluka: [''], anganwadiNumber: [''], fromDate: [''], toDate: ['']
    });
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.inspectionService.getAllInspections().subscribe({
      next: (data: AnganwadiInspection[]) => {
        this.allAnganwadis = data.sort((a,b) => b.id - a.id); // Show newest first
        this.showData();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = `Failed to load inspections: ${error.message || 'Unknown error.'}`;
        this.isLoading = false;
      }
    });
  }

  showData(): void {
    if (!this.filterForm) return;
    const filters = this.filterForm.value;
    let filteredData = [...this.allAnganwadis];

    if (filters.taluka) {
      filteredData = filteredData.filter(insp => insp.taluka?.toLowerCase().includes(filters.taluka.toLowerCase()));
    }
    if (filters.anganwadiNumber) {
      filteredData = filteredData.filter(insp => insp.anganwadiNumber === filters.anganwadiNumber);
    }
    if (filters.fromDate) {
      const from = new Date(filters.fromDate); from.setHours(0, 0, 0, 0);
      filteredData = filteredData.filter(insp => insp.inspectionDate && new Date(insp.inspectionDate) >= from);
    }
    if (filters.toDate) {
      const to = new Date(filters.toDate); to.setHours(23, 59, 59, 999);
      filteredData = filteredData.filter(insp => insp.inspectionDate && new Date(insp.inspectionDate) <= to);
    }
    this.tableData = filteredData;
  }

  clearFilters(): void {
    this.filterForm.reset({ taluka: '', anganwadiNumber: '', fromDate: '', toDate: '' });
    this.showData();
  }

  get uniqueTalukas(): string[] {
    const talukas = this.allAnganwadis.map(insp => insp.taluka).filter((t): t is string => !!t);
    return Array.from(new Set(talukas)).sort();
  }

  get uniqueAnganwadisForSelectedTaluka(): { name: string, number: string }[] {
    const selectedTaluka = this.filterForm.get('taluka')?.value;
    let relevantInspections = this.allAnganwadis;

    if (selectedTaluka) {
      relevantInspections = this.allAnganwadis.filter(insp => insp.taluka?.toLowerCase() === selectedTaluka.toLowerCase());
    }

    const anganwadisMap = new Map<string, { name: string, number: string }>();
    relevantInspections.forEach(insp => {
      const name = insp.workerName || `Anganwadi No. ${insp.anganwadiNumber || 'Unknown'}`;
      const number = insp.anganwadiNumber;
      if (number && !anganwadisMap.has(number)) {
        anganwadisMap.set(number, { name, number });
      }
    });
    return Array.from(anganwadisMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  canFillReport(inspection: AnganwadiInspection): boolean {
    return inspection.status !== 'Submitted';
  }

  canViewReport(inspection: AnganwadiInspection): boolean {
    return inspection.status === 'Submitted';
  }

  fillOrEditReport(inspectionId: number): void {
    this.router.navigate(['/anganwadi-form', inspectionId]);
  }

  viewReport(inspectionId: number): void {
    this.router.navigate(['/view-inspection', inspectionId]);
  }
}