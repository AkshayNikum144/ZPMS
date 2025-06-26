// src/app/view-inspection/view-inspection.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InspectionserviceService, AnganwadiInspection } from '../inspectionservice.service';

@Component({
  selector: 'app-view-inspection',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './view-inspection.component.html',
  styleUrls: ['./view-inspection.component.scss']
})
export class ViewInspectionComponent implements OnInit {
  inspection: AnganwadiInspection | null = null;
  isLoading = true;
  error: string | null = null;
  // This should be the base URL where your backend serves images
  imageUrlBase = 'http://localhost:8080/uploads/';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inspectionService: InspectionserviceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadInspectionDetails(+id);
    } else {
      this.error = "No inspection ID provided.";
      this.isLoading = false;
    }
  }

  loadInspectionDetails(id: number): void {
    this.isLoading = true;
    this.inspectionService.getInspectionById(id).subscribe({
      next: (data) => {
        this.inspection = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = "Failed to load inspection details. " + err.message;
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  printReport(): void {
    window.print();
  }

  goBack(): void {
    this.router.navigate(['/inspections']);
  }
}