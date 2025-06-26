import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnganwadiFormComponent } from './anganwadi-form.component';

describe('AnganwadiFormComponent', () => {
  let component: AnganwadiFormComponent;
  let fixture: ComponentFixture<AnganwadiFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnganwadiFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnganwadiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
