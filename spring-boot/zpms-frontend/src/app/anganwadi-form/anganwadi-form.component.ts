// import { Component, OnDestroy, ViewChild, ElementRef, AfterViewInit, QueryList, ViewChildren, OnInit } from '@angular/core'; // Added OnInit
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { InspectionserviceService, AnganwadiInspectionPayload, AnganwadiInspection } from '../inspectionservice.service'; // Adjust path, import AnganwadiInspection
// import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute and Router

// @Component({
//   selector: 'app-anganwadi-form',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule],
//   templateUrl: './anganwadi-form.component.html',
//   styleUrls: ['./anganwadi-form.component.scss']
// })
// export class AnganwadiFormComponent implements OnInit, OnDestroy, AfterViewInit { // Added OnInit
//   inspectionForm: FormGroup;
//   photoFiles: (File | undefined)[] = [undefined, undefined, undefined, undefined];
//   photoPreviews: (string | ArrayBuffer | null)[] = [null, null, null, null];

//   isCameraOpen = false;
//   currentPhotoIndexForCamera: number | null = null;
//   videoStream: MediaStream | null = null;
//   cameraError: string | null = null;

//   @ViewChild('videoPlayer') videoPlayer: ElementRef<HTMLVideoElement> | undefined;
//   @ViewChild('canvasElement') canvasElement: ElementRef<HTMLCanvasElement> | undefined;
//   @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef<HTMLInputElement>>;

//   // For editing existing inspections if an ID is passed in URL
//   inspectionId: number | null = null;
//   isEditMode = false;

//   constructor(
//     private fb: FormBuilder,
//     private inspectionService: InspectionserviceService,
//     private route: ActivatedRoute,
//     private router: Router
//     ) {
//     this.inspectionForm = this.fb.group({
//       // Matched with AnganwadiInspectionPayload
//       taluka: ['', Validators.required],
//       villageName: ['', Validators.required],
//       anganwadiNumber: ['', Validators.required],
//       workerName: ['', Validators.required], // Mapped from supervisorName in old form
//       anganwadiHelperName: ['', Validators.required], // Mapped from matanisaName
//       workerHelperPresent: ['', Validators.required], // Mapped from wasMatanisaPresent
//       centerSurroundingsClean: ['', Validators.required], // Mapped from centerClean
//       centerCategory: ['', Validators.required], // Mapped from centerType
//       buildingType: ['', Validators.required],
//       toiletAvailable: ['', Validators.required], // Mapped from hasToilet
//       toiletUsage: ['', Validators.required], // Mapped from toiletUsable
//       drinkingWaterSupply: ['', Validators.required], // Mapped from drinkingWaterAvailable
//       inspectionDate: ['', Validators.required],
//       electricitySupply: ['', Validators.required],
//       childrenWeightMeasured: [null, [Validators.required, Validators.min(0)]],
//       normalWeightChildren: [null, [Validators.required, Validators.min(0)]],
//       totalEnrollment: [null, [Validators.required, Validators.min(0)]], // Mapped from registeredChildren
//       childrenPresent: [null, [Validators.required, Validators.min(0)]], // Mapped from attendingChildren
//       suwChildren: [null, [Validators.required, Validators.min(0)]], // Mapped from severelyUnderweight
//       muwChildren: [null, [Validators.required, Validators.min(0)]], // Mapped from moderatelyUnderweight
//       samChildren: [null, [Validators.required, Validators.min(0)]], // Mapped from severelyMalnourished
//       mamChildren: [null, [Validators.required, Validators.min(0)]], // Mapped from moderatelyMalnourished
//       breakfastMeal: ['', Validators.required], // Mapped from foodProvided
//       tasteQuality: ['', Validators.required], // Mapped from foodGrade
//       campaignsDetails: [''], // Mapped from campaigns
//       anganwadiFeedbackSuggestions: [''], // Mapped from suggestions
//       shera: [''],
//       status: ['Submitted'] // Default status, can be dynamic
//       // Geo-location and image filenames are handled separately, not direct form controls
//     });
//   }

