import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// In a real app, you would import your service here
// import { ArogyaFormService } from '../arogya-form.service';

@Component({
  selector: 'app-health-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './health-form.component.html',
  styleUrls: ['./health-form.component.scss']
})
export class HealthFormComponent implements OnInit {
  arogyaForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    // private arogyaFormService: ArogyaFormService // Uncomment when service is ready
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.arogyaForm = this.fb.group({
      // Basic Information
      arogya_kendra_name: ['', Validators.required],
      upkendra: ['', Validators.required],
      inspection_officer: ['', Validators.required],
      officer_role: ['', Validators.required],
      taluka: ['', Validators.required],
      inspection_date: [null, Validators.required],

      // Center Details
      upkendra_sankhya: [null, [Validators.required, Validators.min(0)]],
      gavanchi_sankhya: [null, [Validators.required, Validators.min(0)]],
      HealthCenterAvailability247: [null, Validators.required],
      HealthCenterAvailabilityIPHS: [null, Validators.required],
      RKS_Sthapan: [null, Validators.required],
      RKS_Nondani: [null, Validators.required],
      RKS_Sabha_Niyamit: [null, Validators.required],
      RKS_Ekun_Sabha: [null, Validators.min(0)],
      Executive_Meetings: [null, Validators.min(0)],
      Government_Meetings: [null, Validators.min(0)],

      // Infrastructure & Cleanliness
      bahya_parisara_swachata: [null, Validators.required],
      vruksharopan: [null, Validators.required],
      biomedical_waste_vyavastha: [null, Validators.required],
      pani_purvatha: [null, Validators.required],
      vidyut_purvatha: [null, Validators.required],
      sanrakshak_bhint: [null, Validators.required],
      delivery_room_swachata: [null, Validators.required],

      // Medical Services & Equipment
      vahan_chalu: [null, Validators.required],
      aushadhancha_satha: [null, Validators.required],
      vaidyakiya_adhikari_opd: [null, Validators.required],
      lasikaran_divas: [null, Validators.required],
      mahiti_adhikar_board: [null, Validators.required],
      lokseva_hakk_board: [null, Validators.required],
      vai_opd_diwas: [null, Validators.required],
      saha_rashtriya_aarogya: [null, Validators.required],
      rugnansathi_waiting: [null, Validators.required],
      delivery_kit: [null, Validators.required],
      baby_weight_machine: [null, Validators.required],
      cot_bed: [null, Validators.required],
      prasuti_kakshat_protocol: [null, Validators.required],
      emergency_tray: [null, Validators.required],
      adi_sirinj: [null, Validators.required],
      rugnana_kespaper: [null, Validators.required],
      baherun_aushadhi: [null, Validators.required],
      daily_expenditure: [null, Validators.min(0)],
      kespaper_opd_fee: [null, Validators.min(0)],
      weight_machine_bp: [null, Validators.required],
      karmachari_ganveshat: [null, Validators.required],
      iec_material: [null, Validators.required],
      arv_asv_satha: [null, Validators.required],
      ort_corner: [null, Validators.required],
      pani_namune_tapasani: [null, Validators.required],

      // Statistics
      opd_sankhya: [null, Validators.min(0)],
      ipd_sankhya: [null, Validators.min(0)],
      delivery_sankhya: [null, Validators.min(0)],
      kutumb_kalyan_shasrkriya: [null, Validators.min(0)],
      referral_sankhya: [null, Validators.min(0)],

      // Feedback & Remarks
      takraar_pustika: [null, Validators.required],
      rugnanchya_natewaikansathi_suvidha: [null, Validators.required],
      parisarat_sathichya_aajarancha_pradurbhav: [''],
      mata_mrutyu_sandarbh: [''],
      _24_taas_atyavashyak_seva: [null, Validators.required],
      paa_kendra_adiadchani: [''],
      paa_kendramadhye_nikami_vastu: [''],
      vaia_karmachari_atyavashyak_seva: [''],
      prashikshan_aavashyak_karmcharyache_naav: [''],

      // Other Facilities
      drinking_water: [null, Validators.required],
      telephone: [null, Validators.required],
      generator_inverter: [null, Validators.required],
      vehicle: [null, Validators.required],
      computer_internet: [null, Validators.required],
      solar_water_heater: [null, Validators.required],
      
      // File Uploads - these will hold the File object for processing in onSubmit
      image_file_1: [null],
      image_file_2: [null],
      image_file_3: [null],
      image_file_4: [null],
    });
  }
  
  // Convenience getter for easy access to form controls in the template
  get f() {
    return this.arogyaForm.controls;
  }

  // Handles file selection and patches the form value
  onFileChange(event: any, controlName: string): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.arogyaForm.patchValue({
        [controlName]: file
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.arogyaForm.invalid) {
      console.log('Form is invalid');
      // Find first invalid control and scroll to it for better UX
      const firstInvalidControl = document.querySelector('.ng-invalid');
      if (firstInvalidControl) {
        firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Use FormData because we are sending files
    const formData = new FormData();
    
    // Append all form values to FormData
    Object.keys(this.arogyaForm.value).forEach(key => {
        // Skip file controls if they are null
        if (key.startsWith('image_file_') && !this.arogyaForm.value[key]) {
            return;
        }
        formData.append(key, this.arogyaForm.value[key]);
    });

    console.log('Submitting FormData...');
    // Log FormData contents for debugging
    // @ts-ignore
    for (let pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    
    alert('Form submitted successfully! Check console for FormData details.');

    // Example of calling a service to send FormData to the backend
    // this.arogyaFormService.createArogyaForm(formData).subscribe({
    //   next: (response) => {
    //     console.log('Data saved!', response);
    //     alert('Form data saved successfully!');
    //     this.onReset();
    //   },
    //   error: (err) => {
    //     console.error('Error saving data', err);
    //     alert('An error occurred while saving the data.');
    //   }
    // });
  }

  onReset(): void {
    this.submitted = false;
    this.arogyaForm.reset();
  }
}