import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFarmLandComponent } from './admin-farm-land.component';

describe('AdminFarmLandComponent', () => {
  let component: AdminFarmLandComponent;
  let fixture: ComponentFixture<AdminFarmLandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFarmLandComponent]
    });
    fixture = TestBed.createComponent(AdminFarmLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
