import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeadSourceComponent } from './admin-lead-source.component';

describe('AdminLeadSourceComponent', () => {
  let component: AdminLeadSourceComponent;
  let fixture: ComponentFixture<AdminLeadSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLeadSourceComponent]
    });
    fixture = TestBed.createComponent(AdminLeadSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
