import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmingeneralmasterComponent } from './admingeneralmaster.component';

describe('AdmingeneralmasterComponent', () => {
  let component: AdmingeneralmasterComponent;
  let fixture: ComponentFixture<AdmingeneralmasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmingeneralmasterComponent]
    });
    fixture = TestBed.createComponent(AdmingeneralmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
