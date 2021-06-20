import { TestBed } from '@angular/core/testing';

import { SubuserserviceService } from './subuserservice.service';

describe('SubuserserviceService', () => {
  let service: SubuserserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubuserserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
