import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBankComponent } from './admin-bank.component';

describe('AdminBankComponent', () => {
  let component: AdminBankComponent;
  let fixture: ComponentFixture<AdminBankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminBankComponent]
    });
    fixture = TestBed.createComponent(AdminBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
