import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAmenityComponent } from './admin-amenity.component';

describe('AdminAmenityComponent', () => {
  let component: AdminAmenityComponent;
  let fixture: ComponentFixture<AdminAmenityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAmenityComponent]
    });
    fixture = TestBed.createComponent(AdminAmenityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
