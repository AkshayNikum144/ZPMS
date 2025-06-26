import { Component, OnInit } from '@angular/core';
import { AnganwadiService, Anganwadi } from '../anganwadi-service.service'; // Import Anganwadi interface
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// This interface defines the structure of the form's model
export interface AnganwadiObjectiveForm {
  taluka: string | null;       // Will store beatName from selected Anganwadi
  anganwadiCenterName: string | null; // Will store anganwadiCenterName from selected Anganwadi
  objectiveDate: string | null; // Will be mapped to entryDate
}

@Component({
  selector: 'app-aganwadi-reportaganwadi-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './aganwadi-report.component.html',
  styleUrls: ['./aganwadi-report.component.scss']
})
export class AganwadiReportComponent implements OnInit {
  // Form model based on AnganwadiObjectiveForm
  objective: AnganwadiObjectiveForm = {
    taluka: null,
   anganwadiCenterName: null,
    objectiveDate: null
  };

  allAnganwadisData: Anganwadi[] = []; // Holds full Anganwadi objects from service
  talukas: string[] = []; // Holds unique beatNames for Taluka dropdown
  // Holds Anganwadi objects filtered by selected Taluka for Anganwadi dropdown
  filteredAnganwadis: Anganwadi[] = [];

  isLoading: boolean = false;
  submissionMessage: string | null = null;
  isError: boolean = false;

  constructor(private anganwadiService: AnganwadiService) { }

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.isLoading = true;
    this.anganwadiService.getAllAnganwadis().subscribe(
      (data: Anganwadi[]) => {
        this.allAnganwadisData = data;
        this.populateTalukas();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching Anganwadi data:', error);
        this.submissionMessage = 'Error loading initial data. Please try again.';
        this.isError = true;
        this.isLoading = false;
      }
    );
  }

  populateTalukas(): void {
    if (this.allAnganwadisData && this.allAnganwadisData.length > 0) {
      // Use beatName for Talukas, filter out null/empty, and sort
      const uniqueTalukas = new Set(
        this.allAnganwadisData.map(aw => aw.projectName).filter(name => !!name)
      );
      this.talukas = Array.from(uniqueTalukas).sort();
    } else {
      this.talukas = [];
    }
  }

  onTalukaChange(): void {
    this.objective.anganwadiCenterName = null; // Reset selected Anganwadi
    this.filteredAnganwadis = [];
    if (this.objective.taluka && this.allAnganwadisData) {
      // Filter Anganwadis based on the selected beatName (Taluka)
      // and sort them by anganwadiCenterName
      this.filteredAnganwadis = this.allAnganwadisData
        .filter(aw => aw.beatName === this.objective.taluka)
        .sort((a, b) => (a.anganwadiCenterName || '').localeCompare(b.anganwadiCenterName || ''));
    }
  }

  onSubmit(form: NgForm): void {
    this.submissionMessage = null;
    this.isError = false;

    if (form.invalid) {
      this.submissionMessage = 'Please fill all required fields.';
      this.isError = true;
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.isLoading = true;

    // The form collects objectiveDate, taluka (beatName), anganwadiName (anganwadiCenterName).
    // We need to find the full Anganwadi object to get other details like projectName, anganwadiNumber etc.
    // Or, if this component is truly for "Registering Objectives" against an *existing* anganwadi,
    // the backend API should be different.
    // Assuming we try to create a *new* Anganwadi record with limited info + defaults:
    const selectedAnganwadiForDefaults = this.filteredAnganwadis.find(
        aw => aw.anganwadiCenterName === this.objective.anganwadiCenterName && aw.beatName === this.objective.taluka
    );

    const anganwadiPayload: Anganwadi = {
      entryDate: this.objective.objectiveDate!,
      beatName: this.objective.taluka!,
      anganwadiCenterName: this.objective.anganwadiCenterName!,

      // --- Fields required by Anganwadi interface ---
      // Using values from the selected Anganwadi if found, otherwise defaults.
      // WARNING: These defaults are likely insufficient for backend validation.
      // This form is too simple to create a valid new Anganwadi entity.
      projectName: selectedAnganwadiForDefaults?.projectName || 'Default Project',
      anganwadiNumber: selectedAnganwadiForDefaults?.anganwadiNumber || 'N/A_FROM_REPORT_FORM',
      anganwadiWorkerName: selectedAnganwadiForDefaults?.anganwadiWorkerName || 'Default Worker',
      workerMobileNumber: selectedAnganwadiForDefaults?.workerMobileNumber || '0000000000', // Invalid pattern
      workerServiceDurationYears: selectedAnganwadiForDefaults?.workerServiceDurationYears || 0,
      drinkingWaterFacility: selectedAnganwadiForDefaults?.drinkingWaterFacility || 'Not Specified',
      educationalMaterialAvailable: selectedAnganwadiForDefaults?.educationalMaterialAvailable || 'Not Specified',
      toyMaterialAvailable: selectedAnganwadiForDefaults?.toyMaterialAvailable || 'Not Specified',
      medicalCheckupFacility: selectedAnganwadiForDefaults?.medicalCheckupFacility || 'Not Specified',

      // Optional fields
      workerResponsibility: selectedAnganwadiForDefaults?.workerResponsibility,
      beneficiaries0To6Months: selectedAnganwadiForDefaults?.beneficiaries0To6Months,
      beneficiariesTotal: selectedAnganwadiForDefaults?.beneficiariesTotal,
      foodSupply6Months3Years: selectedAnganwadiForDefaults?.foodSupply6Months3Years,
      remarks: selectedAnganwadiForDefaults?.remarks || 'Objective registered via simplified form.',
    };

    this.anganwadiService.createAnganwadi(anganwadiPayload).subscribe(
      (response) => {
        this.submissionMessage = 'उद्दिष्ट यशस्वीरित्या नोंदवले!';
        this.isError = false;
        this.isLoading = false;
        form.resetForm(); // Resets form values
        this.resetFormModel(); // Resets the component's model
        this.filteredAnganwadis = []; // Clear dependent dropdown
        // Optionally, reload initial data or talukas if necessary
        // this.loadInitialData();
      },
      (error: Error) => { // Catch the Error object thrown by handleError
        console.error('Error submitting Anganwadi objective:', error);
        this.submissionMessage = error.message || 'नोंदणी करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.';
        this.isError = true;
        this.isLoading = false;
      }
    );
  }

  onReset(form: NgForm): void {
    form.resetForm();
    this.resetFormModel();
    this.filteredAnganwadis = [];
    this.submissionMessage = null;
    this.isError = false;
  }

  private resetFormModel(): void {
    this.objective = {
      taluka: null,
      anganwadiCenterName: null,
      objectiveDate: null
    };
    // If talukas are dynamically populated based on some other filter, reset them too.
    // For now, talukas are populated once on init.
  }
}