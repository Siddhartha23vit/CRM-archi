import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddcustomerComponent } from './adminaddcustomer.component';

describe('AdminaddcustomerComponent', () => {
  let component: AdminaddcustomerComponent;
  let fixture: ComponentFixture<AdminaddcustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminaddcustomerComponent]
    });
    fixture = TestBed.createComponent(AdminaddcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
