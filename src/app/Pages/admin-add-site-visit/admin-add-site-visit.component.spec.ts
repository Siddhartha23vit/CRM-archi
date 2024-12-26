import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSiteVisitComponent } from './admin-add-site-visit.component';

describe('AdminAddSiteVisitComponent', () => {
  let component: AdminAddSiteVisitComponent;
  let fixture: ComponentFixture<AdminAddSiteVisitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAddSiteVisitComponent]
    });
    fixture = TestBed.createComponent(AdminAddSiteVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
