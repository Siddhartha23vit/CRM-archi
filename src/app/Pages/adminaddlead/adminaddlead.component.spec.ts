import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddleadComponent } from './adminaddlead.component';

describe('AdminaddleadComponent', () => {
  let component: AdminaddleadComponent;
  let fixture: ComponentFixture<AdminaddleadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminaddleadComponent]
    });
    fixture = TestBed.createComponent(AdminaddleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
