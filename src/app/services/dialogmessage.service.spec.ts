import { TestBed, inject } from '@angular/core/testing';

import { DialogmessageService } from './dialogmessage.service';

describe('DialogmessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogmessageService]
    });
  });

  it('should be created', inject([DialogmessageService], (service: DialogmessageService) => {
    expect(service).toBeTruthy();
  }));
});
