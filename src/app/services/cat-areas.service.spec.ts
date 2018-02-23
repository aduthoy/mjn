import { TestBed, inject } from '@angular/core/testing';

import { CatAreasService } from './cat-areas.service';

describe('CatAreasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatAreasService]
    });
  });

  it('should be created', inject([CatAreasService], (service: CatAreasService) => {
    expect(service).toBeTruthy();
  }));
});
