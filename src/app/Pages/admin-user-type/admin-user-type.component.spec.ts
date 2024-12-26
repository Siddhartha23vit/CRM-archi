import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserTypeComponent } from './admin-user-type.component';

describe('AdminUserTypeComponent', () => {
  let component: AdminUserTypeComponent;
  let fixture: ComponentFixture<AdminUserTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserTypeComponent]
    });
    fixture = TestBed.createComponent(AdminUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
