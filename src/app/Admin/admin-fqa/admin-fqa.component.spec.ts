import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFQAComponent } from './admin-fqa.component';

describe('AdminFQAComponent', () => {
  let component: AdminFQAComponent;
  let fixture: ComponentFixture<AdminFQAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFQAComponent]
    });
    fixture = TestBed.createComponent(AdminFQAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
