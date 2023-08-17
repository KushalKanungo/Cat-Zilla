import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarLoadingComponent } from './top-bar-loading.component';

describe('TopBarLoadingComponent', () => {
  let component: TopBarLoadingComponent;
  let fixture: ComponentFixture<TopBarLoadingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopBarLoadingComponent]
    });
    fixture = TestBed.createComponent(TopBarLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
