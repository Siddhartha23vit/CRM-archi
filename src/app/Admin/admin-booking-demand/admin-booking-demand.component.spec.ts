import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookingDemandComponent } from './admin-booking-demand.component';

describe('AdminBookingDemandComponent', () => {
  let component: AdminBookingDemandComponent;
  let fixture: ComponentFixture<AdminBookingDemandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBookingDemandComponent]
    });
    fixture = TestBed.createComponent(AdminBookingDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
