import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { School, SchoolService } from '../school.service';


// Custom validator for Google Maps link (ensure this is the latest version you have)
function googleMapsLinkValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const value = control.value as string;
  if (value) {
    const lowerValue = value.toLowerCase();
    const isValidGoogleLink =
      lowerValue.startsWith('https://maps.google.') ||
      (lowerValue.startsWith('https://www.google.') && lowerValue.includes('/maps')) ||
      lowerValue.startsWith('http://maps.google.') ||
      (lowerValue.startsWith('http://www.google.') && lowerValue.includes('/maps')) ||
      lowerValue.startsWith('https://goo.gl/maps') ||
      lowerValue.startsWith('https://maps.app.goo.gl/');
    if (!isValidGoogleLink) {
      return { 'invalidGoogleLink': true };
    }
  }
  return null;
}

@Component({
  selector: 'app-school-info-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
    // HttpClientModule might be needed here if not provided globally or by a parent
    // However, SchoolService is providedIn: 'root', so it uses the root injector
    // which should have HttpClient provided by HttpClientModule in your main app setup.
  ],
  templateUrl: './school-info-form.component.html',
  styleUrls: ['./school-info-form.component.scss']
})
export class SchoolInfoFormComponent implements OnInit {
  schoolForm!: FormGroup;
  data: School[] = []; // Use School interface from service
  editingIndex: number | null = null;
  isEditing: boolean = false;
  // private schoolBeingEditedId: number | null = null; // To store ID for update

  get f(): { [key: string]: AbstractControl } {
    return this.schoolForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private schoolService: SchoolService // Inject SchoolService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadDataFromBackend(); // Load data from backend
  }

