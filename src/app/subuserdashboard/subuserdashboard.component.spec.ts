import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubuserdashboardComponent } from './subuserdashboard.component';

describe('SubuserdashboardComponent', () => {
  let component: SubuserdashboardComponent;
  let fixture: ComponentFixture<SubuserdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubuserdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubuserdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
