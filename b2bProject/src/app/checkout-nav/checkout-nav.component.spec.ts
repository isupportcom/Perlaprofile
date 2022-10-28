import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutNavComponent } from './checkout-nav.component';

describe('CheckoutNavComponent', () => {
  let component: CheckoutNavComponent;
  let fixture: ComponentFixture<CheckoutNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
