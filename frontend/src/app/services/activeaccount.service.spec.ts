import { TestBed, inject } from '@angular/core/testing';

import { ActiveaccountService } from './activeaccount.service';

describe('ActiveaccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveaccountService]
    });
  });

  it('should be created', inject([ActiveaccountService], (service: ActiveaccountService) => {
    expect(service).toBeTruthy();
  }));
});
