import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectDemandComponent } from './admin-project-demand.component';

describe('AdminProjectDemandComponent', () => {
  let component: AdminProjectDemandComponent;
  let fixture: ComponentFixture<AdminProjectDemandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminProjectDemandComponent]
    });
    fixture = TestBed.createComponent(AdminProjectDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
