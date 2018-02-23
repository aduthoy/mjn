import { TestBed, inject } from '@angular/core/testing';

import { CatPdmService } from './cat-pdm.service';

describe('CatPdmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatPdmService]
    });
  });

  it('should be created', inject([CatPdmService], (service: CatPdmService) => {
    expect(service).toBeTruthy();
  }));
});
