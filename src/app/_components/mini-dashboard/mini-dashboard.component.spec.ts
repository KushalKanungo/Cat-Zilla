import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniDashboardComponent } from './MiniDashboardComponent';

describe('MiniDashboardComponent', () => {
  let component: MiniDashboardComponent;
  let fixture: ComponentFixture<MiniDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiniDashboardComponent]
    });
    fixture = TestBed.createComponent(MiniDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
