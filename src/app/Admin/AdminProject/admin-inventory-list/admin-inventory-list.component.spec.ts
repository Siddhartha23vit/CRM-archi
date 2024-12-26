import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInventoryListComponent } from './admin-inventory-list.component';

describe('AdminInventoryListComponent', () => {
  let component: AdminInventoryListComponent;
  let fixture: ComponentFixture<AdminInventoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminInventoryListComponent]
    });
    fixture = TestBed.createComponent(AdminInventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
