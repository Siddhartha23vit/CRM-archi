import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAssociateComponent } from './admin-add-associate.component';

describe('AdminAddAssociateComponent', () => {
  let component: AdminAddAssociateComponent;
  let fixture: ComponentFixture<AdminAddAssociateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddAssociateComponent]
    });
    fixture = TestBed.createComponent(AdminAddAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
