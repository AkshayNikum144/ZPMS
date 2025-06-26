import { TestBed } from '@angular/core/testing';

import { ArogyaFormService } from './arogya-form.service';

describe('ArogyaFormService', () => {
  let service: ArogyaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArogyaFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