//   ngOnInit(): void { // Added ngOnInit
//     this.route.paramMap.subscribe(params => {
//       const id = params.get('id');
//       if (id) {
//         this.inspectionId = +id; // Convert string id to number
//         this.isEditMode = true;
//         this.loadInspectionData(this.inspectionId);
//       }
//     });
//   }

//   loadInspectionData(id: number): void {
//     this.inspectionService.getInspectionById(id).subscribe({
//       next: (inspectionData) => {
//         this.inspectionForm.patchValue(inspectionData);
//         // Note: Image previews and files are not part of patchValue and would need separate handling if editing photos is supported.
//         // For simplicity, this example doesn't pre-fill photo previews on edit.
//       },
//       error: (err) => {
//         console.error('Error loading inspection data for edit:', err);
//         alert('Failed to load inspection data: ' + err.message);
//         this.router.navigate(['/some-error-page-or-list']); // Navigate away if load fails
//       }
//     });
//   }


//   ngAfterViewInit() {}

//   onFileChange(event: any, index: number) {
//     const file = event.target.files[0];
//     if (file) {
//       this.photoFiles[index] = file;
//       const reader = new FileReader();
//       reader.onload = () => this.photoPreviews[index] = reader.result;
//       reader.readAsDataURL(file);
//     } else {
//       this.photoFiles[index] = undefined;
//       this.photoPreviews[index] = null;
//     }
//   }

//   openCameraModal(index: number) {
//     this.currentPhotoIndexForCamera = index;
//     this.isCameraOpen = true;
//     this.cameraError = null;
//     setTimeout(() => this.startCamera(), 100);
//   }

//   async startCamera() {
//     if (!this.videoPlayer?.nativeElement) {
//         this.cameraError = "कॅमेरा घटक लोड झाला नाही.";
//         this.closeCameraModalAfterError();
//         return;
//     }
//     try {
//       if (navigator.mediaDevices?.getUserMedia) {
//         this.videoStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
//         if (this.videoPlayer.nativeElement) { // Check again if nativeElement is available
//             this.videoPlayer.nativeElement.srcObject = this.videoStream;
//             await this.videoPlayer.nativeElement.play();
//         } else {
//             this.cameraError = 'कॅमेरा व्हिडिओ प्लेयर उपलब्ध नाही.';
//             this.closeCameraModalAfterError();
//         }
//       } else {
//         this.cameraError = 'तुमचा ब्राउझर कॅमेराला सपोर्ट करत नाही.';
//         this.closeCameraModalAfterError();
//       }
//     } catch (err: any) {
//       console.error("Error accessing camera: ", err);
//       this.cameraError = `कॅमेरा सुरू करता आला नाही: ${err.name || err.message}`;
//       this.closeCameraModalAfterError();
//     }
//   }

//   snapPhoto() {
//     if (!this.videoPlayer?.nativeElement || !this.canvasElement?.nativeElement || !this.videoStream) {
//         this.cameraError = "फोटो काढण्यासाठी आवश्यक घटक नाहीत.";
//         return;
//     }
//     const video = this.videoPlayer.nativeElement;
//     const canvas = this.canvasElement.nativeElement;
//     if (video.readyState < video.HAVE_ENOUGH_DATA || video.videoWidth === 0) {
//         this.cameraError = "कॅमेरा व्हिडिओ तयार नाही.";
//         return;
//     }
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const context = canvas.getContext('2d');
//     if (context) {
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
//       const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
//       const imageFile = this.dataURLtoFile(dataUrl, `capture_${Date.now()}.jpg`);
//       if (this.currentPhotoIndexForCamera !== null) {
//         this.photoFiles[this.currentPhotoIndexForCamera] = imageFile;
//         this.photoPreviews[this.currentPhotoIndexForCamera] = dataUrl;
//         const fileInputRef = this.fileInputs.find((_, i) => i === this.currentPhotoIndexForCamera);
//         if (fileInputRef) fileInputRef.nativeElement.value = '';
//       }
//     } else {
//         this.cameraError = "फोटो काढता आला नाही.";
//     }
//     this.closeCameraModal();
//   }

