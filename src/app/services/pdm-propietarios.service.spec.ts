import { TestBed, inject } from '@angular/core/testing';

import { PdmPropietariosService } from './pdm-propietarios.service';

describe('PdmPropietariosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdmPropietariosService]
    });
  });

  it('should be created', inject([PdmPropietariosService], (service: PdmPropietariosService) => {
    expect(service).toBeTruthy();
  }));
});
