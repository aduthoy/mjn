import { TestBed, inject } from '@angular/core/testing';

import { CatCursosEspecificosService } from './cat-cursos-especificos.service';

describe('CatCursosEspecificosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatCursosEspecificosService]
    });
  });

  it('should be created', inject([CatCursosEspecificosService], (service: CatCursosEspecificosService) => {
    expect(service).toBeTruthy();
  }));
});
