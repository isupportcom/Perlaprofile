import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogsFrontComponent } from './catalogs-front.component';

describe('CatalogsFrontComponent', () => {
  let component: CatalogsFrontComponent;
  let fixture: ComponentFixture<CatalogsFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogsFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogsFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
