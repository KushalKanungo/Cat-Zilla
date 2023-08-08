import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperListingComponent } from './paper-listing.component';

describe('PaperListingComponent', () => {
  let component: PaperListingComponent;
  let fixture: ComponentFixture<PaperListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaperListingComponent]
    });
    fixture = TestBed.createComponent(PaperListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
