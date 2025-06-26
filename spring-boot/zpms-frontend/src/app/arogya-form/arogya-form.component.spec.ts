import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArogyaFormComponent } from './arogya-form.component';

describe('ArogyaFormComponent', () => {
  let component: ArogyaFormComponent;
  let fixture: ComponentFixture<ArogyaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArogyaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArogyaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
