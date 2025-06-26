import { Component, OnInit } from '@angular/core';
import { ArogyaFormResponse, ArogyaFormService } from '../arogya-form.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-arogya',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './report-arogya.component.html',
  styleUrl: './report-arogya.component.scss'
})
export class ReportArogyaComponent  implements OnInit {
formData?: ArogyaFormResponse;

  constructor(
    private route: ActivatedRoute,
    private arogyaService: ArogyaFormService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.arogyaService.getArogyaFormById(id).subscribe({
      next: data => this.formData = data,
      error: err => console.error('Failed to load form:', err)
    });
  }
}
