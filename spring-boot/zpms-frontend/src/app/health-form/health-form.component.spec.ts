import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthFormComponent } from './health-form.component';

describe('HealthFormComponent', () => {
  let component: HealthFormComponent;
  let fixture: ComponentFixture<HealthFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
