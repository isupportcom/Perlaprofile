import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCatalogsComponent } from './upload-catalogs.component';

describe('UploadCatalogsComponent', () => {
  let component: UploadCatalogsComponent;
  let fixture: ComponentFixture<UploadCatalogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCatalogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadCatalogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
