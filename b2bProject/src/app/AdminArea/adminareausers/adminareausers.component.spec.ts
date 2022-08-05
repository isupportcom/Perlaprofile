import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminareausersComponent } from './adminareausers.component';

describe('AdminareausersComponent', () => {
  let component: AdminareausersComponent;
  let fixture: ComponentFixture<AdminareausersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminareausersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminareausersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
