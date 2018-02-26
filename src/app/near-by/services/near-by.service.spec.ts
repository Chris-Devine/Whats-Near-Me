import { TestBed, inject } from '@angular/core/testing';

import { NearByService } from './near-by.service';

describe('NearByService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NearByService]
    });
  });

  it('should be created', inject([NearByService], (service: NearByService) => {
    expect(service).toBeTruthy();
  }));
});
