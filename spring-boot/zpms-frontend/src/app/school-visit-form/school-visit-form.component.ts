// // src/app/school-visit-form/school-visit-form.component.ts

// import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { finalize } from 'rxjs/operators';
// import { SchoolVisitForm, SchoolVisitService } from '../schoolvisit.service'; // Ensure this path is correct

// // Declare bootstrap for type safety with Bootstrap's JS modal
// declare var bootstrap: any;

// // Interfaces for strong typing
// export interface SchoolData {
//   id?: number;
//   schoolName: string;
//   approvedTeachers: number | null;
//   workingTeachers: number | null;
//   femaleCount: number | null;
//   maleCount: number | null;
//   vacantTeachers: number | null;
//   presentteachers: number | null;
//   visitedClass: string;
//   grade: string;
//   section: string;
//   boysCount: number | null;
//   girlsCount: number | null;
//   totalCount: number | null;
//   attendancePercentage: number | null;
//   boysPresent: number | null;
//   girlsPresent: number | null;
//   totalPresent: number | null;
//   attendancePercentagePresent: number | null;
//   boysAbsent: number | null;
//   girlsAbsent: number | null;
//   totalAbsent: number | null;
//   attendancePercentageAbsent: number | null;
//   facilities: string[];
//   readingFeedback: string;
//   writingFeedback: string;
//   mathFeedback: string;
//   remark: string;
//   imageSections: ImageSectionData[];
// }

// export interface ImageSectionData {
//   capturedImageData: string | ArrayBuffer | null; // From FileReader (base64 string) or null
//   latitude: number | null;
//   longitude: number | null;
//   existingImageFilename: string | null;
// }

// @Component({
//   selector: 'app-school-visit-form',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './school-visit-form.component.html',
//   styleUrls: ['./school-visit-form.component.scss']
// })
// export class SchoolVisitFormComponent implements OnInit, AfterViewInit, OnDestroy {
//   visitForm!: FormGroup;
//   submittedData: SchoolData[] = [];
//   editingIndex: number | null = null;
//   isEditing: boolean = false;
//   isLoading: boolean = false;

//   availableFacilities: string[] = [
//     'पिण्याच्या पाण्याची सोय (Drinking Water)', 'मुलांसाठी स्वच्छतागृह (Boys Toilet)',
//     'मुलींसाठी स्वच्छतागृह (Girls Toilet)', 'खेळाचे मैदान (Playground)',
//     'ग्रंथालय (Library)', 'विज्ञान प्रयोगशाळा (Science Lab)',
//     'संगणक कक्ष (Computer Lab)', 'इंटरनेट कनेक्टिव्हिटी (Internet)',
//     'वीज (Electricity)', 'सीमा भिंत (Boundary Wall)', 'रॅम्प (Ramp for CWSN)'
//   ];

//   // Camera related properties
//   @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
//   @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
//   cameraModalElement: HTMLElement | null = null;
//   cameraModalInstance: any; // For Bootstrap modal instance
//   currentCameraImageIndex: number | null = null;
//   mediaStream: MediaStream | null = null;
//   cameraError: string | null = null;

//   get f() { return this.visitForm.controls; }
//   get imageSections() { return this.visitForm.get('imageSections') as FormArray; }
//   get facilities() { return this.visitForm.get('facilities') as FormArray; }

//   constructor(
//     private fb: FormBuilder,
//     private schoolVisitService: SchoolVisitService,
//     private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.initializeForm();
//     this.loadVisitsFromServer();
//   }

//   ngAfterViewInit() {
//     this.cameraModalElement = document.getElementById('cameraModal');
//     if (this.cameraModalElement) {
//       this.cameraModalInstance = new bootstrap.Modal(this.cameraModalElement, {
//         backdrop: 'static',
//         keyboard: false
//       });
//       this.cameraModalElement.addEventListener('hidden.bs.modal', () => {
//         this.stopCameraStream();
//         this.cameraError = null; // Clear error when modal is fully hidden
//         this.cdr.detectChanges(); // Notify Angular of state change
//       });
//        this.cameraModalElement.addEventListener('shown.bs.modal', () => {
//         // When modal is fully shown, if camera isn't active yet and no error,
//         // it means we are in the process of starting it.
//         // This is mostly for UI consistency if `openCameraModal` has quick error.
//         this.cdr.detectChanges();
//       });
//     }
//   }

//   ngOnDestroy(): void {
//     this.stopCameraStream();
//     if (this.cameraModalInstance) {
//       this.cameraModalInstance.dispose();
//     }
//   }

//   private initializeForm(): void {
//     this.visitForm = this.fb.group({
//       schoolName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
//       approvedTeachers: [null, [Validators.required, Validators.min(0), Validators.max(500)]],
//       workingTeachers: [null, [Validators.required, Validators.min(0), Validators.max(500)]],
//       femaleCount: [null, [Validators.required, Validators.min(0), Validators.max(500)]],
//       maleCount: [null, [Validators.required, Validators.min(0), Validators.max(500)]],
//       vacantTeachers: [{ value: null, disabled: true }, [Validators.min(0)]],
//       presentteachers: [null, [Validators.required, Validators.min(0), Validators.max(500)]],
//       visitedClass: ['', [Validators.required, Validators.maxLength(50)]],
//       grade: ['', [Validators.required, Validators.maxLength(20)]],
//       section: ['', [Validators.maxLength(10)]],
//       boysCount: [null, [Validators.required, Validators.min(0), Validators.max(1000)]],
//       girlsCount: [null, [Validators.required, Validators.min(0), Validators.max(1000)]],
//       totalCount: [{ value: null, disabled: true }, [Validators.min(0)]],
//       attendancePercentage: [{ value: null, disabled: true }, [Validators.min(0), Validators.max(100)]],
//       boysPresent: [null, [Validators.required, Validators.min(0), Validators.max(1000)]],
//       girlsPresent: [null, [Validators.required, Validators.min(0), Validators.max(1000)]],
//       totalPresent: [{ value: null, disabled: true }, [Validators.min(0)]],
//       attendancePercentagePresent: [{ value: null, disabled: true }, [Validators.min(0), Validators.max(100)]],
//       boysAbsent: [{ value: null, disabled: true }, [Validators.min(0)]],
//       girlsAbsent: [{ value: null, disabled: true }, [Validators.min(0)]],
//       totalAbsent: [{ value: null, disabled: true }, [Validators.min(0)]],
//       attendancePercentageAbsent: [{ value: null, disabled: true }, [Validators.min(0), Validators.max(100)]],
//       facilities: this.fb.array(
//         this.availableFacilities.map(() => this.fb.control(false)),
//       ),
//       readingFeedback: ['', [Validators.required, Validators.maxLength(1000)]],
//       writingFeedback: ['', [Validators.required, Validators.maxLength(1000)]],
//       mathFeedback: ['', [Validators.required, Validators.maxLength(1000)]],
//       remark: ['', Validators.maxLength(2000)],
//       imageSections: this.fb.array([this.createImageSection()])
//     });
//     this.setupValueChangeListeners();
//   }

//   private setupValueChangeListeners(): void {
//     const teacherFields = ['approvedTeachers', 'workingTeachers'];
//     teacherFields.forEach(field => {
//       this.visitForm.get(field)?.valueChanges.subscribe(() => this.calculateVacantTeachers());
//     });

//     const studentEnrollmentFields = ['boysCount', 'girlsCount'];
//     studentEnrollmentFields.forEach(field => {
//       this.visitForm.get(field)?.valueChanges.subscribe(() => {
//         this.calculateTotalStudents();
//         this.calculateAttendanceAndAbsentees();
//       });
//     });

//     const studentPresentFields = ['boysPresent', 'girlsPresent'];
//     studentPresentFields.forEach(field => {
//       this.visitForm.get(field)?.valueChanges.subscribe(() => this.calculateAttendanceAndAbsentees());
//     });
//   }

//   calculateVacantTeachers(): void {
//     const approved = this.f['approvedTeachers'].value || 0;
//     const working = this.f['workingTeachers'].value || 0;
//     this.visitForm.patchValue({ vacantTeachers: Math.max(0, approved - working) }, { emitEvent: false });
//   }

//   calculateTotalStudents(): void {
//     const boys = this.f['boysCount'].value || 0;
//     const girls = this.f['girlsCount'].value || 0;
//     this.visitForm.patchValue({ totalCount: boys + girls }, { emitEvent: false });
//   }

