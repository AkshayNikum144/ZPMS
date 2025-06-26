import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router for navigation
import { HospitalService, Hospital } from '../hospital.service';

@Component({
  selector: 'app-hospital-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './hospital-form.component.html',
  styleUrls: ['./hospital-form.component.scss']
})
export class HospitalFormComponent implements OnInit {
  hospitalForm!: FormGroup;
  submitted = false;
  isEditMode = false;
  editingHospitalId: number | null = null;
  currentFormTitle = ''; // Dynamic form title

  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  marathiMonths: string[] = [
    'जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून',
    'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'
  ];

  labels = {
    formTitleCreate: 'हॉस्पिटल डेटा एंट्री फॉर्म',
    formTitleEdit: 'हॉस्पिटल डेटा संपादित करा',
    phcName: 'PHC नाव',
    subcenterName: 'उप-केंद्र नाव',
    villagePhcId: 'गाव PHC आयडी',
    monthName: 'महिन्याचे नाव',
    basicInfoSectionTitle: 'मूलभूत माहिती',

    cataractSectionTitle: 'मोतीबिंदू डेटा',
    cataractSuspectedTotal: 'मोतीबिंदू संशयित एकूण',
    cataractScreenedTotal: 'मोतीबिंदू तपासलेले एकूण',
    cataractMatureCases: 'मोतीबिंदू प्रौढ प्रकरणे',
    cataractImmatureCases: 'मोतीबिंदू अपरिपक्व प्रकरणे',
    cataractSurgeryDone: 'मोतीबिंदू शस्त्रक्रिया झाली',
    cataractFollowupTotal: 'मोतीबिंदू पाठपुरावा एकूण',

    htnSectionTitle: 'उच्च रक्तदाब (HTN) डेटा',
    htnSuspectedTotal: 'HTN संशयित एकूण',
    htnReferredTotal: 'HTN संदर्भित एकूण',
    htnOnTreatmentTotal: 'HTN उपचाराधीन एकूण',
    htnOnCounselingNotOnTreatment: 'HTN समुपदेशनावर, उपचारावर नाही',
    htnTreatmentAndFollowup: 'HTN उपचार आणि पाठपुरावा',

    dmSectionTitle: 'मधुमेह (DM) डेटा',
    dmSuspectedTotal: 'DM संशयित एकूण',
    dmReferredTotal: 'DM संदर्भित एकूण',
    dmOnTreatmentTotal: 'DM उपचाराधीन एकूण',
    dmOnCounselingNotOnTreatment: 'DM समुपदेशनावर, उपचारावर नाही',
    dmTreatmentFollowup: 'DM उपचार पाठपुरावा',

    tbSectionTitle: 'क्षयरोग (TB) डेटा',
    tbSuspectedTotal: 'TB संशयित एकूण',
    tbReferredForXrayTotal: 'TB एक्स-रे साठी संदर्भित एकूण',
    tbSputumCollectedTotal: 'TB थुंकी गोळा केलेली एकूण',
    tbDiagnosedTotal: 'TB निदान झालेले एकूण',
    tbOnTreatmentTotal: 'TB उपचाराधीन एकूण',

    leprosySectionTitle: 'कुष्ठरोग डेटा',
    leprosySuspectedTotal: 'कुष्ठरोग संशयित एकूण',
    leprosyReferredTotal: 'कुष्ठरोग संदर्भित एकूण',
    leprosyDiagnosedTotal: 'कुष्ठरोग निदान झालेले एकूण',
    leprosyOnTreatmentTotal: 'कुष्ठरोग उपचाराधीन एकूण',
    leprosyReconstructiveSurgeryTotal: 'कुष्ठरोग पुनर्रचनात्मक शस्त्रक्रिया एकूण',

    oralCancerSectionTitle: 'तोंडी कर्करोग डेटा',
    oralCancerSuspectedTotal: 'तोंडी कर्करोग संशयित एकूण',
    oralCancerReferredTotal: 'तोंडी कर्करोग संदर्भित एकूण',
    oralCancerDiagnosedTotal: 'तोंडी कर्करोग निदान झालेले एकूण',
    oralCancerChemoTherapy: 'तोंडी कर्करोग केमोथेरपी',
    oralCancerSurgeryDone: 'तोंडी कर्करोग शस्त्रक्रिया झाली',

    breastCancerSectionTitle: 'स्तनाचा कर्करोग डेटा',
    breastCancerSuspectedTotal: 'स्तनाचा कर्करोग संशयित एकूण',
    breastCancerReferredTotal: 'स्तनाचा कर्करोग संदर्भित एकूण',
    breastCancerDiagnosedTotal: 'स्तनाचा कर्करोग निदान झालेले एकूण',
    breastCancerChemoTherapy: 'स्तनाचा कर्करोग केमोथेरपी',
    breastCancerSurgeryDone: 'स्तनाचा कर्करोग शस्त्रक्रिया झाली',

    cervicalCancerSectionTitle: 'गर्भाशयाच्या मुखाचा कर्करोग डेटा',
    cervicalCancerSuspectedTotal: 'गर्भाशयाच्या मुखाचा कर्करोग संशयित एकूण',
    cervicalCancerReferredTotal: 'गर्भाशयाच्या मुखाचा कर्करोग संदर्भित एकूण',
    cervicalCancerDiagnosedTotal: 'गर्भाशयाच्या मुखाचा कर्करोग निदान झालेले एकूण',
    cervicalCancerChemoTherapy: 'गर्भाशयाच्या मुखाचा कर्करोग केमोथेरपी',
    cervicalCancerSurgeryDone: 'गर्भाशयाच्या मुखाचा कर्करोग शस्त्रक्रिया झाली',

    hplcSectionTitle: 'HPLC डेटा',
    hplcSamplesSentTotal: 'HPLC नमुने पाठवलेले एकूण',
    hplcAsCarrierCount: 'HPLC AS वाहक संख्या',
    hplcSsCarrierCount: 'HPLC SS वाहक संख्या',

    submitButton: 'प्रस्तुत करणे',
    updateButton: 'अद्यतनित करा',
    resetButton: 'रीसेट करा',

    requiredError: 'हे क्षेत्र आवश्यक आहे.',
    maxLengthError: 'या मूल्याची लांबी कमाल {{value}} अक्षरे असावी.',
    minLengthError: 'या मूल्याची लांबी किमान {{value}} अक्षरे असावी.',
    minError: 'मूल्य {{value}} पेक्षा कमी नसावे.',
    nonNegativeError: 'मूल्य नकारात्मक नसावे.',
  };

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private route: ActivatedRoute, // To read route parameters
    private router: Router // To navigate
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.editingHospitalId = +id;
        this.loadHospitalDataForEdit(+id);
        this.currentFormTitle = this.labels.formTitleEdit;
      } else {
        this.isEditMode = false;
        this.editingHospitalId = null;
        this.currentFormTitle = this.labels.formTitleCreate;
      }
    });
  }

  initForm(): void {
    this.hospitalForm = this.fb.group({
      phcName: ['', [Validators.required, Validators.maxLength(100)]],
      subcenterName: ['', [Validators.required, Validators.maxLength(100)]],
      villagePhcId: ['', [Validators.required, Validators.maxLength(50)]],
      monthName: ['', Validators.required],

      cataractSuspectedTotal: [null, [Validators.required, Validators.min(0)]],
      cataractScreenedTotal: [null, [Validators.required, Validators.min(0)]],
      cataractMatureCases: [null, [Validators.required, Validators.min(0)]],
      cataractImmatureCases: [null, [Validators.required, Validators.min(0)]],
      cataractSurgeryDone: [null, [Validators.required, Validators.min(0)]],
      cataractFollowupTotal: [null, [Validators.required, Validators.min(0)]],

      htnSuspectedTotal: [null, [Validators.required, Validators.min(0)]],
      htnReferredTotal: [null, [Validators.required, Validators.min(0)]],
      htnOnTreatmentTotal: [null, [Validators.required, Validators.min(0)]],
      htnOnCounselingNotOnTreatment: [null, [Validators.required, Validators.min(0)]],
      htnTreatmentAndFollowup: [null, [Validators.required, Validators.min(0)]],

      dmSuspectedTotal: [null, [Validators.required, Validators.min(0)]],
      dmReferredTotal: [null, [Validators.required, Validators.min(0)]],
      dmOnTreatmentTotal: [null, [Validators.required, Validators.min(0)]],
      dmOnCounselingNotOnTreatment: [null, [Validators.required, Validators.min(0)]],
      dmTreatmentFollowup: [null, [Validators.required, Validators.min(0)]],

      tbSuspectedTotal: [null, [Validators.required, Validators.min(0)]],
      tbReferredForXrayTotal: [null, [Validators.required, Validators.min(0)]],
      tbSputumCollectedTotal: [null, [Validators.required, Validators.min(0)]],
      tbDiagnosedTotal: [null, [Validators.required, Validators.min(0)]],
      tbOnTreatmentTotal: [null, [Validators.required, Validators.min(0)]],

      leprosySuspectedTotal: [null, [Validators.required, Validators.min(0)]],
      leprosyReferredTotal: [null, [Validators.required, Validators.min(0)]],
      leprosyDiagnosedTotal: [null, [Validators.required, Validators.min(0)]],
      leprosyOnTreatmentTotal: [null, [Validators.required, Validators.min(0)]],
      leprosyReconstructiveSurgeryTotal: [null, [Validators.required, Validators.min(0)]],

      oralCancerSuspectedTotal: [null, [Validators.required, Validators.min(0)]],
      oralCancerReferredTotal: [null, [Validators.required, Validators.min(0)]],
      oralCancerDiagnosedTotal: [null, [Validators.required, Validators.min(0)]],
      oralCancerChemoTherapy: [null, [Validators.required, Validators.min(0)]],
      oralCancerSurgeryDone: [null, [Validators.required, Validators.min(0)]],

      breastCancerSuspectedTotal: [null, [Validators.required, Validators.min(0)]],
      breastCancerReferredTotal: [null, [Validators.required, Validators.min(0)]],
      breastCancerDiagnosedTotal: [null, [Validators.required, Validators.min(0)]],
      breastCancerChemoTherapy: [null, [Validators.required, Validators.min(0)]],
      breastCancerSurgeryDone: [null, [Validators.required, Validators.min(0)]],

      cervicalCancerSuspectedTotal: [null, [Validators.required, Validators.min(0)]],
      cervicalCancerReferredTotal: [null, [Validators.required, Validators.min(0)]],
      cervicalCancerDiagnosedTotal: [null, [Validators.required, Validators.min(0)]],
      cervicalCancerChemoTherapy: [null, [Validators.required, Validators.min(0)]],
      cervicalCancerSurgeryDone: [null, [Validators.required, Validators.min(0)]],

      hplcSamplesSentTotal: [null, [Validators.required, Validators.min(0)]],
      hplcAsCarrierCount: [null, [Validators.required, Validators.min(0)]],
      hplcSsCarrierCount: [null, [Validators.required, Validators.min(0)]]
    });
  }

  loadHospitalDataForEdit(id: number): void {
    this.hospitalService.getHospitalById(id).subscribe({
      next: (hospital) => {
        this.hospitalForm.patchValue(hospital);
      },
      error: (err) => {
        console.error('Error loading hospital data for edit:', err);
        alert('हॉस्पिटल डेटा लोड करताना त्रुटी आली.');
        this.router.navigate(['/hospital-form']); // Navigate to create form on error
      }
    });
  }

  get f() { return this.hospitalForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.hospitalForm.invalid) {
      console.log('Form is invalid');
      this.hospitalForm.markAllAsTouched();
      const firstInvalidControl = document.querySelector('.form-control.is-invalid, .form-select.is-invalid');
      if (firstInvalidControl) {
        firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const hospitalData: Hospital = this.hospitalForm.value;

    if (this.isEditMode && this.editingHospitalId) {
      this.hospitalService.updateHospital(this.editingHospitalId, hospitalData).subscribe({
        next: (response) => {
          console.log('Hospital updated successfully!', response);
          alert('हॉस्पिटल डेटा यशस्वीरित्या अद्यतनित झाला!');
          this.router.navigate(['/some-list-page-or-back']); // Or reset: this.onReset();
        },
        error: (err) => {
          console.error('Error updating hospital:', err);
          alert('हॉस्पिटल डेटा अद्यतनित करताना त्रुटी आली.');
        }
      });
    } else {
      this.hospitalService.createHospital(hospitalData).subscribe({
        next: (response) => {
          console.log('Hospital created successfully!', response);
          alert('हॉस्पिटल डेटा यशस्वीरित्या तयार झाला!');
          this.onReset();
        },
        error: (err) => {
          console.error('Error creating hospital:', err);
          alert('हॉस्पिटल डेटा तयार करताना त्रुटी आली.');
        }
      });
    }
  }

  onReset(): void {
    this.submitted = false;
    this.hospitalForm.reset();
    // If navigating to create mode after reset from edit mode
    if (this.isEditMode) {
      this.router.navigate(['/hospital-form']); // This will trigger ngOnInit again for a clean form
    } else {
        this.currentFormTitle = this.labels.formTitleCreate; // Ensure title is reset if not navigating
    }
  }
}