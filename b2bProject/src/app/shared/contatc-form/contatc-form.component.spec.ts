import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatcFormComponent } from './contatc-form.component';

describe('ContatcFormComponent', () => {
  let component: ContatcFormComponent;
  let fixture: ComponentFixture<ContatcFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContatcFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContatcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