  private initializeForm(): void {
    // Form definition remains the same as it aligns well with the School interface
    this.schoolForm = this.fb.group({
      date: [this.getCurrentDate(), Validators.required],
      organizationName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      schoolName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      udiseNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]], // Make optional if matches backend: Validators.pattern(/^\d{11}$/)
      googleLocationLink: ['', [Validators.pattern(/^https?:\/\/.+/), googleMapsLinkValidator]], // Make optional: Validators.pattern(/^https?:\/\/.+/), googleMapsLinkValidator
      category: [''], // Make optional
      fullAddress: ['', [Validators.minLength(10), Validators.maxLength(250)]], // Make optional
      taluka: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      district: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      pincode: ['', [Validators.pattern(/^\d{6}$/)]], // Make optional
      headmastersName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      headmastersMobileNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
    });
     // Adjust 'required' based on your 'School' interface. Example:
     // If googleLocationLink is optional in backend (School interface), remove Validators.required here.
     // The provided School interface has some fields as optional.
     // For now, I'll keep the form validators as they were, assuming you want them required on the front-end.
     // If a field is optional in backend, and you try to submit an empty string for it, it should be fine.
     // If a field is truly optional and can be null/not present, you might not need Validators.required.
     // Your `School` interface:
     // udiseNumber?: string; googleLocationLink?: string; category?: string; fullAddress?: string; pincode?: string;
     // The form has these as required. This is a design choice. If the form requires them, that's fine.
     // If they are truly optional, remove Validators.required.
     // For googleLocationLink, for example:
     // googleLocationLink: ['', [Validators.pattern(/^https?:\/\/.+/), googleMapsLinkValidator]], // Removed Validators.required
     // I'll keep your original form validators.
  }


  private getCurrentDate(): string {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${today.getFullYear()}-${month}-${day}`;
  }

  loadDataFromBackend(): void {
    this.schoolService.getAllSchools().subscribe({
      next: (schools) => {
        this.data = schools;
        console.log('Schools loaded from backend:', schools);
      },
      error: (err) => {
        console.error('Error loading schools from backend:', err);
        // Potentially display a user-friendly error message
        this.data = []; // Reset data on error
      }
    });
  }

  onSubmit(): void {
    if (this.schoolForm.invalid) {
      this.schoolForm.markAllAsTouched();
      console.error("Form is invalid. Please check the fields.");
      this.logFormErrors();
      return;
    }

    const schoolDataFromForm: School = this.schoolForm.value;

    if (this.isEditing && this.editingIndex !== null && this.data[this.editingIndex]?.id) {
      // UPDATE existing school
      const schoolToUpdate = this.data[this.editingIndex];
      const payload: School = {
        ...schoolToUpdate, // Includes the ID and any other existing fields
        ...schoolDataFromForm // Overwrites with new form values
      };
      this.schoolService.updateSchool(schoolToUpdate.id!, payload).subscribe({
        next: (updatedSchool) => {
          console.log('School updated on backend:', updatedSchool);
          this.data[this.editingIndex!] = updatedSchool; // Update local data
          this.onReset();
          // Optionally: this.loadDataFromBackend(); // To refresh the entire list
        },
        error: (err) => {
          console.error('Error updating school:', err);
          // Display user-friendly error
        }
      });
    } else {
      // CREATE new school
      // The schoolDataFromForm typically won't have an 'id' as it's from the form.
      // If it somehow did, the backend should ignore it for new entities or you could delete it:
      // const { id, ...payload } = schoolDataFromForm; // To explicitly remove id
      this.schoolService.createSchool(schoolDataFromForm).subscribe({
        next: (newSchool) => {
          console.log('School created on backend:', newSchool);
          this.data.push(newSchool); // Add to local data
          this.onReset();
          // Optionally: this.loadDataFromBackend(); // To refresh the entire list
        },
        error: (err) => {
          console.error('Error creating school:', err);
          // Display user-friendly error
        }
      });
    }
  }

  onReset(): void {
    this.schoolForm.reset();
    this.schoolForm.patchValue({
      date: this.getCurrentDate(),
      category: '' // Reset select to placeholder
    });
    this.editingIndex = null;
    this.isEditing = false;
    // this.schoolBeingEditedId = null;
  }

  editData(school: School, index: number): void { // Parameter is now School
    this.schoolForm.patchValue(school); // Patch form with school data (including potential ID if it was a form field)
    this.editingIndex = index;
    this.isEditing = true;
    // this.schoolBeingEditedId = school.id!;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log("Editing school:", school);
  }

  deleteData(index: number): void {
    const schoolToDelete = this.data[index];
    if (!schoolToDelete || typeof schoolToDelete.id === 'undefined') {
      console.error('School data or ID is missing for deletion.');
      return;
    }

    if (confirm('तुम्ही हा रेकॉर्ड डिलीट करू इच्छिता? (Are you sure you want to delete this record?)')) {
      this.schoolService.deleteSchool(schoolToDelete.id!).subscribe({
        next: () => {
          console.log('School deleted from backend, ID:', schoolToDelete.id);
          this.data.splice(index, 1); // Remove from local data
          if (this.editingIndex === index) {
            this.onReset(); // Reset form if the edited item was deleted
          } else if (this.editingIndex !== null && this.editingIndex > index) {
            this.editingIndex--; // Adjust editing index
          }
        },
        error: (err) => {
          console.error('Error deleting school:', err);
          // Display user-friendly error
        }
      });
    }
  }

  // logFormErrors remains the same
  private logFormErrors(): void {
    console.log('--- Form Validity ---:', this.schoolForm.valid);
    Object.keys(this.schoolForm.controls).forEach(key => {
      const control = this.schoolForm.get(key);
      if (control && control.errors) {
        console.warn(`Control: ${key}, Value: '${control.value}', Status: ${control.status}, Errors: ${JSON.stringify(control.errors)}`);
      }
    });
  }

  // REMOVE private saveData(): void and private loadData(): void (the localStorage versions)
  // They are replaced by loadDataFromBackend() and the backend calls in onSubmit().
}