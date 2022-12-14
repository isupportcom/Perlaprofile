import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MosquiUpdateThumbnailComponent } from './mosqui-update-thumbnail.component';

describe('MosquiUpdateThumbnailComponent', () => {
  let component: MosquiUpdateThumbnailComponent;
  let fixture: ComponentFixture<MosquiUpdateThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MosquiUpdateThumbnailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MosquiUpdateThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
