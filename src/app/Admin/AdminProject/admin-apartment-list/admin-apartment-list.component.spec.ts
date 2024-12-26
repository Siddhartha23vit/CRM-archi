import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApartmentListComponent } from './admin-apartment-list.component';

describe('AdminApartmentListComponent', () => {
  let component: AdminApartmentListComponent;
  let fixture: ComponentFixture<AdminApartmentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminApartmentListComponent]
    });
    fixture = TestBed.createComponent(AdminApartmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
