import { TestBed } from '@angular/core/testing';

import { InspectionserviceService } from './inspectionservice.service';

describe('InspectionserviceService', () => {
  let service: InspectionserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspectionserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
