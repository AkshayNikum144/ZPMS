// src/app/arogya-form/arogya-form.component.ts

import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ArogyaFormService } from '../arogya-form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-arogya-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './arogya-form.component.html',
  styleUrls: ['./arogya-form.component.scss']
})
export class ArogyaFormComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement?: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement?: ElementRef<HTMLCanvasElement>;
  
  arogyaForm!: FormGroup;
  submitted = false;
  isCameraOpen = false;
  activeCameraControl: string | null = null;
  mediaStream: MediaStream | null = null;
  
  previewUrls: { [key: string]: string | null } = {
    image_file_1: null, image_file_2: null, image_file_3: null, image_file_4: null,
  };

  // ========== THIS IS THE FIX: The full object is restored ==========
  marathiLabels = {
    formTitle: 'आरोग्य केंद्र तपासणी अर्ज',
    formSubtitle: 'कृपया आरोग्य केंद्राच्या तपासणीसाठी सर्व तपशील भरा.',
    section1Title: '१. मूलभूत माहिती',
    arogya_kendra_name: 'आरोग्य केंद्राचे नाव',
    upkendra: 'उप-केंद्र',
    taluka: 'तालुका',
    inspection_officer: 'तपासणी अधिकाऱ्याचे नाव',
    officer_role: 'अधिकाऱ्याची भूमिका',
    inspection_date: 'तपासणीची तारीख',
    section2Title: '२. केंद्र तपशील आणि RKS',
    upkendra_sankhya: 'उप-केंद्रांची संख्या',
    gavanchi_sankhya: 'गावांची संख्या',
    HealthCenterAvailability247: 'आरोग्य केंद्र २४x७ उपलब्ध आहे का?',
    HealthCenterAvailabilityIPHS: 'आरोग्य केंद्र IPHS नुसार उपलब्ध आहे का?',
    RKS_Sthapan: 'RKS स्थापना झाली आहे का?',
    RKS_Nondani: 'RKS नोंदणी झाली आहे का?',
    RKS_Sabha_Niyamit: 'RKS सभा नियमित होतात का?',
    RKS_Ekun_Sabha: 'एकूण RKS सभा',
    Executive_Meetings: 'कार्यकारी सभा',
    Government_Meetings: 'शासकीय सभा',
    section3Title: '३. पायाभूत सुविधा आणि स्वच्छता',
    bahya_parisara_swachata: 'बाह्य परिसराची स्वच्छता',
    vruksharopan: 'वृक्षारोपण केले आहे का?',
    biomedical_waste_vyavastha: 'बायोमेडिकल कचरा व्यवस्थापन',
    pani_purvatha: 'पाणी पुरवठा',
    vidyut_purvatha: 'विद्युत पुरवठा',
    sanrakshak_bhint: 'संरक्षक भिंत',
    delivery_room_swachata: 'प्रसूती खोलीची स्वच्छता',
    section4Title: '४. वैद्यकीय सेवा आणि उपकरणे',
    vahan_chalu: 'वाहन चालू स्थितीत आहे का?',
    aushadhancha_satha: 'औषधांचा साठा',
    vaidyakiya_adhikari_opd: 'OPD मध्ये वैद्यकीय अधिकारी',
    lasikaran_divas: 'लसीकरण दिवस',
    mahiti_adhikar_board: 'माहिती अधिकार फलक',
    lokseva_hakk_board: 'लोकसेवा हक्क फलक',
    vai_opd_diwas: 'वैद्यकीय अधिकारी OPD दिवस',
    saha_rashtriya_aarogya: 'सहा राष्ट्रीय आरोग्य कार्यक्रमांची माहिती',
    rugnansathi_waiting: 'रुग्णांसाठी प्रतीक्षा क्षेत्र',
    delivery_kit: 'डिलिव्हरी किट',
    baby_weight_machine: 'बाळाचे वजन करण्याचे मशीन',
    cot_bed: 'पलंग/बेड',
    prasuti_kakshat_protocol: 'प्रसूती कक्षात प्रोटोकॉल',
    emergency_tray: 'इमर्जन्सी ट्रे',
    adi_sirinj: 'एडी सिरिंज',
    rugnana_kespaper: 'रुग्णांना केसपेपर दिला जातो का?',
    baherun_aushadhi: 'बाहेरून औषधे आणायला सांगतात का?',
    daily_expenditure: 'दैनंदिन खर्च',
    kespaper_opd_fee: 'केसपेपर OPD शुल्क',
    weight_machine_bp: 'वजन मशीन आणि बीपी उपकरण',
    karmachari_ganveshat: 'कर्मचारी गणवेशात असतात का?',
    iec_material: 'IEC साहित्य',
    arv_asv_satha: 'ARV/ASV साठा',
    ort_corner: 'ORT कॉर्नर',
    pani_namune_tapasani: 'पाणी नमुने तपासणी',
    section5Title: '५. आकडेवारी (मासिक सरासरी)',
    opd_sankhya: 'OPD संख्या',
    ipd_sankhya: 'IPD संख्या',
    delivery_sankhya: 'प्रसूती संख्या',
    kutumb_kalyan_shasrkriya: 'कुटुंब कल्याण शस्त्रक्रिया',
    referral_sankhya: 'संदर्भ (Referral) संख्या',
    section6Title: '६. अभिप्राय, समस्या आणि निरीक्षणे',
    takraar_pustika: 'तक्रार पुस्तिका',
    rugnanchya_natewaikansathi_suvidha: 'रुग्णांच्या नातेवाईकांसाठी सुविधा',
    _24_taas_atyavashyak_seva: '२४ तास अत्यावश्यक सेवा',
    parisarat_sathichya_aajarancha_pradurbhav: 'परिसरात साथीच्या आजारांचा प्रादुर्भाव',
    mata_mrutyu_sandarbh: 'माता मृत्यू संदर्भात तपशील',
    paa_kendra_adiadchani: 'आरोग्य केंद्रातील अडचणी/समस्या',
    paa_kendramadhye_nikami_vastu: 'केंद्रातील निकामी वस्तू',
    vaia_karmachari_atyavashyak_seva: 'वैद्यकीय कर्मचाऱ्यांकडून अत्यावश्यक सेवा',
    prashikshan_aavashyak_karmcharyache_naav: 'प्रशिक्षण आवश्यक असलेल्या कर्मचाऱ्यांची नावे',
    section7Title: '७. इतर उपलब्ध सुविधा',
    drinking_water: 'पिण्याचे पाणी',
    telephone: 'टेलिफोन',
    generator_inverter: 'जनरेटर/इन्व्हर्टर',
    vehicle: 'वाहन',
    computer_internet: 'संगणक आणि इंटरनेट',
    solar_water_heater: 'सोलर वॉटर हीटर',
    section8Title: '८. फोटो अपलोड',
    section8Subtitle: 'सुविधेचे संबंधित फोटो अपलोड करा किंवा कॅप्चर करा.',
    image1: 'फोटो १',
    image2: 'फोटो २',
    image3: 'फोटो ३',
    image4: 'फोटो ४',
    noImage: 'फोटो नाही',
    chooseFile: 'फाईल निवडा',
    openCamera: 'कॅमेरा उघडा',
    submitButton: 'अर्ज सबमिट करा',
    resetButton: 'रीसेट करा',
    captureButton: 'कॅप्चर करा',
    cancelButton: 'रद्द करा',
    yes: 'होय',
    no: 'नाही'
  };
    
  // ... The rest of your component code (constructor, ngOnInit, onSubmit, etc.) remains unchanged ...
  constructor(
    private fb: FormBuilder, 
    private arogyaFormService: ArogyaFormService,
    private router: Router
  ) {}

  ngOnInit(): void { this.initForm(); }

  initForm(): void {
    this.arogyaForm = this.fb.group({
      arogya_kendra_name: ['', Validators.required], upkendra: ['', Validators.required],
      inspection_officer: ['', Validators.required], officer_role: ['', Validators.required],
      taluka: ['', Validators.required], inspection_date: [null, Validators.required],
      upkendra_sankhya: [null, [Validators.required, Validators.min(0)]],
      gavanchi_sankhya: [null, [Validators.required, Validators.min(0)]],
      HealthCenterAvailability247: [null, Validators.required], HealthCenterAvailabilityIPHS: [null, Validators.required],
      RKS_Sthapan: [null, Validators.required], RKS_Nondani: [null, Validators.required],
      RKS_Sabha_Niyamit: [null, Validators.required], RKS_Ekun_Sabha: [null, Validators.min(0)],
      Executive_Meetings: [null, Validators.min(0)], Government_Meetings: [null, Validators.min(0)],
      bahya_parisara_swachata: [null, Validators.required], vruksharopan: [null, Validators.required],
      biomedical_waste_vyavastha: [null, Validators.required], pani_purvatha: [null, Validators.required],
      vidyut_purvatha: [null, Validators.required], vahan_chalu: [null, Validators.required],
      aushadhancha_satha: [null, Validators.required], vaidyakiya_adhikari_opd: [null, Validators.required],
      lasikaran_divas: [null, Validators.required], mahiti_adhikar_board: [null, Validators.required],
      sanrakshak_bhint: [null, Validators.required], lokseva_hakk_board: [null, Validators.required],
      vai_opd_diwas: [null, Validators.required], saha_rashtriya_aarogya: [null, Validators.required],
      rugnansathi_waiting: [null, Validators.required], delivery_kit: [null, Validators.required],
      baby_weight_machine: [null, Validators.required], cot_bed: [null, Validators.required],
      prasuti_kakshat_protocol: [null, Validators.required], emergency_tray: [null, Validators.required],
      adi_sirinj: [null, Validators.required], rugnana_kespaper: [null, Validators.required],
      baherun_aushadhi: [null, Validators.required], daily_expenditure: [null, Validators.min(0)],
      kespaper_opd_fee: [null, Validators.min(0)], weight_machine_bp: [null, Validators.required],
      delivery_room_swachata: [null, Validators.required], karmachari_ganveshat: [null, Validators.required],
      iec_material: [null, Validators.required], arv_asv_satha: [null, Validators.required],
      ort_corner: [null, Validators.required], pani_namune_tapasani: [null, Validators.required],
      opd_sankhya: [null, Validators.min(0)], ipd_sankhya: [null, Validators.min(0)],
      delivery_sankhya: [null, Validators.min(0)], kutumb_kalyan_shasrkriya: [null, Validators.min(0)],
      referral_sankhya: [null, Validators.min(0)], takraar_pustika: [null, Validators.required],
      rugnanchya_natewaikansathi_suvidha: [null, Validators.required], parisarat_sathichya_aajarancha_pradurbhav: [''],
      mata_mrutyu_sandarbh: [''], _24_taas_atyavashyak_seva: [null, Validators.required],
      paa_kendra_adiadchani: [''], paa_kendramadhye_nikami_vastu: [''],
      vaia_karmachari_atyavashyak_seva: [''], prashikshan_aavashyak_karmcharyache_naav: [''],
      drinking_water: [null, Validators.required], telephone: [null, Validators.required],
      generator_inverter: [null, Validators.required], vehicle: [null, Validators.required],
      computer_internet: [null, Validators.required], solar_water_heater: [null, Validators.required],
      image_file_1: [null], image_file_2: [null], image_file_3: [null], image_file_4: [null],
    });
  }
  
  get f() { return this.arogyaForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.arogyaForm.invalid) {
      const firstInvalidControl = document.querySelector('.ng-invalid:not(form)');
      if (firstInvalidControl) {
        firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      Swal.fire({
          title: 'त्रुटी!',
          text: 'कृपया सर्व आवश्यक फील्ड भरा.',
          icon: 'error',
          confirmButtonText: 'ठीक आहे'
      });
      return;
    }

    const formData = new FormData();
    Object.keys(this.arogyaForm.value).forEach(key => {
        const value = this.arogyaForm.value[key];
        
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
    });

    this.arogyaFormService.createArogyaForm(formData).subscribe({
      next: () => {
        Swal.fire({
          title: 'यशस्वी!',
          text: 'फॉर्म यशस्वीरित्या जतन झाला!',
          icon: 'success',
          confirmButtonText: 'ठीक आहे'
        }).then(() => {
          this.internalReset();
          this.router.navigate(['/arogya-report']);
        });
      },
      error: (err) => { 
        Swal.fire({
          title: 'त्रुटी!',
          text: 'फॉर्म सबमिट करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.',
          footer: `<pre>${err.message}</pre>`,
          icon: 'error',
          confirmButtonText: 'ठीक आहे'
        });
      }
    });
  }

  onReset(): void {
    Swal.fire({
      title: 'तुम्ही नक्की आहात का?',
      text: "तुम्ही भरलेली सर्व माहिती निघून जाईल!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'होय, रीसेट करा!',
      cancelButtonText: 'रद्द करा'
    }).then((result) => {
      if (result.isConfirmed) {
        this.internalReset();
        Swal.fire(
          'रीसेट झाले!',
          'तुमचा अर्ज रिकामा करण्यात आला आहे.',
          'success'
        )
      }
    })
  }

  private internalReset(): void {
    this.submitted = false; 
    this.arogyaForm.reset();
    Object.keys(this.previewUrls).forEach(key => this.previewUrls[key] = null);
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input: any) => input.value = '');
  }

  onFileChange(event: any, controlName: string): void {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      this.arogyaForm.patchValue({ [controlName]: file });
      this.updatePreview(controlName, file);
    }
  }

  async openCamera(controlName: string) {
    if (!navigator.mediaDevices?.getUserMedia) {
      Swal.fire('त्रुटी', 'या ब्राउझरवर कॅमेरा उपलब्ध नाही.', 'error');
      return;
    }
    try {
      this.activeCameraControl = controlName;
      this.isCameraOpen = true;
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setTimeout(() => { 
          if (this.videoElement) { 
              this.videoElement.nativeElement.srcObject = this.mediaStream; 
              this.videoElement.nativeElement.play(); 
          } 
      });
    } catch (err) {
      Swal.fire('त्रुटी', 'कॅमेरा वापरता आला नाही. कृपया परवानगी दिली आहे का ते तपासा.', 'error');
      this.closeCamera();
    }
  }

  captureImage() {
    if (!this.videoElement || !this.canvasElement || !this.activeCameraControl) return;
    const video = this.videoElement.nativeElement; const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) return;
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      if (blob) {
        const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
        this.arogyaForm.patchValue({ [this.activeCameraControl!]: file });
        this.updatePreview(this.activeCameraControl!, file);
        this.closeCamera();
      }
    }, 'image/jpeg');
  }

  updatePreview(controlName: string, file: File) {
    const reader = new FileReader();
    reader.onload = () => this.previewUrls[controlName] = reader.result as string;
    reader.readAsDataURL(file);
  }

  closeCamera() {
    this.isCameraOpen = false; this.activeCameraControl = null;
    this.mediaStream?.getTracks().forEach(track => track.stop());
  }
  
  ngOnDestroy(): void { this.closeCamera(); }
}