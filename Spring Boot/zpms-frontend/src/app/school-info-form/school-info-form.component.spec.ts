import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolInfoFormComponent } from './school-info-form.component';

describe('SchoolInfoFormComponent', () => {
  let component: SchoolInfoFormComponent;
  let fixture: ComponentFixture<SchoolInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolInfoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
