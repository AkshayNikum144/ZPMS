import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AganwadiReportComponent } from './aganwadi-report.component';

describe('AganwadiReportComponent', () => {
  let component: AganwadiReportComponent;
  let fixture: ComponentFixture<AganwadiReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AganwadiReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AganwadiReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
