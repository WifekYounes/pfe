import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployspacesComponent } from './employspaces.component';

describe('EmployspacesComponent', () => {
  let component: EmployspacesComponent;
  let fixture: ComponentFixture<EmployspacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployspacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
