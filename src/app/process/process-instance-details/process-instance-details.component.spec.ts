import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessInstanceDetailsComponent } from './process-instance-details.component';

describe('ProcessInstanceDetailsComponent', () => {
  let component: ProcessInstanceDetailsComponent;
  let fixture: ComponentFixture<ProcessInstanceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessInstanceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessInstanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
