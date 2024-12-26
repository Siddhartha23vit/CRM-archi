import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChargesComponent } from './admin-charges.component';

describe('AdminChargesComponent', () => {
  let component: AdminChargesComponent;
  let fixture: ComponentFixture<AdminChargesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChargesComponent]
    });
    fixture = TestBed.createComponent(AdminChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
