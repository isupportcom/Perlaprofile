import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddedToCartComponent } from './product-added-to-cart.component';

describe('ProductAddedToCartComponent', () => {
  let component: ProductAddedToCartComponent;
  let fixture: ComponentFixture<ProductAddedToCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAddedToCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAddedToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
