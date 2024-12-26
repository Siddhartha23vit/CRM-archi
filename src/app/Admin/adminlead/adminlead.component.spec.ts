import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminleadComponent } from './adminlead.component';

describe('AdminleadComponent', () => {
  let component: AdminleadComponent;
  let fixture: ComponentFixture<AdminleadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminleadComponent]
    });
    fixture = TestBed.createComponent(AdminleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
