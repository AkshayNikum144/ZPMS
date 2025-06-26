import { TestBed } from '@angular/core/testing';

import { SchoolvisitService } from './schoolvisit.service';

describe('SchoolvisitService', () => {
  let service: SchoolvisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchoolvisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
