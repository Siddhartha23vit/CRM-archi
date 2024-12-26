import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlotListComponent } from './admin-plot-list.component';

describe('AdminPlotListComponent', () => {
  let component: AdminPlotListComponent;
  let fixture: ComponentFixture<AdminPlotListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPlotListComponent]
    });
    fixture = TestBed.createComponent(AdminPlotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
