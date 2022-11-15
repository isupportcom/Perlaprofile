import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCatalogsComponent } from './delete-catalogs.component';

describe('DeleteCatalogsComponent', () => {
  let component: DeleteCatalogsComponent;
  let fixture: ComponentFixture<DeleteCatalogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCatalogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCatalogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
