import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientareasComponent } from './clientareas.component';

describe('ClientareasComponent', () => {
  let component: ClientareasComponent;
  let fixture: ComponentFixture<ClientareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
