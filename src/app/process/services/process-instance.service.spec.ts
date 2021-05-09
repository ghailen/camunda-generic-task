import { TestBed } from '@angular/core/testing';

import { ProcessInstanceService } from './process-instance.service';

describe('ProcessInstanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessInstanceService = TestBed.get(ProcessInstanceService);
    expect(service).toBeTruthy();
  });
});
