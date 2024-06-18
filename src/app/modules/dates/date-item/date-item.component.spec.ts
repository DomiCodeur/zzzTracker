import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DateItemComponent } from './date-item.component';
import { DateModel } from '../../../models/date.model';
import { By } from '@angular/platform-browser';

describe('DateItemComponent', () => {
  let component: DateItemComponent;
  let fixture: ComponentFixture<DateItemComponent>;

  // Configure the testing module and create the component instance
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DateItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateItemComponent);
    component = fixture.componentInstance;

    // Mock input date
    component.date = new DateModel(1, 'Test Event', new Date('2023-12-31'));

    fixture.detectChanges();
  });

  // Test case 1: Check if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test case 2: Verify the onSelect method emits the correct event
  it('should emit select event with correct id on onSelect', () => {
    spyOn(component.select, 'emit');

    component.onSelect();

    expect(component.select.emit).toHaveBeenCalledWith(1);
  });

  // Test case 3: Verify the onDelete method emits the correct event
  it('should emit delete event with correct id on onDelete', () => {
    spyOn(component.delete, 'emit');

    component.onDelete();

    expect(component.delete.emit).toHaveBeenCalledWith(1);
  });

  // Test case 4: Verify the template calls the onSelect method
  it('should call onSelect method when select button is clicked', () => {
    spyOn(component, 'onSelect');

    let selectButton = fixture.debugElement.query(By.css('.select-button'));
    selectButton.triggerEventHandler('click', null);

    expect(component.onSelect).toHaveBeenCalled();
  });

  // Test case 5: Verify the template calls the onDelete method
  it('should call onDelete method when delete button is clicked', () => {
    spyOn(component, 'onDelete');

    let deleteButton = fixture.debugElement.query(By.css('.delete-button'));
    deleteButton.triggerEventHandler('click', null);

    expect(component.onDelete).toHaveBeenCalled();
  });
});