//   dataURLtoFile(dataurl: string, filename: string): File {
//     const arr = dataurl.split(',');
//     const mimeMatch = arr[0].match(/:(.*?);/);
//     if (!mimeMatch) throw new Error("Invalid data URL");
//     const mime = mimeMatch[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) u8arr[n] = bstr.charCodeAt(n);
//     return new File([u8arr], filename, { type: mime });
//   }

//   closeCamera() {
//     this.videoStream?.getTracks().forEach(track => track.stop());
//     this.videoStream = null;
//     if (this.videoPlayer?.nativeElement) this.videoPlayer.nativeElement.srcObject = null;
//   }

//   closeCameraModal() {
//     this.isCameraOpen = false;
//     this.closeCamera();
//     this.currentPhotoIndexForCamera = null;
//   }

//   closeCameraModalAfterError() {
//     // Keep the modal open to show the error, or close if preferred
//     // this.isCameraOpen = false;
//     this.closeCamera();
//     // this.currentPhotoIndexForCamera = null; // Keep index if retry is an option from modal
//   }

//   onSubmit() {
//     if (this.inspectionForm.invalid) {
//       alert('कृपया सर्व आवश्यक फील्ड भरा.');
//       this.inspectionForm.markAllAsTouched();
//       // Focus on the first invalid control
//       const firstInvalidControl = Object.keys(this.inspectionForm.controls).find(key => {
//         const control = this.inspectionForm.get(key);
//         return control && control.invalid;
//       });
//       if (firstInvalidControl) {
//         const element = document.querySelector(`[formControlName="${firstInvalidControl}"]`);
//         if (element instanceof HTMLElement) {
//             element.focus();
//         }
//       }
//       return;
//     }

//     const formValue = this.inspectionForm.value;
//     const payload: AnganwadiInspectionPayload = { ...formValue };
//     // Geo-location data would be added here if captured
//     // payload.latitude1 = ...; payload.longitude1 = ...; etc.

//     const formData = new FormData();
//     formData.append('inspection', new Blob([JSON.stringify(payload)], { type: 'application/json' }));

//     let photoCount = 0;
//     this.photoFiles.forEach(file => {
//         if (file) {
//             formData.append('photos', file, file.name);
//             photoCount++;
//         }
//     });
//     // If no photos, Spring Boot might expect 'photos' part to be null or not present.
//     // If it must be present even if empty, for backend `MultipartFile[] photos` to not be null:
//     // if (photoCount === 0) {
//     //    formData.append('photos', new Blob([]), ''); // Empty blob with empty filename might work
//     // }

//     console.log("Submitting FormData:");
//     formData.forEach((value, key) => {
//       console.log(`${key}:`, value instanceof Blob && value.type === 'application/json' ? 'JSON Payload Blob' : value);
//     });

//     // For edit mode, you would call an update service method
//     // if (this.isEditMode && this.inspectionId) {
//     //   this.inspectionService.updateInspection(this.inspectionId, formData) ...
//     // } else {
//       this.inspectionService.submitInspection(formData).subscribe({
//         next: (res: AnganwadiInspection) => { // Expect AnganwadiInspection as response
//           alert('फॉर्म यशस्वीरित्या सबमिट केला! ID: ' + res.id);
//           this.inspectionForm.reset({ status: 'Submitted' }); // Reset with default status
//           this.photoFiles = [undefined, undefined, undefined, undefined];
//           this.photoPreviews = [null, null, null, null];
//           if (this.fileInputs) {
//             this.fileInputs.forEach(inputRef => {
//                 if(inputRef.nativeElement) inputRef.nativeElement.value = '';
//             });
//           }
//           // Optionally navigate away or to a success page
//           // this.router.navigate(['/inspection-list']);
//         },
//         error: (err: Error) => {
//           console.error('Form submission error:', err);
//           alert('फॉर्म सबमिट करताना त्रुटी आली:\n' + err.message);
//         }
//       });
//     // }
//   }

