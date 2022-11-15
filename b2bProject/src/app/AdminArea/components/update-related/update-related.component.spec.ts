import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRelatedComponent } from './update-related.component';

describe('UpdateRelatedComponent', () => {
  let component: UpdateRelatedComponent;
  let fixture: ComponentFixture<UpdateRelatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRelatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
