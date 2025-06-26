import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolVisitReportComponent } from './school-visit-report.component';

describe('SchoolVisitReportComponent', () => {
  let component: SchoolVisitReportComponent;
  let fixture: ComponentFixture<SchoolVisitReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolVisitReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolVisitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
