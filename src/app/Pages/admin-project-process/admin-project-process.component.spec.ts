import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectProcessComponent } from './admin-project-process.component';

describe('AdminProjectProcessComponent', () => {
  let component: AdminProjectProcessComponent;
  let fixture: ComponentFixture<AdminProjectProcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProjectProcessComponent]
    });
    fixture = TestBed.createComponent(AdminProjectProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
