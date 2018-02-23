import { TestBed, inject } from '@angular/core/testing';
import { CatPropsService } from './cat-props.service';

describe('CatPropsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CatPropsService]
    });
  });

  it('should be created', inject([CatPropsService], (service: CatPropsService) => {
    expect(service).toBeTruthy();
  }));
});
