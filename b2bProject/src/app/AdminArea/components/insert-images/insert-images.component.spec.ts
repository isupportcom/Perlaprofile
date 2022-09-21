import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertImagesComponent } from './insert-images.component';

describe('InsertImagesComponent', () => {
  let component: InsertImagesComponent;
  let fixture: ComponentFixture<InsertImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
