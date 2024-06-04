import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateItemComponent } from './date-item.component';

describe('DateItemComponent', () => {
  let component: DateItemComponent;
  let fixture: ComponentFixture<DateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
