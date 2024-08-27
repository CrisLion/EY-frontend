import { TestBed } from '@angular/core/testing';

import { ScreeningApiService } from './screening-api.service';

describe('ScreeningApiService', () => {
  let service: ScreeningApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreeningApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
