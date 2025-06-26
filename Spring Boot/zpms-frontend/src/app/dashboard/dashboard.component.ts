// src/app/dashboard/dashboard.component.ts

import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { forkJoin } from 'rxjs';
import { School, SchoolService } from '../school.service';
import { AnganwadiInspection, InspectionserviceService } from '../inspectionservice.service';
import { ArogyaFormResponse, ArogyaFormService } from '../arogya-form.service';

// --- Import Your Data Services and Models ---
// Make sure the paths to your services are correct. I'm assuming they are in a 'services' folder.

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule, NgxChartsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isBrowser: boolean = false;
  isLoading: boolean = true;

  private allSchools: School[] = [];
  private allAnganwadiInspections: AnganwadiInspection[] = [];
  private allArogyaForms: ArogyaFormResponse[] = [];

  fromDate: string = '';
  toDate: string = '';

  totalTarget: number = 0;
  todayTarget: number = 0;
  completedTarget: number = 0;

  totalData = { anganwadi: 0, school: 0, health: 0 };
  todayData = { anganwadi: 0, school: 0, health: 0 };
  completedData = { anganwadi: 0, school: 0, health: 0 };

  selectedTaluka: string = 'सर्व तालुके';
  talukaOptions: string[] = ['सर्व तालुके'];
  selectedMonth: string = '';

  public barChartType: 'bar' = 'bar';
  public buildingTypePieChartType: 'pie' = 'pie';
  public buildingTypePieChartPlugins = [ChartDataLabels];

  public talukaVisitsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'भेटी', backgroundColor: '#36A2EB' }]
  };

  public monthlyVisitsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून', 'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'],
    datasets: [{ data: [], label: 'भेटी', backgroundColor: '#FFCE56' }]
  };

  public buildingTypePieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ data: [], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'] }]
  };

  public facilityBarChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['स्वच्छतागृह उपलब्ध', 'पिण्याचे पाणी', 'विद्युत पुरवठा'],
    datasets: [{ data: [], label: 'उपलब्ध केंद्रांची संख्या', backgroundColor: '#4BC0C0' }]
  };

  public talukaVisitsChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, title: { display: true, text: 'तालुकानुसार एकूण भेटी' } }
  };

  public monthlyVisitsChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: true }, title: { display: true, text: 'महिन्यानुसार भेटी' } }
  };

  public buildingTypePieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'अंगणवाडी इमारत प्रकार' },
      datalabels: {
        formatter: (value, ctx) => {
          // --- FIX for TS2769: Handle complex data types in reducer ---
          const total = ctx.chart.data.datasets[0].data.reduce((sum: number, data) => {
            const val = data as number; // Cast to number
            return sum + (isNaN(val) ? 0 : val); // Add only if it's a valid number
          }, 0);

          // --- FIX for TS18047: Check if total is not null/zero ---
          if (total === 0) return '0%';
          const percentage = ((value / total) * 100).toFixed(1) + '%';
          const label = ctx.chart.data.labels?.[ctx.dataIndex] || '';
          return `${label}: ${percentage}`;
        },
        color: '#fff',
        font: { weight: 'bold' }
      }
    }
  };

  public facilityBarChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: true }, title: { display: true, text: 'अंगणवाडी सोई सुविधा' } }
  };

  ngxBarChartData: any[] = [];
  ngxPieChartData: any[] = [];
  legendPosition: LegendPosition = LegendPosition.Below;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    // --- FIX for TS2551: Use lowercase 's' for the variable name ---
    private schoolService: SchoolService,
    private anganwadiService: InspectionserviceService,
    private arogyaService: ArogyaFormService
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.loadDashboardData();
    }
  }

  loadDashboardData(): void {
    this.isLoading = true;
    forkJoin({
      schools: this.schoolService.getAllSchools(),
      anganwadis: this.anganwadiService.getAllInspections(),
      arogyaForms: this.arogyaService.getAllArogyaForms()
    }).subscribe({
      next: (data) => {
        this.allSchools = data.schools;
        this.allAnganwadiInspections = data.anganwadis;
        this.allArogyaForms = data.arogyaForms;
        this.populateTalukaFilter();
        this.processAllData();
        this.isLoading = false;
        console.log('All dashboard data loaded successfully!');
      },
      error: (err) => {
        console.error('Failed to load dashboard data:', err);
        this.isLoading = false;
      }
    });
  }

  populateTalukaFilter(): void {
    const talukas = new Set<string>();
    this.allSchools.forEach(s => s.taluka && talukas.add(s.taluka));
    this.allAnganwadiInspections.forEach(a => a.taluka && talukas.add(a.taluka));
    this.allArogyaForms.forEach(h => h.taluka && talukas.add(h.taluka));
    this.talukaOptions = ['सर्व तालुके', ...Array.from(talukas).sort()];
  }

  processAllData(): void {
    let filteredSchools = this.allSchools;
    let filteredAnganwadis = this.allAnganwadiInspections;
    let filteredArogya = this.allArogyaForms;

    if (this.selectedTaluka && this.selectedTaluka !== 'सर्व तालुके') {
      filteredSchools = this.allSchools.filter(s => s.taluka === this.selectedTaluka);
      filteredAnganwadis = this.allAnganwadiInspections.filter(a => a.taluka === this.selectedTaluka);
      filteredArogya = this.allArogyaForms.filter(h => h.taluka === this.selectedTaluka);
    }

    if (this.fromDate && this.toDate) {
      const from = new Date(this.fromDate).setHours(0, 0, 0, 0);
      const to = new Date(this.toDate).setHours(23, 59, 59, 999);
      filteredSchools = filteredSchools.filter(s => {
        const itemDate = new Date(s.date).getTime();
        return itemDate >= from && itemDate <= to;
      });
      filteredAnganwadis = filteredAnganwadis.filter(a => {
        const itemDate = new Date(a.inspectionDate).getTime();
        return itemDate >= from && itemDate <= to;
      });
      filteredArogya = filteredArogya.filter(h => {
        const itemDate = new Date(h.inspection_date).getTime();
        return itemDate >= from && itemDate <= to;
      });
    }

    this.updateKpiCards(filteredSchools, filteredAnganwadis, filteredArogya);
    this.updateTalukaVisitsChart();
    this.updateMonthlyVisitsChart(filteredSchools, filteredAnganwadis, filteredArogya);
    this.updateAnganwadiCharts(filteredAnganwadis);
  }

  updateKpiCards(schools: School[], anganwadis: AnganwadiInspection[], arogya: ArogyaFormResponse[]): void {
    const today = new Date().toISOString().split('T')[0];
    this.totalData = {
      school: this.allSchools.length,
      anganwadi: this.allAnganwadiInspections.length,
      health: this.allArogyaForms.length
    };
    this.totalTarget = this.totalData.school + this.totalData.anganwadi + this.totalData.health;
    this.completedData = {
      school: schools.filter(s => s.isReportSubmitted === true).length,
      anganwadi: anganwadis.filter(a => a.status === 'Completed').length,
      health: arogya.filter(h => h.status === 'Completed').length,
    };
    this.completedTarget = this.completedData.school + this.completedData.anganwadi + this.completedData.health;
    this.todayData = {
      school: schools.filter(s => s.date === today).length,
      anganwadi: anganwadis.filter(a => a.inspectionDate === today).length,
      health: arogya.filter(h => h.inspection_date === today).length
    };
    this.todayTarget = this.todayData.school + this.todayData.anganwadi + this.todayData.health;
  }

  updateTalukaVisitsChart(): void {
    const allVisits = [...this.allSchools, ...this.allAnganwadiInspections, ...this.allArogyaForms];
    const counts = allVisits.reduce((acc, visit) => {
      if ((visit as any).taluka) {
        acc[(visit as any).taluka] = (acc[(visit as any).taluka] || 0) + 1;
      }
      return acc;
    }, {} as {[key: string]: number});
    this.talukaVisitsChartData.labels = Object.keys(counts);
    this.talukaVisitsChartData.datasets[0].data = Object.values(counts);
  }

  updateMonthlyVisitsChart(schools: School[], anganwadis: AnganwadiInspection[], arogya: ArogyaFormResponse[]): void {
    const monthlyCounts = new Array(12).fill(0);
    const allItems = [...schools, ...anganwadis, ...arogya];
    allItems.forEach(item => {
      // --- FIX for TS2339: Use `as any` to access properties on mixed-type array ---
      const dateStr = (item as any).date || (item as any).inspectionDate || (item as any).inspection_date;
      if (dateStr) {
        const month = new Date(dateStr).getMonth();
        if (month >= 0 && month < 12) {
          monthlyCounts[month]++;
        }
      }
    });
    this.monthlyVisitsChartData.datasets[0].data = monthlyCounts;
  }

  updateAnganwadiCharts(anganwadis: AnganwadiInspection[]): void {
    const buildingCounts = anganwadis.reduce((acc, a) => {
      const type = a.buildingType || 'अज्ञात';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as {[key: string]: number});
    this.buildingTypePieChartData.labels = Object.keys(buildingCounts);
    this.buildingTypePieChartData.datasets[0].data = Object.values(buildingCounts);

    const facilityCounts = { toilet: 0, water: 0, electricity: 0 };
    anganwadis.forEach(a => {
      if (a.toiletAvailable?.toLowerCase() === 'yes') facilityCounts.toilet++;
      if (a.drinkingWaterSupply?.toLowerCase() === 'yes') facilityCounts.water++;
      if (a.electricitySupply?.toLowerCase() === 'yes') facilityCounts.electricity++;
    });
    this.facilityBarChartData.datasets[0].data = [facilityCounts.toilet, facilityCounts.water, facilityCounts.electricity];

    const childStatus = {
      sam: anganwadis.reduce((sum, a) => sum + (a.samChildren || 0), 0),
      mam: anganwadis.reduce((sum, a) => sum + (a.mamChildren || 0), 0),
      normal: anganwadis.reduce((sum, a) => sum + (a.normalWeightChildren || 0), 0)
    };
    this.ngxPieChartData = [
      { name: 'तीव्र कुपोषित (SAM)', value: childStatus.sam },
      // --- FIX for TS2552: Corrected typo from `child_status` to `childStatus` ---
      { name: 'मध्यम कुपोषित (MAM)', value: childStatus.mam },
      { name: 'सामान्य (Normal)', value: childStatus.normal }
    ].filter(item => item.value > 0);

    this.ngxBarChartData = Object.keys(buildingCounts).map(name => ({ name, value: buildingCounts[name] }));
  }

  applyDateRange(): void { this.processAllData(); }
  resetFilters(): void {
    this.fromDate = '';
    this.toDate = '';
    this.selectedTaluka = 'सर्व तालुके';
    this.processAllData();
  }
  onTalukaChange(): void { this.processAllData(); }
  onMonthChange(): void { console.log('Month changed to:', this.selectedMonth); }
}