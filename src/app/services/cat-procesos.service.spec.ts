import { TestBed, inject } from '@angular/core/testing';

import { CatProcesosService } from './cat-procesos.service';

describe('CatProcesosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatProcesosService]
    });
  });

  it('should be created', inject([CatProcesosService], (service: CatProcesosService) => {
    expect(service).toBeTruthy();
  }));
});
