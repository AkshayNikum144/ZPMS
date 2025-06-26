import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArogyaReportComponent } from './arogya-report.component';

describe('ArogyaReportComponent', () => {
  let component: ArogyaReportComponent;
  let fixture: ComponentFixture<ArogyaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArogyaReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArogyaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
