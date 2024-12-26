import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeductionComponent } from './admin-deduction.component';

describe('AdminDeductionComponent', () => {
  let component: AdminDeductionComponent;
  let fixture: ComponentFixture<AdminDeductionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDeductionComponent]
    });
    fixture = TestBed.createComponent(AdminDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
