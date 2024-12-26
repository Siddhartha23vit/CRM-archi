import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFloorListComponent } from './admin-floor-list.component';

describe('AdminFloorListComponent', () => {
  let component: AdminFloorListComponent;
  let fixture: ComponentFixture<AdminFloorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFloorListComponent]
    });
    fixture = TestBed.createComponent(AdminFloorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
