import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MosquiInsertPdfComponent } from './mosqui-insert-pdf.component';

describe('MosquiInsertPdfComponent', () => {
  let component: MosquiInsertPdfComponent;
  let fixture: ComponentFixture<MosquiInsertPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MosquiInsertPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MosquiInsertPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