//   ngOnDestroy() {
//     this.closeCamera();
//   }
// }
import { Component, OnDestroy, ViewChild, ElementRef, AfterViewInit, QueryList, ViewChildren, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InspectionserviceService, AnganwadiInspectionPayload, AnganwadiInspection } from '../inspectionservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-anganwadi-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './anganwadi-form.component.html',
  styleUrls: ['./anganwadi-form.component.scss']
})
export class AnganwadiFormComponent implements OnInit, OnDestroy, AfterViewInit {
  inspectionForm: FormGroup;
  photoFiles: (File | undefined)[] = [undefined, undefined, undefined, undefined];
  photoPreviews: (string | ArrayBuffer | null)[] = [null, null, null, null];

  isCameraOpen = false;
  currentPhotoIndexForCamera: number | null = null;
  videoStream: MediaStream | null = null;
  cameraError: string | null = null;

  @ViewChild('videoPlayer') videoPlayer: ElementRef<HTMLVideoElement> | undefined;
  @ViewChild('canvasElement') canvasElement: ElementRef<HTMLCanvasElement> | undefined;
  @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef<HTMLInputElement>>;

  inspectionId: number | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private inspectionService: InspectionserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // This FormGroup definition is correct and doesn't need changes.
    this.inspectionForm = this.fb.group({
      taluka: ['', Validators.required],
      villageName: ['', Validators.required],
      anganwadiNumber: ['', Validators.required],
      workerName: ['', Validators.required],
      anganwadiHelperName: ['', Validators.required],
      workerHelperPresent: ['', Validators.required],
      centerSurroundingsClean: ['', Validators.required],
      centerCategory: ['', Validators.required],
      buildingType: ['', Validators.required],
      toiletAvailable: ['', Validators.required],
      toiletUsage: ['', Validators.required],
      drinkingWaterSupply: ['', Validators.required],
      inspectionDate: ['', Validators.required],
      electricitySupply: ['', Validators.required],
      childrenWeightMeasured: [null, [Validators.required, Validators.min(0)]],
      normalWeightChildren: [null, [Validators.required, Validators.min(0)]],
      totalEnrollment: [null, [Validators.required, Validators.min(0)]],
      childrenPresent: [null, [Validators.required, Validators.min(0)]],
      suwChildren: [null, [Validators.required, Validators.min(0)]],
      muwChildren: [null, [Validators.required, Validators.min(0)]],
      samChildren: [null, [Validators.required, Validators.min(0)]],
      mamChildren: [null, [Validators.required, Validators.min(0)]],
      breakfastMeal: ['', Validators.required],
      tasteQuality: ['', Validators.required],
      campaignsDetails: [''],
      anganwadiFeedbackSuggestions: [''],
      shera: [''],
      status: ['Submitted']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.inspectionId = +id;
        this.isEditMode = true;
        this.loadInspectionData(this.inspectionId);
      }
    });
  }

  // --- CORRECTED METHOD ---
  loadInspectionData(id: number): void {
    this.inspectionService.getInspectionById(id).subscribe({
      next: (inspectionData) => {
        // CORRECTION: Format the date for the HTML date input control
        if (inspectionData.inspectionDate) {
          inspectionData.inspectionDate = new Date(inspectionData.inspectionDate).toISOString().split('T')[0];
        }
        this.inspectionForm.patchValue(inspectionData);
        // Note: For simplicity, photo previews aren't pre-loaded on edit.
      },
      error: (err) => {
        console.error('Error loading inspection data for edit:', err);
        alert('Failed to load inspection data: ' + err.message);
        // CORRECTION: Navigate to a valid page (the main report list) on error
        this.router.navigate(['/inspections']);
      }
    });
  }


  ngAfterViewInit() {}

  // --- File and Camera methods are fine, no changes needed ---
  onFileChange(event: any, index: number) {
    const file = event.target.files?.[0];
    if (file) {
      this.photoFiles[index] = file;
      const reader = new FileReader();
      reader.onload = () => this.photoPreviews[index] = reader.result;
      reader.readAsDataURL(file);
    } else {
      this.photoFiles[index] = undefined;
      this.photoPreviews[index] = null;
    }
  }

  openCameraModal(index: number) {
    this.currentPhotoIndexForCamera = index;
    this.isCameraOpen = true;
    this.cameraError = null;
    setTimeout(() => this.startCamera(), 100);
  }

  async startCamera() {
    if (!this.videoPlayer?.nativeElement) {
        this.cameraError = "कॅमेरा घटक लोड झाला नाही.";
        return;
    }
    try {
      if (navigator.mediaDevices?.getUserMedia) {
        this.videoStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (this.videoPlayer.nativeElement) {
            this.videoPlayer.nativeElement.srcObject = this.videoStream;
            await this.videoPlayer.nativeElement.play();
        }
      } else {
        this.cameraError = 'तुमचा ब्राउझर कॅमेराला सपोर्ट करत नाही.';
      }
    } catch (err: any) {
      this.cameraError = `कॅमेरा सुरू करता आला नाही: ${err.name || err.message}`;
    }
  }

  snapPhoto() {
    if (!this.videoPlayer?.nativeElement || !this.canvasElement?.nativeElement || !this.videoStream) {
        this.cameraError = "फोटो काढण्यासाठी आवश्यक घटक नाहीत.";
        return;
    }
    const video = this.videoPlayer.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const imageFile = this.dataURLtoFile(dataUrl, `capture_${Date.now()}.jpg`);
      if (this.currentPhotoIndexForCamera !== null) {
        this.photoFiles[this.currentPhotoIndexForCamera] = imageFile;
        this.photoPreviews[this.currentPhotoIndexForCamera] = dataUrl;
        const fileInputRef = this.fileInputs.find((_, i) => i === this.currentPhotoIndexForCamera);
        if (fileInputRef) fileInputRef.nativeElement.value = '';
      }
    }
    this.closeCameraModal();
  }

  dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) throw new Error("Invalid data URL");
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  }

  closeCamera() {
    this.videoStream?.getTracks().forEach(track => track.stop());
    this.videoStream = null;
    if (this.videoPlayer?.nativeElement) this.videoPlayer.nativeElement.srcObject = null;
  }

  closeCameraModal() {
    this.isCameraOpen = false;
    this.closeCamera();
    this.currentPhotoIndexForCamera = null;
  }
  
  // --- CORRECTED AND COMPLETED METHOD ---
  onSubmit() {
    if (this.inspectionForm.invalid) {
      alert('कृपया सर्व आवश्यक फील्ड भरा. (Please fill all required fields).');
      this.inspectionForm.markAllAsTouched();
      // Focus on the first invalid control for better UX
      const firstInvalidControl = Object.keys(this.inspectionForm.controls).find(key => {
        const control = this.inspectionForm.get(key);
        return control && control.invalid;
      });
      if (firstInvalidControl) {
        document.querySelector<HTMLElement>(`[formControlName="${firstInvalidControl}"]`)?.focus();
      }
      return;
    }

    const payload: AnganwadiInspectionPayload = this.inspectionForm.value;
    const formData = new FormData();
    formData.append('inspection', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    this.photoFiles.forEach(file => { if (file) { formData.append('photos', file, file.name); } });

    // CORRECTION: Conditionally call create or update service based on isEditMode
    const operation = this.isEditMode && this.inspectionId
      ? this.inspectionService.updateInspection(this.inspectionId, formData)
      : this.inspectionService.submitInspection(formData);

    operation.subscribe({
      next: (res: AnganwadiInspection) => {
        // CORRECTION: Provide specific messages for create/update and navigate to the view page
        const message = this.isEditMode 
          ? 'तपासणी यशस्वीरित्या अपडेट केली!' 
          : 'फॉर्म यशस्वीरित्या सबमिट केला!';
        alert(`${message} ID: ${res.id}`);
        
        // Navigate to the detailed report view page for the submitted/updated item
        this.router.navigate(['/view-inspection', res.id]);
      },
      error: (err: Error) => {
        console.error('Form submission/update error:', err);
        alert('फॉर्म सबमिट करताना त्रुटी आली:\n' + err.message);
      }
    });
  }

  ngOnDestroy() {
    this.closeCamera();
  }
}