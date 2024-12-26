import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLicenseComponent } from './admin-license.component';

describe('AdminLicenseComponent', () => {
  let component: AdminLicenseComponent;
  let fixture: ComponentFixture<AdminLicenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLicenseComponent]
    });
    fixture = TestBed.createComponent(AdminLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
