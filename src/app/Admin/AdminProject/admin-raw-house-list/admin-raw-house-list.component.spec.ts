import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRawHouseListComponent } from './admin-raw-house-list.component';

describe('AdminRawHouseListComponent', () => {
  let component: AdminRawHouseListComponent;
  let fixture: ComponentFixture<AdminRawHouseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRawHouseListComponent]
    });
    fixture = TestBed.createComponent(AdminRawHouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
