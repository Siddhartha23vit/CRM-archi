import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFarmLandListComponent } from './admin-farm-land-list.component';

describe('AdminFarmLandListComponent', () => {
  let component: AdminFarmLandListComponent;
  let fixture: ComponentFixture<AdminFarmLandListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFarmLandListComponent]
    });
    fixture = TestBed.createComponent(AdminFarmLandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
