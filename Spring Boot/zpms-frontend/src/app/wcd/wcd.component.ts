import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AnganwadiService, Anganwadi } from '../anganwadi-service.service'; // Import interface

@Component({
  selector: 'app-wcd',
  imports: [CommonModule, ReactiveFormsModule, FormsModule], // Keep FormsModule if you use ngModel elsewhere
  standalone: true,
  templateUrl: './wcd.component.html',
  styleUrl: './wcd.component.scss'
})
export class WCDComponent implements OnInit {
  anganwadiForm: FormGroup;
  data: Anganwadi[] = []; // Use the Anganwadi interface
  selectedIndex: number | null = null;
  isEditMode = false;

  constructor(private fb: FormBuilder, private anganwadiService: AnganwadiService) {
    this.anganwadiForm = this.fb.group({
      id: [null], // Add id for updates, but not required for create
      entryDate: ['', Validators.required], // Expects yyyy-MM-dd from input type="date"
      projectName: ['', Validators.required],
      beatName: ['', Validators.required],
      anganwadiCenterName: ['', Validators.required],
      anganwadiNumber: ['', Validators.required],
      anganwadiWorkerName: ['', Validators.required],
      workerMobileNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      workerServiceDurationYears: [null, [Validators.required, Validators.min(0)]],
      workerResponsibility: [''],
      beneficiaries0To6Months: [null, Validators.min(0)],
      beneficiariesTotal: [null, Validators.min(0)],
      foodSupply6Months3Years: [''],
      drinkingWaterFacility: ['', Validators.required],
      educationalMaterialAvailable: ['', Validators.required],
      toyMaterialAvailable: ['', Validators.required],
      medicalCheckupFacility: ['', Validators.required],
      remarks: ['']
    });
  }

  ngOnInit(): void {
    this.loadAllAnganwadis();
  }

  loadAllAnganwadis(): void {
    this.anganwadiService.getAllAnganwadis().subscribe({
      next: (res) => {
        this.data = res;
        console.log('Data loaded:', this.data);
      },
      error: (err) => alert(`डेटा लोड करण्यात अडचण आली.\nError: ${err.message}`)
    });
  }

  onSubmit(): void {
    console.log('Form Submitted. Valid:', this.anganwadiForm.valid);
    console.log('Form Value:', this.anganwadiForm.value);

    if (this.anganwadiForm.invalid) {
      alert('कृपया सर्व आवश्यक माहिती अचूकपणे भरा.');
      // Optionally, mark all fields as touched to show validation errors
      this.anganwadiForm.markAllAsTouched();
      return;
    }

    const formData = this.anganwadiForm.value as Anganwadi;

    if (this.isEditMode && formData.id) {
      // Update existing entry
      this.anganwadiService.updateAnganwadi(formData.id, formData).subscribe({
        next: (res) => {
          alert('माहिती यशस्वीरित्या अपडेट केली गेली!');
          const index = this.data.findIndex(item => item.id === res.id);
          if (index !== -1) {
            this.data[index] = res;
          }
          this.resetForm();
        },
        error: (err) => alert(`अपडेट करताना त्रुटी आली.\nError: ${err.message}`)
      });
    } else {
      // Create new entry
      // Ensure id is not sent for new entries, or backend handles it as null
      const { id, ...createData } = formData; // Exclude id for creation
      this.anganwadiService.createAnganwadi(createData as Anganwadi).subscribe({
        next: (res) => {
          alert('माहिती यशस्वीरित्या जोडली गेली!');
          this.data.push(res);
          this.resetForm();
        },
        error: (err) => alert(`डेटा सबमिट करताना त्रुटी आली.\nError: ${err.message}`)
      });
    }
  }

  editData(anganwadiEntry: Anganwadi): void {
    this.isEditMode = true;
    // The entryDate from backend (LocalDate) will be serialized to "yyyy-MM-dd" string by Jackson
    // which is compatible with <input type="date">
    this.anganwadiForm.patchValue(anganwadiEntry);
    // Find index if needed for direct array manipulation, though not strictly necessary with id-based updates
    this.selectedIndex = this.data.findIndex(item => item.id === anganwadiEntry.id);
  }

  deleteData(id: number | undefined, index: number): void {
    if (id === undefined) {
        alert('Cannot delete entry without ID.');
        return;
    }
    if (confirm('तुम्हाला हे रेकॉर्ड खरंच हटवायचे आहे का?')) {
      this.anganwadiService.deleteAnganwadi(id).subscribe({
        next: () => {
          this.data.splice(index, 1);
          alert('रेकॉर्ड हटवण्यात आले.');
          if (this.anganwadiForm.value.id === id) { // If deleted item was in form
            this.resetForm();
          }
        },
        error: (err) => alert(`रेकॉर्ड हटवताना त्रुटी आली.\nError: ${err.message}`)
      });
    }
  }

  resetForm(): void {
    this.anganwadiForm.reset();
    this.isEditMode = false;
    this.selectedIndex = null;
    // Optionally set default values after reset if needed
    // e.g., this.anganwadiForm.patchValue({ drinkingWaterFacility: 'No' });
  }
}