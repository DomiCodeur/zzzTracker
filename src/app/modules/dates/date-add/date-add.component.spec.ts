import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateAddComponent } from './date-add.component';

describe('DateAddComponent', () => {
  let component: DateAddComponent;
  let fixture: ComponentFixture<DateAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
