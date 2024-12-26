import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsitevisitComponent } from './adminsitevisit.component';

describe('AdminsitevisitComponent', () => {
  let component: AdminsitevisitComponent;
  let fixture: ComponentFixture<AdminsitevisitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminsitevisitComponent]
    });
    fixture = TestBed.createComponent(AdminsitevisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
