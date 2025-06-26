import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolObjectiveComponent } from './school-objective.component';

describe('SchoolObjectiveComponent', () => {
  let component: SchoolObjectiveComponent;
  let fixture: ComponentFixture<SchoolObjectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolObjectiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
