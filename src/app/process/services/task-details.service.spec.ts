import { TestBed } from '@angular/core/testing';

import { TaskDetailsService } from './task-details.service';

describe('TaskDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskDetailsService = TestBed.get(TaskDetailsService);
    expect(service).toBeTruthy();
  });
});
