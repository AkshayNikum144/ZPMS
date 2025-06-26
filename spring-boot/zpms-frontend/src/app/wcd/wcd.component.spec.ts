import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WCDComponent } from './wcd.component';

describe('WCDComponent', () => {
  let component: WCDComponent;
  let fixture: ComponentFixture<WCDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WCDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WCDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
