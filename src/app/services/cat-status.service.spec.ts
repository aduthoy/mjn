import { TestBed, inject } from '@angular/core/testing';

import { CatStatusService } from './cat-status.service';

describe('CatStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatStatusService]
    });
  });

  it('should be created', inject([CatStatusService], (service: CatStatusService) => {
    expect(service).toBeTruthy();
  }));
});
