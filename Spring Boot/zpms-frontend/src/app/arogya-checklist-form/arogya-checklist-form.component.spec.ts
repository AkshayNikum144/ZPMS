import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArogyaChecklistFormComponent } from './arogya-checklist-form.component';

describe('ArogyaChecklistFormComponent', () => {
  let component: ArogyaChecklistFormComponent;
  let fixture: ComponentFixture<ArogyaChecklistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArogyaChecklistFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArogyaChecklistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
