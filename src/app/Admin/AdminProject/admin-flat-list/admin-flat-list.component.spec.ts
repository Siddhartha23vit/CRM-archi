import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFlatListComponent } from './admin-flat-list.component';

describe('AdminFlatListComponent', () => {
  let component: AdminFlatListComponent;
  let fixture: ComponentFixture<AdminFlatListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFlatListComponent]
    });
    fixture = TestBed.createComponent(AdminFlatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
