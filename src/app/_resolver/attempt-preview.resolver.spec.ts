import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { attemptPreviewResolver } from './attempt-preview.resolver';

describe('attemptPreviewResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => attemptPreviewResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
