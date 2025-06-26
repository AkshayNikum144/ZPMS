import { TestBed } from '@angular/core/testing';
import { AnganwadiService } from './anganwadi-service.service';

describe('AnganwadiServiceService', () => {
  let service: AnganwadiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Add providers if the service has dependencies
      providers: [AnganwadiService]
    });
    service = TestBed.inject(AnganwadiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Basic test to ensure service is instantiated
  });
});
