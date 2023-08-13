import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { paperLeaveGuard } from './paper-leave.guard';

describe('paperLeaveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => paperLeaveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
