import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertPdfComponent } from './insert-pdf.component';

describe('InsertPdfComponent', () => {
  let component: InsertPdfComponent;
  let fixture: ComponentFixture<InsertPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
