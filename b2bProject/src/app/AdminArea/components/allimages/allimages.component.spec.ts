import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllimagesComponent } from './allimages.component';

describe('AllimagesComponent', () => {
  let component: AllimagesComponent;
  let fixture: ComponentFixture<AllimagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllimagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
