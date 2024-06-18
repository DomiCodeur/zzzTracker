import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DateListComponent } from './date-list.component';
import { DateService } from '../services/date.service';
import { of, throwError } from 'rxjs';
import { DateModel } from '../../../models/date.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock class for DateService
class MockDateService {
  dates$ = of([
    new DateModel(1, 'Test Event 1', new Date('2023-12-31')),
    new DateModel(2, 'Test Event 2', new Date('2024-01-01')),
  ]);

  fetchDatesFromAPI() {}

  setSelectedDate(dateId: number) {}

  deleteDate(dateId: number) {
    return of({ success: true });
  }
}

describe('DateListComponent', () => {
  let component: DateListComponent;
  let fixture: ComponentFixture<DateListComponent>;
  let dateService: DateService;

  // Configure the testing module and inject the necessary services
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DateListComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: DateService, useClass: MockDateService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateListComponent);
    component = fixture.componentInstance;
    dateService = TestBed.inject(DateService);
    fixture.detectChanges();
  });

  // Test case 1: Check if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test case 2: Verify the initial load of dates
  it('should load dates on initialization', () => {
    expect(component.dates.length).toBe(2);
    expect(component.dates[0].name).toBe('Test Event 1');
    expect(component.dates[1].name).toBe('Test Event 2');
  });

  // Test case 3: Verify the onSelectDate method
  it('should call setSelectedDate with the correct id on onSelectDate', () => {
    spyOn(dateService, 'setSelectedDate');

    component.onSelectDate(1);

    expect(dateService.setSelectedDate).toHaveBeenCalledWith(1);
  });

  // Test case 4: Verify the onDeleteDate method
  it('should call deleteDate and fetchDatesFromAPI on onDeleteDate', () => {
    spyOn(dateService, 'deleteDate').and.callThrough();
    spyOn(dateService, 'fetchDatesFromAPI');
    spyOn(console, 'log');

    component.onDeleteDate(1);

    expect(dateService.deleteDate).toHaveBeenCalledWith(1);
    expect(dateService.fetchDatesFromAPI).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Date deleted');
  });

  // Test case 5: Handle error when deleting a date
  it('should handle error when deleting a date', () => {
    spyOn(dateService, 'deleteDate').and.returnValue(
      throwError({ status: 500, message: 'Internal Server Error' })
    );
    spyOn(console, 'error');

    component.onDeleteDate(1);

    expect(dateService.deleteDate).toHaveBeenCalledWith(1);
    expect(console.error).toHaveBeenCalledWith('Error deleting date:', {
      status: 500,
      message: 'Internal Server Error',
    });
  });

  // Test case 6: Verify moveDateUp method
  it('should move date up in the list', () => {
    component.moveDateUp(2);
    expect(component.dates[0].id).toBe(2);
    expect(component.dates[1].id).toBe(1);
  });

  // Test case 7: Verify moveDateDown method
  it('should move date down in the list', () => {
    component.moveDateDown(1);
    expect(component.dates[0].id).toBe(2);
    expect(component.dates[1].id).toBe(1);
  });
});
