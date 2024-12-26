import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddbookingComponent } from './admin-addbooking.component';

describe('AdminAddbookingComponent', () => {
  let component: AdminAddbookingComponent;
  let fixture: ComponentFixture<AdminAddbookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddbookingComponent]
    });
    fixture = TestBed.createComponent(AdminAddbookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
