import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFlatTypeComponent } from './admin-flat-type.component';

describe('AdminFlatTypeComponent', () => {
  let component: AdminFlatTypeComponent;
  let fixture: ComponentFixture<AdminFlatTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFlatTypeComponent]
    });
    fixture = TestBed.createComponent(AdminFlatTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
