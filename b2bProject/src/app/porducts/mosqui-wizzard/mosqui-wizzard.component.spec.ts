import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MosquiWizzardComponent } from './mosqui-wizzard.component';

describe('MosquiWizzardComponent', () => {
  let component: MosquiWizzardComponent;
  let fixture: ComponentFixture<MosquiWizzardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MosquiWizzardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MosquiWizzardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