//   calculateAttendanceAndAbsentees(): void {
//     const boysEnrolled = this.f['boysCount'].value || 0;
//     const girlsEnrolled = this.f['girlsCount'].value || 0;
//     const totalEnrolled = boysEnrolled + girlsEnrolled;

//     const boysPresentValue = this.f['boysPresent'].value;
//     const girlsPresentValue = this.f['girlsPresent'].value;

//     const boysPresent = (boysPresentValue === null || boysPresentValue === undefined) ? 0 : boysPresentValue;
//     const girlsPresent = (girlsPresentValue === null || girlsPresentValue === undefined) ? 0 : girlsPresentValue;
//     const totalPresent = boysPresent + girlsPresent;

//     this.visitForm.patchValue({ totalPresent: totalPresent }, { emitEvent: false });

//     if (boysPresent > boysEnrolled) {
//         this.f['boysPresent'].setErrors({ max: true });
//     } else {
//         this.f['boysPresent'].setErrors(null);
//     }
//     if (girlsPresent > girlsEnrolled) {
//         this.f['girlsPresent'].setErrors({ max: true });
//     } else {
//         this.f['girlsPresent'].setErrors(null);
//     }
//      this.f['boysPresent'].updateValueAndValidity({ emitEvent: false });
//      this.f['girlsPresent'].updateValueAndValidity({ emitEvent: false });

//     let attPercentage = null;
//     let attPercentagePresent = null;
//     let attPercentageAbsent = null;

//     if (totalEnrolled > 0) {
//       attPercentage = parseFloat(((totalPresent / totalEnrolled) * 100).toFixed(2));
//       attPercentagePresent = attPercentage;
//       attPercentageAbsent = parseFloat((((totalEnrolled - totalPresent) / totalEnrolled) * 100).toFixed(2));
//     } else {
//         attPercentage = 0;
//         attPercentagePresent = 0;
//         attPercentageAbsent = 0;
//     }

//     this.visitForm.patchValue({
//       attendancePercentage: attPercentage,
//       attendancePercentagePresent: attPercentagePresent,
//       boysAbsent: Math.max(0, boysEnrolled - boysPresent),
//       girlsAbsent: Math.max(0, girlsEnrolled - girlsPresent),
//       totalAbsent: Math.max(0, totalEnrolled - totalPresent),
//       attendancePercentageAbsent: attPercentageAbsent
//     }, { emitEvent: false });
//   }


//   createImageSection(): FormGroup {
//     return this.fb.group({
//       capturedImageData: [null],
//       latitude: [null, [Validators.min(-90), Validators.max(90), Validators.pattern(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/)]],
//       longitude: [null, [Validators.min(-180), Validators.max(180), Validators.pattern(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/)]],
//       existingImageFilename: ['']
//     });
//   }

//   addImageSection(): void {
//     if (this.imageSections.length < 4) {
//       this.imageSections.push(this.createImageSection());
//     }
//   }

//   removeImageSection(index: number): void {
//     if (this.imageSections.length > 1) {
//       this.imageSections.removeAt(index);
//     } else if (this.imageSections.length === 1 && index === 0) {
//       this.imageSections.at(0).reset({
//         capturedImageData: null,
//         latitude: null,
//         longitude: null,
//         existingImageFilename: ''
//       });
//     }
//   }

//   // --- Camera Logic ---
//   async openCameraModal(index: number): Promise<void> {
//     this.currentCameraImageIndex = index;
//     this.cameraError = null;
//     this.cdr.detectChanges(); // Update UI for initial state

//     if (!this.cameraModalInstance) {
//         console.error('Camera modal is not initialized.');
//         this.cameraError = 'कॅमेरा इंटरफेस लोड होऊ शकला नाही.';
//         try { this.cameraModalInstance?.show(); } catch(e) { /* ignore if show fails */ }
//         this.cdr.detectChanges();
//         return;
//     }
//     this.cameraModalInstance.show();

//     if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//       this.cameraError = 'तुमच्या ब्राउझरमध्ये कॅमेरा समर्थित नाही.';
//       this.cdr.detectChanges();
//       return;
//     }

//     try {
//       this.stopCameraStream(); // Ensure any previous stream is fully stopped

//       // For performance measurement (optional, use in dev tools)
//       // console.time("getUserMedia");
//       this.mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           facingMode: 'environment',
//           // width: { ideal: 1280 }, // Optional: Request specific resolutions
//           // height: { ideal: 720 }
//         },
//         audio: false
//       });
//       // console.timeEnd("getUserMedia");

//       if (this.videoPlayer && this.videoPlayer.nativeElement && this.mediaStream) {
//         this.videoPlayer.nativeElement.srcObject = this.mediaStream;
//         // console.time("videoPlay");
//         await this.videoPlayer.nativeElement.play();
//         // console.timeEnd("videoPlay");
//         if (this.videoPlayer.nativeElement.paused) {
//             console.warn("Video stream started but is paused. Attempting to play again.");
//             // Some browsers might require another play() call after a user interaction or short delay
//             // This is less common with `await play()` but can be a fallback.
//         }
//       } else {
//          this.cameraError = 'व्हिडिओ प्लेयर किंवा स्ट्रीम उपलब्ध नाही.';
//          if (!this.mediaStream) { this.stopCameraStream(); }
//       }
//     } catch (err: any) {
//       // console.timeEnd("getUserMedia"); // End timer in case of error
//       console.error("Error accessing camera: ", err.name, err.message);
//       if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
//         this.cameraError = "कॅमेरा वापरण्याची परवानगी नाकारली आहे.";
//       } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
//         this.cameraError = "कोणताही कॅमेरा आढळला नाही.";
//       } else if (err.name === "NotReadableError" || err.name === "TrackStartError" || err.name === "OverconstrainedError") {
//         this.cameraError = "कॅमेरा आधीच वापरात आहे, सुरू होऊ शकत नाही किंवा विनंती केलेले तपशील समर्थित नाहीत.";
//       } else {
//         this.cameraError = `कॅमेरा सुरू करताना त्रुटी आली: ${err.name}`;
//       }
//       this.stopCameraStream();
//     }
//     this.cdr.detectChanges(); // Ensure UI updates with stream or error
//   }

//   capturePhoto(): void {
//     if (this.currentCameraImageIndex === null || !this.isCameraStreamActive() || !this.videoPlayer?.nativeElement || !this.canvasElement?.nativeElement) {
//       console.error('Cannot capture photo: stream not active or elements missing.');
//       this.cameraError = 'फोटो काढण्यासाठी कॅमेरा सक्रिय नाही.';
//       this.cdr.detectChanges();
//       return;
//     }
//     const video = this.videoPlayer.nativeElement;
//     const canvas = this.canvasElement.nativeElement;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const context = canvas.getContext('2d');
//     if (context) {
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
//       const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);

//       this.imageSections.at(this.currentCameraImageIndex!).patchValue({
//         capturedImageData: imageDataUrl,
//         existingImageFilename: `captured_${Date.now()}.jpg`
//       });
//       this.fetchGeolocationForImage(this.currentCameraImageIndex!);
//     } else {
//         console.error("Could not get 2D context from canvas.");
//         this.cameraError = "फोटो तयार करताना त्रुटी आली.";
//     }
//     this.cdr.detectChanges();
//     this.closeCameraModal();
//   }

//   closeCameraModal(): void {
//     // stopCameraStream is now called by 'hidden.bs.modal' event or explicitly here if modal was never fully shown
//     if (this.cameraModalInstance) {
//       this.cameraModalInstance.hide();
//     } else { // If modal instance isn't available, still try to stop stream
//       this.stopCameraStream();
//     }
//     this.currentCameraImageIndex = null;
//     // cameraError is cleared by hidden.bs.modal listener
//     this.cdr.detectChanges();
//   }

//   stopCameraStream(): void {
//     if (this.mediaStream) {
//       this.mediaStream.getTracks().forEach(track => track.stop());
//       this.mediaStream = null;
//     }
//     if (this.videoPlayer && this.videoPlayer.nativeElement) {
//       this.videoPlayer.nativeElement.srcObject = null;
//       this.videoPlayer.nativeElement.pause();
//       // Consider removing .load() if it causes issues on re-open; usually for full reset
//       // this.videoPlayer.nativeElement.load();
//     }
//     // Don't clear cameraError here, let hidden.bs.modal or openCameraModal handle it
//     // this.cameraError = null;
//     this.cdr.detectChanges(); // Reflect that stream is stopped
//   }

//   isCameraStreamActive(): boolean {
//     const videoElem = this.videoPlayer?.nativeElement;
//     return !!(
//       this.mediaStream &&
//       this.mediaStream.active &&
//       videoElem &&
//       videoElem.readyState >= 2 && // HAVE_CURRENT_DATA or more
//       !videoElem.paused
//     );
//   }
//   // --- End Camera Logic ---

