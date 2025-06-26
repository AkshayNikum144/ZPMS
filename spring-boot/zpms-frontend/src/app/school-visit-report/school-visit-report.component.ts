import { Component, OnInit } from '@angular/core';
import { SchoolVisitForm, SchoolVisitService } from '../schoolvisit.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-school-visit-report',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './school-visit-report.component.html',
  styleUrl: './school-visit-report.component.scss'
})
export class SchoolVisitReportComponent implements OnInit {
  visits: SchoolVisitForm[] = [];

  constructor(private schoolVisitService: SchoolVisitService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.schoolVisitService.getAllVisits().subscribe(
      (data) => this.visits = data,
      (error) => console.error('Error fetching data', error)
    );
  }

  getKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}
