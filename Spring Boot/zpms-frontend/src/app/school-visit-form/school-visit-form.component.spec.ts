import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolVisitFormComponent } from './school-visit-form.component';

describe('SchoolVisitFormComponent', () => {
  let component: SchoolVisitFormComponent;
  let fixture: ComponentFixture<SchoolVisitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolVisitFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolVisitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
