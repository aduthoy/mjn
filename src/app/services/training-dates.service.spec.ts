import { TestBed, inject } from '@angular/core/testing';

import { TrainingDatesService } from './training-dates.service';

describe('TrainingDatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingDatesService]
    });
  });

  it('should be created', inject([TrainingDatesService], (service: TrainingDatesService) => {
    expect(service).toBeTruthy();
  }));
});
