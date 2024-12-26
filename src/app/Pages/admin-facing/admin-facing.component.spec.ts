import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFacingComponent } from './admin-facing.component';

describe('AdminFacingComponent', () => {
  let component: AdminFacingComponent;
  let fixture: ComponentFixture<AdminFacingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFacingComponent]
    });
    fixture = TestBed.createComponent(AdminFacingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
