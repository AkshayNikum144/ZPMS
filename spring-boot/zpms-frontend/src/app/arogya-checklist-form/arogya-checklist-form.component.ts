// src/app/arogya-checklist-form/arogya-checklist-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs'; // <--- FIX: Add 'of' to this import
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ArogyaService, ChecklistData } from '../arogya.service';

@Component({
  selector: 'app-arogya-checklist-form',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './arogya-checklist-form.component.html',
  styleUrls: ['./arogya-checklist-form.component.scss']
})
export class ArogyaChecklistFormComponent implements OnInit {
  checklistForm: FormGroup;
  talukas$: Observable<string[]>;
  kendras$: Observable<string[]> = of([]); // This will now work
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private arogyaService: ArogyaService,
    private router: Router
  ) {
    this.checklistForm = this.fb.group({
      taluka: ['', Validators.required],
      prathmik_arogya_kendra: [{ value: '', disabled: true }, Validators.required], // Start as disabled
      bheticha_dinank: ['', Validators.required]
    });

    this.talukas$ = this.arogyaService.getTalukas();
  }

  ngOnInit(): void {
    this.checklistForm.get('taluka')?.valueChanges.subscribe(talukaValue => {
      if (talukaValue) {
        this.kendras$ = this.arogyaService.getArogyaKendras(talukaValue);
        // Enable the kendra dropdown when a taluka is selected
        this.checklistForm.get('prathmik_arogya_kendra')?.reset({ value: '', disabled: false });
      } else {
        this.kendras$ = of([]); // This will now work
        // Disable and reset the kendra dropdown if no taluka is selected
        this.checklistForm.get('prathmik_arogya_kendra')?.reset({ value: '', disabled: true });
      }
    });
  }

  get f() { return this.checklistForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.checklistForm.invalid) {
      Swal.fire('त्रुटी!', 'कृपया सर्व आवश्यक फील्ड भरा.', 'error');
      return;
    }

    const formData: ChecklistData = this.checklistForm.value;
    
    this.arogyaService.submitChecklist(formData).subscribe({
      next: (response) => {
        Swal.fire('यशस्वी!', 'नवीन तपासणी यशस्वीरित्या शेड्यूल केली आहे!', 'success').then(() => {
          this.router.navigate(['/arogya-report'], { 
            queryParams: { 
              taluka: formData.taluka, 
              kendra: formData.prathmik_arogya_kendra
            } 
          });
        });
      },
      error: (err) => Swal.fire('त्रुटी!', 'काहीतरी चूक झाली.', 'error')
    });
  }

  onReset(): void {
    this.submitted = false;
    this.checklistForm.reset({ 
      taluka: '', 
      prathmik_arogya_kendra: { value: '', disabled: true }, // Reset to disabled state
      bheticha_dinank: '' 
    });
  }
}