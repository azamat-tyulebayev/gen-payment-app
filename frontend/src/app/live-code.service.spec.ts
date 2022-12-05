import { TestBed } from '@angular/core/testing';

import { LiveCodeService } from './live-code.service';

describe('LiveCodeService', () => {
  let service: LiveCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
