import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MosquiInsertImageComponent } from './mosqui-insert-image.component';

describe('MosquiInsertImageComponent', () => {
  let component: MosquiInsertImageComponent;
  let fixture: ComponentFixture<MosquiInsertImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MosquiInsertImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MosquiInsertImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
