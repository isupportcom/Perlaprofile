import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MosquiComponent } from './mosqui.component';

describe('MosquiComponent', () => {
  let component: MosquiComponent;
  let fixture: ComponentFixture<MosquiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MosquiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MosquiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
