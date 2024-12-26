import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommissionLabComponent } from './admin-commission-lab.component';

describe('AdminCommissionLabComponent', () => {
  let component: AdminCommissionLabComponent;
  let fixture: ComponentFixture<AdminCommissionLabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCommissionLabComponent]
    });
    fixture = TestBed.createComponent(AdminCommissionLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