//   onFileChange(event: Event, index: number): void {
//     const fileInput = event.target as HTMLInputElement;
//     if (fileInput.files && fileInput.files.length > 0) {
//       const file = fileInput.files[0];
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.imageSections.at(index).patchValue({
//           capturedImageData: e.target.result,
//           existingImageFilename: file.name
//         });
//         this.cdr.detectChanges(); // Update preview
//       };
//       reader.readAsDataURL(file);
//       this.fetchGeolocationForImage(index);
//       fileInput.value = '';
//     }
//   }

//   fetchGeolocationForImage(index: number): void {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             this.imageSections.at(index).patchValue({
//               latitude: parseFloat(position.coords.latitude.toFixed(6)),
//               longitude: parseFloat(position.coords.longitude.toFixed(6))
//             });
//             this.cdr.detectChanges();
//           },
//           (err) => {
//             console.warn(`GEO ERROR(${err.code}): ${err.message}`);
//             this.imageSections.at(index).patchValue({ latitude: null, longitude: null });
//             this.cdr.detectChanges();
//           },
//           { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
//         );
//       } else {
//         console.warn('Geolocation not supported by this browser.');
//         this.imageSections.at(index).patchValue({ latitude: null, longitude: null });
//         this.cdr.detectChanges();
//       }
//   }

//   getPreviewUrl(index: number): string | null {
//     const imageData = this.imageSections.at(index).get('capturedImageData')?.value;
//     if (imageData && typeof imageData === 'string' && imageData.startsWith('data:image')) {
//       return imageData;
//     }
//     return null;
//   }

//   private mapSchoolDataToSchoolVisitForm(data: SchoolData): SchoolVisitForm {
//     // ... (This function remains IDENTICAL to your previous version)
//     const payload: SchoolVisitForm = {
//       id: data.id,
//       schoolName: data.schoolName,
//       approvedTeachers: data.approvedTeachers ?? undefined,
//       workingTeachers: data.workingTeachers ?? undefined,
//       femaleCount: data.femaleCount ?? undefined,
//       maleCount: data.maleCount ?? undefined,
//       vacantTeachers: data.vacantTeachers ?? undefined,
//       presentteachers: data.presentteachers ?? undefined,
//       visitedClass: data.visitedClass,
//       grade: data.grade,
//       section: data.section,
//       boysCount: data.boysCount ?? undefined,
//       girlsCount: data.girlsCount ?? undefined,
//       totalCount: data.totalCount ?? undefined,
//       attendancePercentage: data.attendancePercentage !== null && data.attendancePercentage !== undefined ? String(data.attendancePercentage) : undefined,
//       boysPresent: data.boysPresent ?? undefined,
//       girlsPresent: data.girlsPresent ?? undefined,
//       totalPresent: data.totalPresent ?? undefined,
//       attendancePercentagePresent: data.attendancePercentagePresent !== null && data.attendancePercentagePresent !== undefined ? String(data.attendancePercentagePresent) : undefined,
//       boysAbsent: data.boysAbsent ?? undefined,
//       girlsAbsent: data.girlsAbsent ?? undefined,
//       totalAbsent: data.totalAbsent ?? undefined,
//       attendancePercentageAbsent: data.attendancePercentageAbsent !== null && data.attendancePercentageAbsent !== undefined ? String(data.attendancePercentageAbsent) : undefined,
//       readingFeedback: data.readingFeedback,
//       writingFeedback: data.writingFeedback,
//       mathFeedback: data.mathFeedback,
//       remark: data.remark,
//       facilities: data.facilities.reduce((acc, facilityName) => {
//         acc[facilityName] = 'true';
//         return acc;
//       }, {} as { [key: string]: string }),
//       capturedImageData1: undefined, latitude1: undefined, longitude1: undefined, existingImageFilename1: undefined,
//       capturedImageData2: undefined, latitude2: undefined, longitude2: undefined, existingImageFilename2: undefined,
//       capturedImageData3: undefined, latitude3: undefined, longitude3: undefined, existingImageFilename3: undefined,
//       capturedImageData4: undefined, latitude4: undefined, longitude4: undefined, existingImageFilename4: undefined,
//     };
//     data.imageSections.forEach((imgSec, idx) => {
//       if (idx < 4) {
//         const keySuffix = idx + 1;
//         if (typeof imgSec.capturedImageData === 'string' && imgSec.capturedImageData.startsWith('data:image')) {
//             (payload as any)[`capturedImageData${keySuffix}`] = imgSec.capturedImageData;
//         } else {
//             (payload as any)[`capturedImageData${keySuffix}`] = undefined;
//         }
//         (payload as any)[`latitude${keySuffix}`] = imgSec.latitude ?? undefined;
//         (payload as any)[`longitude${keySuffix}`] = imgSec.longitude ?? undefined;
//         (payload as any)[`existingImageFilename${keySuffix}`] = (!(payload as any)[`capturedImageData${keySuffix}`] && imgSec.existingImageFilename) ? imgSec.existingImageFilename : undefined;
//       }
//     });
//     return payload;
//   }

//   private mapSchoolVisitFormToSchoolData(visitFormFromServer: SchoolVisitForm): SchoolData {
//     // ... (This function remains IDENTICAL to your previous version)
//     const facilitiesArray: string[] = [];
//     if (visitFormFromServer.facilities) {
//         for (const key in visitFormFromServer.facilities) {
//             if (visitFormFromServer.facilities.hasOwnProperty(key) && visitFormFromServer.facilities[key] === 'true') {
//                 facilitiesArray.push(key);
//             }
//         }
//     }
//     const schoolData: SchoolData = {
//       id: visitFormFromServer.id,
//       schoolName: visitFormFromServer.schoolName || '',
//       approvedTeachers: visitFormFromServer.approvedTeachers ?? null,
//       workingTeachers: visitFormFromServer.workingTeachers ?? null,
//       femaleCount: visitFormFromServer.femaleCount ?? null,
//       maleCount: visitFormFromServer.maleCount ?? null,
//       vacantTeachers: visitFormFromServer.vacantTeachers ?? null,
//       presentteachers: visitFormFromServer.presentteachers ?? null,
//       visitedClass: visitFormFromServer.visitedClass || '',
//       grade: visitFormFromServer.grade || '',
//       section: visitFormFromServer.section || '',
//       boysCount: visitFormFromServer.boysCount ?? null,
//       girlsCount: visitFormFromServer.girlsCount ?? null,
//       totalCount: visitFormFromServer.totalCount ?? null,
//       attendancePercentage: visitFormFromServer.attendancePercentage ? parseFloat(visitFormFromServer.attendancePercentage) : null,
//       boysPresent: visitFormFromServer.boysPresent ?? null,
//       girlsPresent: visitFormFromServer.girlsPresent ?? null,
//       totalPresent: visitFormFromServer.totalPresent ?? null,
//       attendancePercentagePresent: visitFormFromServer.attendancePercentagePresent ? parseFloat(visitFormFromServer.attendancePercentagePresent) : null,
//       boysAbsent: visitFormFromServer.boysAbsent ?? null,
//       girlsAbsent: visitFormFromServer.girlsAbsent ?? null,
//       totalAbsent: visitFormFromServer.totalAbsent ?? null,
//       attendancePercentageAbsent: visitFormFromServer.attendancePercentageAbsent ? parseFloat(visitFormFromServer.attendancePercentageAbsent) : null,
//       facilities: facilitiesArray,
//       readingFeedback: visitFormFromServer.readingFeedback || '',
//       writingFeedback: visitFormFromServer.writingFeedback || '',
//       mathFeedback: visitFormFromServer.mathFeedback || '',
//       remark: visitFormFromServer.remark || '',
//       imageSections: []
//     };
//     for (let i = 1; i <= 4; i++) {
//       const imageData = visitFormFromServer[`capturedImageData${i}` as keyof SchoolVisitForm] as string | undefined;
//       const latitude = visitFormFromServer[`latitude${i}` as keyof SchoolVisitForm] as number | undefined;
//       const longitude = visitFormFromServer[`longitude${i}` as keyof SchoolVisitForm] as number | undefined;
//       const existingFilename = visitFormFromServer[`existingImageFilename${i}` as keyof SchoolVisitForm] as string | undefined;
//       if (imageData || existingFilename || (latitude !== undefined && longitude !== undefined)) {
//         schoolData.imageSections.push({
//           capturedImageData: imageData || null,
//           latitude: latitude ?? null,
//           longitude: longitude ?? null,
//           existingImageFilename: existingFilename || (imageData ? `server_image_${i}.jpg` : null)
//         });
//       }
//     }
//     return schoolData;
//   }

//   loadVisitsFromServer(): void {
//     this.isLoading = true;
//     this.schoolVisitService.getAllVisits()
//       .pipe(finalize(() => {
//             this.isLoading = false;
//             this.cdr.detectChanges();
//         }))
//       .subscribe({
//         next: (visits) => {
//           this.submittedData = visits.map(visit => this.mapSchoolVisitFormToSchoolData(visit));
//           console.log('Visits loaded from server:', this.submittedData.length);
//           this.cdr.detectChanges();
//         },
//         error: (err) => {
//             console.error('Error loading visits:', err);
//         }
//       });
//   }

//   onSubmit(): void {
//     if (this.visitForm.invalid) {
//       this.visitForm.markAllAsTouched();
//       console.error("Form is invalid. Please check the fields.");
//       this.logFormErrors();
//       return;
//     }

//     this.isLoading = true;
//     this.cdr.detectChanges();
//     const formRawValue = this.visitForm.getRawValue();

//     const currentSchoolData: SchoolData = {
//         // ... (mapping remains IDENTICAL to your previous version) ...
//       id: (this.isEditing && this.editingIndex !== null && this.submittedData[this.editingIndex]) ? this.submittedData[this.editingIndex].id : undefined,
//       schoolName: formRawValue.schoolName,
//       approvedTeachers: formRawValue.approvedTeachers,
//       workingTeachers: formRawValue.workingTeachers,
//       femaleCount: formRawValue.femaleCount,
//       maleCount: formRawValue.maleCount,
//       vacantTeachers: formRawValue.vacantTeachers,
//       presentteachers: formRawValue.presentteachers,
//       visitedClass: formRawValue.visitedClass,
//       grade: formRawValue.grade,
//       section: formRawValue.section,
//       boysCount: formRawValue.boysCount,
//       girlsCount: formRawValue.girlsCount,
//       totalCount: formRawValue.totalCount,
//       attendancePercentage: formRawValue.attendancePercentage,
//       boysPresent: formRawValue.boysPresent,
//       girlsPresent: formRawValue.girlsPresent,
//       totalPresent: formRawValue.totalPresent,
//       attendancePercentagePresent: formRawValue.attendancePercentagePresent,
//       boysAbsent: formRawValue.boysAbsent,
//       girlsAbsent: formRawValue.girlsAbsent,
//       totalAbsent: formRawValue.totalAbsent,
//       attendancePercentageAbsent: formRawValue.attendancePercentageAbsent,
//       facilities: formRawValue.facilities
//         .map((checked: boolean, i: number) => checked ? this.availableFacilities[i] : null)
//         .filter((value: string | null): value is string => value !== null),
//       readingFeedback: formRawValue.readingFeedback,
//       writingFeedback: formRawValue.writingFeedback,
//       mathFeedback: formRawValue.mathFeedback,
//       remark: formRawValue.remark,
//       imageSections: formRawValue.imageSections.map((imgSec: any) => ({
//         capturedImageData: imgSec.capturedImageData,
//         latitude: imgSec.latitude,
//         longitude: imgSec.longitude,
//         existingImageFilename: imgSec.existingImageFilename
//       }))
//     };

//     const apiPayload = this.mapSchoolDataToSchoolVisitForm(currentSchoolData);

//     const operation = (this.isEditing && currentSchoolData.id)
//       ? this.schoolVisitService.updateVisit(currentSchoolData.id, apiPayload)
//       : this.schoolVisitService.createVisit(apiPayload);

//     operation.pipe(finalize(() => {
//         this.isLoading = false;
//         this.cdr.detectChanges();
//     })).subscribe({
//       next: (savedVisit) => {
//         const savedData = this.mapSchoolVisitFormToSchoolData(savedVisit);
//         if (this.isEditing && this.editingIndex !== null) {
//           this.submittedData[this.editingIndex] = savedData;
//           console.log('Data Updated on server:', savedData);
//         } else {
//           this.submittedData.push(savedData);
//           console.log('Data Submitted to server:', savedData);
//         }
//         this.onReset(); // This will also trigger cdr.detectChanges()
//       },
//       error: (err) => {
//         console.error(this.isEditing ? 'Error updating visit:' : 'Error creating visit:', err);
//       }
//     });
//   }

//   onReset(): void {
//     const schoolNameValue = (this.isEditing && this.f['schoolName']) ? this.f['schoolName'].value : '';
//     this.visitForm.reset();

//     this.imageSections.clear();
//     this.addImageSection();

//     (this.visitForm.get('facilities') as FormArray).controls.forEach(control => control.setValue(false));

//     this.visitForm.patchValue({
//       schoolName: schoolNameValue,
//       vacantTeachers: null, totalCount: null, attendancePercentage: null,
//       totalPresent: null, attendancePercentagePresent: null, boysAbsent: null,
//       girlsAbsent: null, totalAbsent: null, attendancePercentageAbsent: null
//     });

//     this.isEditing = false;
//     this.editingIndex = null;
//     this.isLoading = false;
//     this.cdr.detectChanges();
//   }

//   editData(itemToEdit: SchoolData, index: number): void {
//     // ... (This function remains largely IDENTICAL to your previous version, ensure cdr.detectChanges at the end)
//     this.isEditing = true;
//     this.editingIndex = index;
//     window.scrollTo({ top: 0, behavior: 'smooth' });

//     this.visitForm.patchValue({
//       schoolName: itemToEdit.schoolName,
//       approvedTeachers: itemToEdit.approvedTeachers,
//       workingTeachers: itemToEdit.workingTeachers,
//       femaleCount: itemToEdit.femaleCount,
//       maleCount: itemToEdit.maleCount,
//       presentteachers: itemToEdit.presentteachers,
//       visitedClass: itemToEdit.visitedClass,
//       grade: itemToEdit.grade,
//       section: itemToEdit.section,
//       boysCount: itemToEdit.boysCount,
//       girlsCount: itemToEdit.girlsCount,
//       boysPresent: itemToEdit.boysPresent,
//       girlsPresent: itemToEdit.girlsPresent,
//       readingFeedback: itemToEdit.readingFeedback,
//       writingFeedback: itemToEdit.writingFeedback,
//       mathFeedback: itemToEdit.mathFeedback,
//       remark: itemToEdit.remark,
//     });

//     const facilityValues = this.availableFacilities.map(facility =>
//       itemToEdit.facilities.includes(facility)
//     );
//     (this.visitForm.get('facilities') as FormArray).setValue(facilityValues);

//     this.imageSections.clear();
//     if (itemToEdit.imageSections && itemToEdit.imageSections.length > 0) {
//       itemToEdit.imageSections.forEach(imgSecData => {
//         this.imageSections.push(this.fb.group({
//             capturedImageData: imgSecData.capturedImageData,
//             latitude: imgSecData.latitude,
//             longitude: imgSecData.longitude,
//             existingImageFilename: imgSecData.existingImageFilename
//         }));
//       });
//     }
//     if (this.imageSections.length === 0) {
//         this.addImageSection();
//     }

//     this.calculateVacantTeachers();
//     this.calculateTotalStudents();
//     this.calculateAttendanceAndAbsentees();
//     this.cdr.detectChanges();
//   }

//   deleteData(itemToDelete: SchoolData, index: number): void {
//     // ... (This function remains largely IDENTICAL to your previous version, ensure cdr.detectChanges on list change)
//     if (confirm('तुम्ही हा रेकॉर्ड डिलीट करू इच्छिता?')) {
//       if (!itemToDelete.id) {
//         console.warn("Cannot delete item without an ID. Removing locally.");
//         this.submittedData.splice(index, 1);
//         if (this.editingIndex === index) this.onReset();
//         else if (this.editingIndex !== null && this.editingIndex > index) this.editingIndex--;
//         this.cdr.detectChanges();
//         return;
//       }

//       this.isLoading = true;
//       this.cdr.detectChanges();
//       this.schoolVisitService.deleteVisit(itemToDelete.id)
//         .pipe(finalize(() => {
//             this.isLoading = false;
//             this.cdr.detectChanges();
//         }))
//         .subscribe({
//           next: () => {
//             this.submittedData.splice(index, 1);
//             console.log('Data deleted from server, ID:', itemToDelete.id);
//             if (this.editingIndex === index) {
//               this.onReset();
//             } else if (this.editingIndex !== null && this.editingIndex > index) {
//               this.editingIndex--;
//             }
//             this.cdr.detectChanges();
//           },
//           error: (err) => {
//             console.error('Error deleting visit:', err);
//           }
//         });
//     }
//   }

//   private logFormErrors(): void {
//     // ... (This function remains IDENTICAL to your previous version)
//     console.log("Logging form errors:");
//     Object.keys(this.visitForm.controls).forEach(key => {
//       const controlErrors = this.visitForm.get(key)?.errors;
//       if (controlErrors) {
//         console.warn(`Control: ${key}, Errors: ${JSON.stringify(controlErrors)}, Value: ${JSON.stringify(this.visitForm.get(key)?.value)}`);
//       }
//       if (this.visitForm.get(key) instanceof FormArray) {
//         (this.visitForm.get(key) as FormArray).controls.forEach((group, i) => {
//           if (group instanceof FormGroup) {
//             Object.keys(group.controls).forEach(itemKey => {
//               const itemControlErrors = group.get(itemKey)?.errors;
//               if (itemControlErrors) {
//                 console.warn(`  FormArray ${key}, Index ${i}, Control: ${itemKey}, Errors: ${JSON.stringify(itemControlErrors)}, Value: ${JSON.stringify(group.get(itemKey)?.value)}`);
//               }
//             });
//           }
//         });
//       }
//     });
//   }
// }

// src/app/school-visit-form/school-visit-form.component.ts
// FINAL CORRECTED CODE

import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { SchoolVisitForm, SchoolVisitService } from '../schoolvisit.service';
import { Router, ActivatedRoute } from '@angular/router'; // <-- ADDED: Router and ActivatedRoute for navigation

// Declare bootstrap for type safety with Bootstrap's JS modal
declare var bootstrap: any;

// Interfaces for strong typing (NO CHANGES HERE)
export interface SchoolData {
  id?: number;
  schoolName: string;
  approvedTeachers: number | null;
  workingTeachers: number | null;
  femaleCount: number | null;
  maleCount: number | null;
  vacantTeachers: number | null;
  presentteachers: number | null;
  visitedClass: string;
  grade: string;
  section: string;
  boysCount: number | null;
  girlsCount: number | null;
  totalCount: number | null;
  attendancePercentage: number | null;
  boysPresent: number | null;
  girlsPresent: number | null;
  totalPresent: number | null;
  attendancePercentagePresent: number | null;
  boysAbsent: number | null;
  girlsAbsent: number | null;
  totalAbsent: number | null;
  attendancePercentageAbsent: number | null;
  facilities: string[];
  readingFeedback: string;
  writingFeedback: string;
  mathFeedback: string;
  remark: string;
  imageSections: ImageSectionData[];
}

export interface ImageSectionData {
  capturedImageData: string | ArrayBuffer | null;
  latitude: number | null;
  longitude: number | null;
  existingImageFilename: string | null;
}

@Component({
  selector: 'app-school-visit-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './school-visit-form.component.html',
  styleUrls: ['./school-visit-form.component.scss']
})
export class SchoolVisitFormComponent implements OnInit, AfterViewInit, OnDestroy {
  visitForm!: FormGroup;
  submittedData: SchoolData[] = [];
  editingIndex: number | null = null;
  isEditing: boolean = false;
  isLoading: boolean = false;
  
  // =================== ADDED PROPERTIES ===================
  private schoolId: number | null = null;
  private returnQueryParams: { taluka: string, schoolName: string } = { taluka: 'सर्व तालुके', schoolName: 'सर्व शाळा' };
  // ======================================================

  availableFacilities: string[] = [
    'पिण्याच्या पाण्याची सोय (Drinking Water)', 'मुलांसाठी स्वच्छतागृह (Boys Toilet)',
    'मुलींसाठी स्वच्छतागृह (Girls Toilet)', 'खेळाचे मैदान (Playground)',
    'ग्रंथालय (Library)', 'विज्ञान प्रयोगशाळा (Science Lab)',
    'संगणक कक्ष (Computer Lab)', 'इंटरनेट कनेक्टिव्हिटी (Internet)',
    'वीज (Electricity)', 'सीमा भिंत (Boundary Wall)', 'रॅम्प (Ramp for CWSN)'
  ];

  // Camera related properties (NO CHANGES HERE)
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  cameraModalElement: HTMLElement | null = null;
  cameraModalInstance: any;
  currentCameraImageIndex: number | null = null;
  mediaStream: MediaStream | null = null;
  cameraError: string | null = null;

  get f() { return this.visitForm.controls; }
  get imageSections() { return this.visitForm.get('imageSections') as FormArray; }
  get facilities() { return this.visitForm.get('facilities') as FormArray; }

  constructor(
    private fb: FormBuilder,
    private schoolVisitService: SchoolVisitService,
    private cdr: ChangeDetectorRef,
    // =================== INJECT ROUTER AND ACTIVATEDROUTE ===================
    private router: Router,
    private route: ActivatedRoute
    // ========================================================================
  ) {}

  ngOnInit(): void {
    // =================== CAPTURE ROUTE INFO ===================
    // Capture the School ID from the URL path like `/school-visit-form/123`
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    if (idFromRoute) {
      this.schoolId = +idFromRoute;
    }

    // Capture the filter parameters from the URL so we can navigate back to the same view
    this.route.queryParamMap.subscribe(params => {
      this.returnQueryParams = {
        taluka: params.get('taluka') || 'सर्व तालुके',
        schoolName: params.get('schoolName') || 'सर्व शाळा',
      };
    });
    // ============================================================

    this.initializeForm();
    this.loadVisitsFromServer();
  }

  // No changes to ngAfterViewInit, ngOnDestroy, initializeForm, setupValueChangeListeners,
  // or any of the calculation, image, or camera methods.

  // --- (All other methods like ngAfterViewInit, calculateVacantTeachers, camera logic, etc., remain unchanged) ---
  
  // OMITTING UNCHANGED METHODS FOR BREVITY...
  ngAfterViewInit() {
    this.cameraModalElement = document.getElementById('cameraModal');
    if (this.cameraModalElement) {
      this.cameraModalInstance = new bootstrap.Modal(this.cameraModalElement, {
        backdrop: 'static',
        keyboard: false
      });
      this.cameraModalElement.addEventListener('hidden.bs.modal', () => {
        this.stopCameraStream();
        this.cameraError = null;
        this.cdr.detectChanges();
      });
       this.cameraModalElement.addEventListener('shown.bs.modal', () => {
        this.cdr.detectChanges();
      });
    }
  }

  ngOnDestroy(): void {
    this.stopCameraStream();
    if (this.cameraModalInstance) {
      this.cameraModalInstance.dispose();
    }
  }

  private initializeForm(): void {
    this.visitForm = this.fb.group({
      schoolName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]],
      approvedTeachers: [null, [Validators.required, Validators.min(0), Validators.max(500)]],
      workingTeachers: [null, [Validators.required, Validators.min(0), Validators.max(500)]],
      femaleCount: [null, [Validators.required, Validators.min(0), Validators.max(500)]],
      maleCount: [null, [Validators.required, Validators.min(0), Validators.max(500)]],
      vacantTeachers: [{ value: null, disabled: true }, [Validators.min(0)]],
      presentteachers: [null, [Validators.required, Validators.min(0), Validators.max(500)]],
      visitedClass: ['', [Validators.required, Validators.maxLength(50)]],
      grade: ['', [Validators.required, Validators.maxLength(20)]],
      section: ['', [Validators.maxLength(10)]],
      boysCount: [null, [Validators.required, Validators.min(0), Validators.max(1000)]],
      girlsCount: [null, [Validators.required, Validators.min(0), Validators.max(1000)]],
      totalCount: [{ value: null, disabled: true }, [Validators.min(0)]],
      attendancePercentage: [{ value: null, disabled: true }, [Validators.min(0), Validators.max(100)]],
      boysPresent: [null, [Validators.required, Validators.min(0), Validators.max(1000)]],
      girlsPresent: [null, [Validators.required, Validators.min(0), Validators.max(1000)]],
      totalPresent: [{ value: null, disabled: true }, [Validators.min(0)]],
      attendancePercentagePresent: [{ value: null, disabled: true }, [Validators.min(0), Validators.max(100)]],
      boysAbsent: [{ value: null, disabled: true }, [Validators.min(0)]],
      girlsAbsent: [{ value: null, disabled: true }, [Validators.min(0)]],
      totalAbsent: [{ value: null, disabled: true }, [Validators.min(0)]],
      attendancePercentageAbsent: [{ value: null, disabled: true }, [Validators.min(0), Validators.max(100)]],
      facilities: this.fb.array(
        this.availableFacilities.map(() => this.fb.control(false)),
      ),
      readingFeedback: ['', [Validators.required, Validators.maxLength(1000)]],
      writingFeedback: ['', [Validators.required, Validators.maxLength(1000)]],
      mathFeedback: ['', [Validators.required, Validators.maxLength(1000)]],
      remark: ['', Validators.maxLength(2000)],
      imageSections: this.fb.array([this.createImageSection()])
    });
    this.setupValueChangeListeners();
  }
  private setupValueChangeListeners(): void {
    const teacherFields = ['approvedTeachers', 'workingTeachers'];
    teacherFields.forEach(field => {
      this.visitForm.get(field)?.valueChanges.subscribe(() => this.calculateVacantTeachers());
    });

    const studentEnrollmentFields = ['boysCount', 'girlsCount'];
    studentEnrollmentFields.forEach(field => {
      this.visitForm.get(field)?.valueChanges.subscribe(() => {
        this.calculateTotalStudents();
        this.calculateAttendanceAndAbsentees();
      });
    });

    const studentPresentFields = ['boysPresent', 'girlsPresent'];
    studentPresentFields.forEach(field => {
      this.visitForm.get(field)?.valueChanges.subscribe(() => this.calculateAttendanceAndAbsentees());
    });
  }
  calculateVacantTeachers(): void {
    const approved = this.f['approvedTeachers'].value || 0;
    const working = this.f['workingTeachers'].value || 0;
    this.visitForm.patchValue({ vacantTeachers: Math.max(0, approved - working) }, { emitEvent: false });
  }
  calculateTotalStudents(): void {
    const boys = this.f['boysCount'].value || 0;
    const girls = this.f['girlsCount'].value || 0;
    this.visitForm.patchValue({ totalCount: boys + girls }, { emitEvent: false });
  }
  calculateAttendanceAndAbsentees(): void {
    const boysEnrolled = this.f['boysCount'].value || 0;
    const girlsEnrolled = this.f['girlsCount'].value || 0;
    const totalEnrolled = boysEnrolled + girlsEnrolled;

    const boysPresentValue = this.f['boysPresent'].value;
    const girlsPresentValue = this.f['girlsPresent'].value;

    const boysPresent = (boysPresentValue === null || boysPresentValue === undefined) ? 0 : boysPresentValue;
    const girlsPresent = (girlsPresentValue === null || girlsPresentValue === undefined) ? 0 : girlsPresentValue;
    const totalPresent = boysPresent + girlsPresent;

    this.visitForm.patchValue({ totalPresent: totalPresent }, { emitEvent: false });

    if (boysPresent > boysEnrolled) {
        this.f['boysPresent'].setErrors({ max: true });
    } else {
        this.f['boysPresent'].setErrors(null);
    }
    if (girlsPresent > girlsEnrolled) {
        this.f['girlsPresent'].setErrors({ max: true });
    } else {
        this.f['girlsPresent'].setErrors(null);
    }
     this.f['boysPresent'].updateValueAndValidity({ emitEvent: false });
     this.f['girlsPresent'].updateValueAndValidity({ emitEvent: false });

    let attPercentage = null;
    let attPercentagePresent = null;
    let attPercentageAbsent = null;

    if (totalEnrolled > 0) {
      attPercentage = parseFloat(((totalPresent / totalEnrolled) * 100).toFixed(2));
      attPercentagePresent = attPercentage;
      attPercentageAbsent = parseFloat((((totalEnrolled - totalPresent) / totalEnrolled) * 100).toFixed(2));
    } else {
        attPercentage = 0;
        attPercentagePresent = 0;
        attPercentageAbsent = 0;
    }

    this.visitForm.patchValue({
      attendancePercentage: attPercentage,
      attendancePercentagePresent: attPercentagePresent,
      boysAbsent: Math.max(0, boysEnrolled - boysPresent),
      girlsAbsent: Math.max(0, girlsEnrolled - girlsPresent),
      totalAbsent: Math.max(0, totalEnrolled - totalPresent),
      attendancePercentageAbsent: attPercentageAbsent
    }, { emitEvent: false });
  }
  createImageSection(): FormGroup {
    return this.fb.group({
      capturedImageData: [null],
      latitude: [null, [Validators.min(-90), Validators.max(90), Validators.pattern(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/)]],
      longitude: [null, [Validators.min(-180), Validators.max(180), Validators.pattern(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/)]],
      existingImageFilename: ['']
    });
  }
  addImageSection(): void {
    if (this.imageSections.length < 4) {
      this.imageSections.push(this.createImageSection());
    }
  }
  removeImageSection(index: number): void {
    if (this.imageSections.length > 1) {
      this.imageSections.removeAt(index);
    } else if (this.imageSections.length === 1 && index === 0) {
      this.imageSections.at(0).reset({
        capturedImageData: null,
        latitude: null,
        longitude: null,
        existingImageFilename: ''
      });
    }
  }
  async openCameraModal(index: number): Promise<void> {
    this.currentCameraImageIndex = index;
    this.cameraError = null;
    this.cdr.detectChanges(); 
    if (!this.cameraModalInstance) {
        console.error('Camera modal is not initialized.');
        this.cameraError = 'कॅमेरा इंटरफेस लोड होऊ शकला नाही.';
        try { this.cameraModalInstance?.show(); } catch(e) { /* ignore if show fails */ }
        this.cdr.detectChanges();
        return;
    }
    this.cameraModalInstance.show();
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.cameraError = 'तुमच्या ब्राउझरमध्ये कॅमेरा समर्थित नाही.';
      this.cdr.detectChanges();
      return;
    }
    try {
      this.stopCameraStream(); 
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      if (this.videoPlayer && this.videoPlayer.nativeElement && this.mediaStream) {
        this.videoPlayer.nativeElement.srcObject = this.mediaStream;
        await this.videoPlayer.nativeElement.play();
        if (this.videoPlayer.nativeElement.paused) {
            console.warn("Video stream started but is paused. Attempting to play again.");
        }
      } else {
         this.cameraError = 'व्हिडिओ प्लेयर किंवा स्ट्रीम उपलब्ध नाही.';
         if (!this.mediaStream) { this.stopCameraStream(); }
      }
    } catch (err: any) {
      console.error("Error accessing camera: ", err.name, err.message);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        this.cameraError = "कॅमेरा वापरण्याची परवानगी नाकारली आहे.";
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        this.cameraError = "कोणताही कॅमेरा आढळला नाही.";
      } else if (err.name === "NotReadableError" || err.name === "TrackStartError" || err.name === "OverconstrainedError") {
        this.cameraError = "कॅमेरा आधीच वापरात आहे, सुरू होऊ शकत नाही किंवा विनंती केलेले तपशील समर्थित नाहीत.";
      } else {
        this.cameraError = `कॅमेरा सुरू करताना त्रुटी आली: ${err.name}`;
      }
      this.stopCameraStream();
    }
    this.cdr.detectChanges();
  }
  capturePhoto(): void {
    if (this.currentCameraImageIndex === null || !this.isCameraStreamActive() || !this.videoPlayer?.nativeElement || !this.canvasElement?.nativeElement) {
      console.error('Cannot capture photo: stream not active or elements missing.');
      this.cameraError = 'फोटो काढण्यासाठी कॅमेरा सक्रिय नाही.';
      this.cdr.detectChanges();
      return;
    }
    const video = this.videoPlayer.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      this.imageSections.at(this.currentCameraImageIndex!).patchValue({
        capturedImageData: imageDataUrl,
        existingImageFilename: `captured_${Date.now()}.jpg`
      });
      this.fetchGeolocationForImage(this.currentCameraImageIndex!);
    } else {
        console.error("Could not get 2D context from canvas.");
        this.cameraError = "फोटो तयार करताना त्रुटी आली.";
    }
    this.cdr.detectChanges();
    this.closeCameraModal();
  }
  closeCameraModal(): void {
    if (this.cameraModalInstance) {
      this.cameraModalInstance.hide();
    } else {
      this.stopCameraStream();
    }
    this.currentCameraImageIndex = null;
    this.cdr.detectChanges();
  }
  stopCameraStream(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.srcObject = null;
      this.videoPlayer.nativeElement.pause();
    }
    this.cdr.detectChanges();
  }
  isCameraStreamActive(): boolean {
    const videoElem = this.videoPlayer?.nativeElement;
    return !!(
      this.mediaStream &&
      this.mediaStream.active &&
      videoElem &&
      videoElem.readyState >= 2 &&
      !videoElem.paused
    );
  }
  onFileChange(event: Event, index: number): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSections.at(index).patchValue({
          capturedImageData: e.target.result,
          existingImageFilename: file.name
        });
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
      this.fetchGeolocationForImage(index);
      fileInput.value = '';
    }
  }
  fetchGeolocationForImage(index: number): void {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.imageSections.at(index).patchValue({
              latitude: parseFloat(position.coords.latitude.toFixed(6)),
              longitude: parseFloat(position.coords.longitude.toFixed(6))
            });
            this.cdr.detectChanges();
          },
          (err) => {
            console.warn(`GEO ERROR(${err.code}): ${err.message}`);
            this.imageSections.at(index).patchValue({ latitude: null, longitude: null });
            this.cdr.detectChanges();
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
      } else {
        console.warn('Geolocation not supported by this browser.');
        this.imageSections.at(index).patchValue({ latitude: null, longitude: null });
        this.cdr.detectChanges();
      }
  }
  getPreviewUrl(index: number): string | null {
    const imageData = this.imageSections.at(index).get('capturedImageData')?.value;
    if (imageData && typeof imageData === 'string' && imageData.startsWith('data:image')) {
      return imageData;
    }
    return null;
  }
  private mapSchoolDataToSchoolVisitForm(data: SchoolData): SchoolVisitForm {
    const payload: SchoolVisitForm = {
      id: data.id,
      schoolName: data.schoolName,
      approvedTeachers: data.approvedTeachers ?? undefined,
      workingTeachers: data.workingTeachers ?? undefined,
      femaleCount: data.femaleCount ?? undefined,
      maleCount: data.maleCount ?? undefined,
      vacantTeachers: data.vacantTeachers ?? undefined,
      presentteachers: data.presentteachers ?? undefined,
      visitedClass: data.visitedClass,
      grade: data.grade,
      section: data.section,
      boysCount: data.boysCount ?? undefined,
      girlsCount: data.girlsCount ?? undefined,
      totalCount: data.totalCount ?? undefined,
      attendancePercentage: data.attendancePercentage !== null && data.attendancePercentage !== undefined ? String(data.attendancePercentage) : undefined,
      boysPresent: data.boysPresent ?? undefined,
      girlsPresent: data.girlsPresent ?? undefined,
      totalPresent: data.totalPresent ?? undefined,
      attendancePercentagePresent: data.attendancePercentagePresent !== null && data.attendancePercentagePresent !== undefined ? String(data.attendancePercentagePresent) : undefined,
      boysAbsent: data.boysAbsent ?? undefined,
      girlsAbsent: data.girlsAbsent ?? undefined,
      totalAbsent: data.totalAbsent ?? undefined,
      attendancePercentageAbsent: data.attendancePercentageAbsent !== null && data.attendancePercentageAbsent !== undefined ? String(data.attendancePercentageAbsent) : undefined,
      readingFeedback: data.readingFeedback,
      writingFeedback: data.writingFeedback,
      mathFeedback: data.mathFeedback,
      remark: data.remark,
      facilities: data.facilities.reduce((acc, facilityName) => {
        acc[facilityName] = 'true';
        return acc;
      }, {} as { [key: string]: string }),
      capturedImageData1: undefined, latitude1: undefined, longitude1: undefined, existingImageFilename1: undefined,
      capturedImageData2: undefined, latitude2: undefined, longitude2: undefined, existingImageFilename2: undefined,
      capturedImageData3: undefined, latitude3: undefined, longitude3: undefined, existingImageFilename3: undefined,
      capturedImageData4: undefined, latitude4: undefined, longitude4: undefined, existingImageFilename4: undefined,
    };
    data.imageSections.forEach((imgSec, idx) => {
      if (idx < 4) {
        const keySuffix = idx + 1;
        if (typeof imgSec.capturedImageData === 'string' && imgSec.capturedImageData.startsWith('data:image')) {
            (payload as any)[`capturedImageData${keySuffix}`] = imgSec.capturedImageData;
        } else {
            (payload as any)[`capturedImageData${keySuffix}`] = undefined;
        }
        (payload as any)[`latitude${keySuffix}`] = imgSec.latitude ?? undefined;
        (payload as any)[`longitude${keySuffix}`] = imgSec.longitude ?? undefined;
        (payload as any)[`existingImageFilename${keySuffix}`] = (!(payload as any)[`capturedImageData${keySuffix}`] && imgSec.existingImageFilename) ? imgSec.existingImageFilename : undefined;
      }
    });
    return payload;
  }
  private mapSchoolVisitFormToSchoolData(visitFormFromServer: SchoolVisitForm): SchoolData {
    const facilitiesArray: string[] = [];
    if (visitFormFromServer.facilities) {
        for (const key in visitFormFromServer.facilities) {
            if (visitFormFromServer.facilities.hasOwnProperty(key) && visitFormFromServer.facilities[key] === 'true') {
                facilitiesArray.push(key);
            }
        }
    }
    const schoolData: SchoolData = {
      id: visitFormFromServer.id,
      schoolName: visitFormFromServer.schoolName || '',
      approvedTeachers: visitFormFromServer.approvedTeachers ?? null,
      workingTeachers: visitFormFromServer.workingTeachers ?? null,
      femaleCount: visitFormFromServer.femaleCount ?? null,
      maleCount: visitFormFromServer.maleCount ?? null,
      vacantTeachers: visitFormFromServer.vacantTeachers ?? null,
      presentteachers: visitFormFromServer.presentteachers ?? null,
      visitedClass: visitFormFromServer.visitedClass || '',
      grade: visitFormFromServer.grade || '',
      section: visitFormFromServer.section || '',
      boysCount: visitFormFromServer.boysCount ?? null,
      girlsCount: visitFormFromServer.girlsCount ?? null,
      totalCount: visitFormFromServer.totalCount ?? null,
      attendancePercentage: visitFormFromServer.attendancePercentage ? parseFloat(visitFormFromServer.attendancePercentage) : null,
      boysPresent: visitFormFromServer.boysPresent ?? null,
      girlsPresent: visitFormFromServer.girlsPresent ?? null,
      totalPresent: visitFormFromServer.totalPresent ?? null,
      attendancePercentagePresent: visitFormFromServer.attendancePercentagePresent ? parseFloat(visitFormFromServer.attendancePercentagePresent) : null,
      boysAbsent: visitFormFromServer.boysAbsent ?? null,
      girlsAbsent: visitFormFromServer.girlsAbsent ?? null,
      totalAbsent: visitFormFromServer.totalAbsent ?? null,
      attendancePercentageAbsent: visitFormFromServer.attendancePercentageAbsent ? parseFloat(visitFormFromServer.attendancePercentageAbsent) : null,
      facilities: facilitiesArray,
      readingFeedback: visitFormFromServer.readingFeedback || '',
      writingFeedback: visitFormFromServer.writingFeedback || '',
      mathFeedback: visitFormFromServer.mathFeedback || '',
      remark: visitFormFromServer.remark || '',
      imageSections: []
    };
    for (let i = 1; i <= 4; i++) {
      const imageData = visitFormFromServer[`capturedImageData${i}` as keyof SchoolVisitForm] as string | undefined;
      const latitude = visitFormFromServer[`latitude${i}` as keyof SchoolVisitForm] as number | undefined;
      const longitude = visitFormFromServer[`longitude${i}` as keyof SchoolVisitForm] as number | undefined;
      const existingFilename = visitFormFromServer[`existingImageFilename${i}` as keyof SchoolVisitForm] as string | undefined;
      if (imageData || existingFilename || (latitude !== undefined && longitude !== undefined)) {
        schoolData.imageSections.push({
          capturedImageData: imageData || null,
          latitude: latitude ?? null,
          longitude: longitude ?? null,
          existingImageFilename: existingFilename || (imageData ? `server_image_${i}.jpg` : null)
        });
      }
    }
    return schoolData;
  }
  loadVisitsFromServer(): void {
    this.isLoading = true;
    this.schoolVisitService.getAllVisits()
      .pipe(finalize(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
        }))
      .subscribe({
        next: (visits) => {
          this.submittedData = visits.map(visit => this.mapSchoolVisitFormToSchoolData(visit));
          console.log('Visits loaded from server:', this.submittedData.length);
          this.cdr.detectChanges();
        },
        error: (err) => {
            console.error('Error loading visits:', err);
        }
      });
  }

  onSubmit(): void {
    if (this.visitForm.invalid) {
      this.visitForm.markAllAsTouched();
      console.error("Form is invalid. Please check the fields.");
      this.logFormErrors();
      return;
    }

    this.isLoading = true;
    this.cdr.detectChanges();
    const formRawValue = this.visitForm.getRawValue();

    const currentSchoolData: SchoolData = {
      id: (this.isEditing && this.editingIndex !== null && this.submittedData[this.editingIndex]) ? this.submittedData[this.editingIndex].id : undefined,
      schoolName: formRawValue.schoolName,
      approvedTeachers: formRawValue.approvedTeachers,
      workingTeachers: formRawValue.workingTeachers,
      femaleCount: formRawValue.femaleCount,
      maleCount: formRawValue.maleCount,
      vacantTeachers: formRawValue.vacantTeachers,
      presentteachers: formRawValue.presentteachers,
      visitedClass: formRawValue.visitedClass,
      grade: formRawValue.grade,
      section: formRawValue.section,
      boysCount: formRawValue.boysCount,
      girlsCount: formRawValue.girlsCount,
      totalCount: formRawValue.totalCount,
      attendancePercentage: formRawValue.attendancePercentage,
      boysPresent: formRawValue.boysPresent,
      girlsPresent: formRawValue.girlsPresent,
      totalPresent: formRawValue.totalPresent,
      attendancePercentagePresent: formRawValue.attendancePercentagePresent,
      boysAbsent: formRawValue.boysAbsent,
      girlsAbsent: formRawValue.girlsAbsent,
      totalAbsent: formRawValue.totalAbsent,
      attendancePercentageAbsent: formRawValue.attendancePercentageAbsent,
      facilities: formRawValue.facilities
        .map((checked: boolean, i: number) => checked ? this.availableFacilities[i] : null)
        .filter((value: string | null): value is string => value !== null),
      readingFeedback: formRawValue.readingFeedback,
      writingFeedback: formRawValue.writingFeedback,
      mathFeedback: formRawValue.mathFeedback,
      remark: formRawValue.remark,
      imageSections: formRawValue.imageSections.map((imgSec: any) => ({
        capturedImageData: imgSec.capturedImageData,
        latitude: imgSec.latitude,
        longitude: imgSec.longitude,
        existingImageFilename: imgSec.existingImageFilename
      }))
    };

    const apiPayload = this.mapSchoolDataToSchoolVisitForm(currentSchoolData);
    
    // ====================== ASSOCIATE WITH SCHOOL ID ======================
    // Pass the schoolId to the backend so it knows which school's `isReportSubmitted`
    // flag to update. This assumes your backend API is set up to receive this.
    if (this.schoolId && !this.isEditing) {
      (apiPayload as any).schoolId = this.schoolId;
    }
    // ======================================================================

    const operation = (this.isEditing && currentSchoolData.id)
      ? this.schoolVisitService.updateVisit(currentSchoolData.id, apiPayload)
      : this.schoolVisitService.createVisit(apiPayload);

    operation.pipe(finalize(() => {
        this.isLoading = false;
        this.cdr.detectChanges();
    })).subscribe({
      next: (savedVisit) => {
        // ============================================================================
        // ============================ THE MAIN FIX ==================================
        // Instead of updating a local table, navigate back to the list page.
        // The query parameters will trigger the data refresh mechanism on that page.
        // ============================================================================
        alert('माहिती यशस्वीरित्या सबमिट केली आहे.');
        
        this.router.navigate(['/school-objective'], {
          queryParams: {
            ...this.returnQueryParams, // Pass back the original filters
            refresh: new Date().getTime() // A unique value to ensure the URL changes
          }
        });
      },
      error: (err) => {
        console.error(this.isEditing ? 'Error updating visit:' : 'Error creating visit:', err);
      }
    });
  }
  
  // No changes to onReset, editData, deleteData, or logFormErrors
  onReset(): void {
    const schoolNameValue = (this.isEditing && this.f['schoolName']) ? this.f['schoolName'].value : '';
    this.visitForm.reset();

    this.imageSections.clear();
    this.addImageSection();

    (this.visitForm.get('facilities') as FormArray).controls.forEach(control => control.setValue(false));

    this.visitForm.patchValue({
      schoolName: schoolNameValue,
      vacantTeachers: null, totalCount: null, attendancePercentage: null,
      totalPresent: null, attendancePercentagePresent: null, boysAbsent: null,
      girlsAbsent: null, totalAbsent: null, attendancePercentageAbsent: null
    });

    this.isEditing = false;
    this.editingIndex = null;
    this.isLoading = false;
    this.cdr.detectChanges();
  }
  editData(itemToEdit: SchoolData, index: number): void {
    this.isEditing = true;
    this.editingIndex = index;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.visitForm.patchValue({
      schoolName: itemToEdit.schoolName,
      approvedTeachers: itemToEdit.approvedTeachers,
      workingTeachers: itemToEdit.workingTeachers,
      femaleCount: itemToEdit.femaleCount,
      maleCount: itemToEdit.maleCount,
      presentteachers: itemToEdit.presentteachers,
      visitedClass: itemToEdit.visitedClass,
      grade: itemToEdit.grade,
      section: itemToEdit.section,
      boysCount: itemToEdit.boysCount,
      girlsCount: itemToEdit.girlsCount,
      boysPresent: itemToEdit.boysPresent,
      girlsPresent: itemToEdit.girlsPresent,
      readingFeedback: itemToEdit.readingFeedback,
      writingFeedback: itemToEdit.writingFeedback,
      mathFeedback: itemToEdit.mathFeedback,
      remark: itemToEdit.remark,
    });
    const facilityValues = this.availableFacilities.map(facility =>
      itemToEdit.facilities.includes(facility)
    );
    (this.visitForm.get('facilities') as FormArray).setValue(facilityValues);
    this.imageSections.clear();
    if (itemToEdit.imageSections && itemToEdit.imageSections.length > 0) {
      itemToEdit.imageSections.forEach(imgSecData => {
        this.imageSections.push(this.fb.group({
            capturedImageData: imgSecData.capturedImageData,
            latitude: imgSecData.latitude,
            longitude: imgSecData.longitude,
            existingImageFilename: imgSecData.existingImageFilename
        }));
      });
    }
    if (this.imageSections.length === 0) {
        this.addImageSection();
    }
    this.calculateVacantTeachers();
    this.calculateTotalStudents();
    this.calculateAttendanceAndAbsentees();
    this.cdr.detectChanges();
  }
  deleteData(itemToDelete: SchoolData, index: number): void {
    if (confirm('तुम्ही हा रेकॉर्ड डिलीट करू इच्छिता?')) {
      if (!itemToDelete.id) {
        console.warn("Cannot delete item without an ID. Removing locally.");
        this.submittedData.splice(index, 1);
        if (this.editingIndex === index) this.onReset();
        else if (this.editingIndex !== null && this.editingIndex > index) this.editingIndex--;
        this.cdr.detectChanges();
        return;
      }
      this.isLoading = true;
      this.cdr.detectChanges();
      this.schoolVisitService.deleteVisit(itemToDelete.id)
        .pipe(finalize(() => {
            this.isLoading = false;
            this.cdr.detectChanges();
        }))
        .subscribe({
          next: () => {
            this.submittedData.splice(index, 1);
            console.log('Data deleted from server, ID:', itemToDelete.id);
            if (this.editingIndex === index) {
              this.onReset();
            } else if (this.editingIndex !== null && this.editingIndex > index) {
              this.editingIndex--;
            }
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Error deleting visit:', err);
          }
        });
    }
  }
  private logFormErrors(): void {
    console.log("Logging form errors:");
    Object.keys(this.visitForm.controls).forEach(key => {
      const controlErrors = this.visitForm.get(key)?.errors;
      if (controlErrors) {
        console.warn(`Control: ${key}, Errors: ${JSON.stringify(controlErrors)}, Value: ${JSON.stringify(this.visitForm.get(key)?.value)}`);
      }
      if (this.visitForm.get(key) instanceof FormArray) {
        (this.visitForm.get(key) as FormArray).controls.forEach((group, i) => {
          if (group instanceof FormGroup) {
            Object.keys(group.controls).forEach(itemKey => {
              const itemControlErrors = group.get(itemKey)?.errors;
              if (itemControlErrors) {
                console.warn(`  FormArray ${key}, Index ${i}, Control: ${itemKey}, Errors: ${JSON.stringify(itemControlErrors)}, Value: ${JSON.stringify(group.get(itemKey)?.value)}`);
              }
            });
          }
        });
      }
    });
  }
}