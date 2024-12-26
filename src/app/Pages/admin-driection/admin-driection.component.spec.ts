import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDriectionComponent } from './admin-driection.component';

describe('AdminDriectionComponent', () => {
  let component: AdminDriectionComponent;
  let fixture: ComponentFixture<AdminDriectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDriectionComponent]
    });
    fixture = TestBed.createComponent(AdminDriectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
