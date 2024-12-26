import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInguiryComponent } from './admin-inguiry.component';

describe('AdminInguiryComponent', () => {
  let component: AdminInguiryComponent;
  let fixture: ComponentFixture<AdminInguiryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminInguiryComponent]
    });
    fixture = TestBed.createComponent(AdminInguiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
