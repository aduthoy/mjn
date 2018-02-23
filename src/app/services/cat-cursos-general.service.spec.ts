import { TestBed, inject } from '@angular/core/testing';

import { CatCursosGeneralService } from './cat-cursos-general.service';

describe('CatCursosGeneralService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatCursosGeneralService]
    });
  });

  it('should be created', inject([CatCursosGeneralService], (service: CatCursosGeneralService) => {
    expect(service).toBeTruthy();
  }));
});
