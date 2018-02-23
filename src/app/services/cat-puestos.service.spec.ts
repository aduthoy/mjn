import { TestBed, inject } from '@angular/core/testing';

import { CatPuestosService } from './cat-puestos.service';

describe('CatPuestosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatPuestosService]
    });
  });

  it('should be created', inject([CatPuestosService], (service: CatPuestosService) => {
    expect(service).toBeTruthy();
  }));
});
