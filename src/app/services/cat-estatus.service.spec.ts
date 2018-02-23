import { TestBed, inject } from '@angular/core/testing';

import { CatEstatusService } from './cat-estatus.service';

describe('CatEstatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatEstatusService]
    });
  });

  it('should be created', inject([CatEstatusService], (service: CatEstatusService) => {
    expect(service).toBeTruthy();
  }));
});
