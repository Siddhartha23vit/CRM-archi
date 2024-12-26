import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBirthdayComponent } from './admin-birthday.component';

describe('AdminBirthdayComponent', () => {
  let component: AdminBirthdayComponent;
  let fixture: ComponentFixture<AdminBirthdayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBirthdayComponent]
    });
    fixture = TestBed.createComponent(AdminBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
