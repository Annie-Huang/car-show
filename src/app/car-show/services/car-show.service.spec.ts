import { TestBed } from '@angular/core/testing';

import { CarShowService } from './car-show.service';

describe('CarShowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarShowService = TestBed.get(CarShowService);
    expect(service).toBeTruthy();
  });
});
