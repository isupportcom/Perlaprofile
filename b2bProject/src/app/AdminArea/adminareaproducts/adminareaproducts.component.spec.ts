import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminareaproductsComponent } from './adminareaproducts.component';

describe('AdminareaproductsComponent', () => {
  let component: AdminareaproductsComponent;
  let fixture: ComponentFixture<AdminareaproductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminareaproductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminareaproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
