import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPaperComponent } from './add-new-paper.component';

describe('AddNewPaperComponent', () => {
  let component: AddNewPaperComponent;
  let fixture: ComponentFixture<AddNewPaperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewPaperComponent]
    });
    fixture = TestBed.createComponent(AddNewPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
