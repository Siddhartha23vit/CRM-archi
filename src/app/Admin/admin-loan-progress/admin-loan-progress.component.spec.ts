import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoanProgressComponent } from './admin-loan-progress.component';

describe('AdminLoanProgressComponent', () => {
  let component: AdminLoanProgressComponent;
  let fixture: ComponentFixture<AdminLoanProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLoanProgressComponent]
    });
    fixture = TestBed.createComponent(AdminLoanProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
