import { TestBed } from '@angular/core/testing';

import { ArogyaService } from './arogya.service';

describe('ArogyaService', () => {
  let service: ArogyaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArogyaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
