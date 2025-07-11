import { TestBed } from '@angular/core/testing';

import { AbsenManualService } from './absen-manual.service';

describe('AbsenManualService', () => {
  let service: AbsenManualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsenManualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
