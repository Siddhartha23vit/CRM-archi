import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminrowhouse  Component } from './admin-raw-house.component';

describe('Adminrowhouse  Component', () => {
  let component: Adminrowhouse  Component;
  let fixture: ComponentFixture<Adminrowhouse  Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Adminrowhouse  Component]
    });
    fixture = TestBed.createComponent(Adminrowhouse  Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
