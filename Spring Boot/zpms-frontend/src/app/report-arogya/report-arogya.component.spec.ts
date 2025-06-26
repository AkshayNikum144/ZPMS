import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportArogyaComponent } from './report-arogya.component';

describe('ReportArogyaComponent', () => {
  let component: ReportArogyaComponent;
  let fixture: ComponentFixture<ReportArogyaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportArogyaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportArogyaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
