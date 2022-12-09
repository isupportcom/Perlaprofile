import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MosquiProductPageComponent } from './mosqui-product-page.component';

describe('MosquiProductPageComponent', () => {
  let component: MosquiProductPageComponent;
  let fixture: ComponentFixture<MosquiProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MosquiProductPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MosquiProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
