import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateColorsComponent } from './update-colors.component';

describe('UpdateColorsComponent', () => {
  let component: UpdateColorsComponent;
  let fixture: ComponentFixture<UpdateColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateColorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
