import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImagePopupComponent } from './add-image-popup.component';

describe('AddImagePopupComponent', () => {
  let component: AddImagePopupComponent;
  let fixture: ComponentFixture<AddImagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddImagePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
