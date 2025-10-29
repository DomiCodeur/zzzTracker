import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DateSelectedComponent } from './date-selected.component';
import { DateService } from '../services/date.service';
import { of, BehaviorSubject } from 'rxjs';
import { DateModel } from '../../../models/date.model';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// Mock class for DateService
class MockDateService {
  private selectedDateSubject = new BehaviorSubject<DateModel | null>(
    new DateModel(1, 'Test Event 1', new Date('2023-12-31'))
  );
  selectedDate$ = this.selectedDateSubject.asObservable();
  private datesSubject = new BehaviorSubject<DateModel[]>([
    new DateModel(1, 'Test Event 1', new Date('2023-12-31')),
    new DateModel(2, 'Test Event 2', new Date('2024-01-01')),
  ]);
  dates$ = this.datesSubject.asObservable();

  fetchDatesFromAPI() {}

  setSelectedDate(dateId: number) {
    const date = this.datesSubject.value.find((d) => d.id === dateId);
    this.selectedDateSubject.next(date || null);
  }
}

describe('DateSelectedComponent', () => {
  let component: DateSelectedComponent;
  let fixture: ComponentFixture<DateSelectedComponent>;
  let dateService: DateService;

  // Configure the testing module and inject the necessary services
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [DateSelectedComponent],
    imports: [],
    providers: [{ provide: DateService, useClass: MockDateService }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSelectedComponent);
    component = fixture.componentInstance;
    dateService = TestBed.inject(DateService);
    fixture.detectChanges();
  });

  // Test case 1: Check if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test case 2: Verify the initial selected date
  it('should set the initial selected date', () => {
    expect(component.selectedDate).toBeTruthy();
    expect(component.selectedDate?.id).toBe(1);
  });

  // Test case 3: Select closest date if no date is selected initially
  it('should select the closest date if no date is selected initially', () => {
    // Update selectedDateSubject to emit null to simulate no initial selection
    (dateService as any).selectedDateSubject.next(null);
    spyOn(dateService, 'setSelectedDate').and.callThrough();

    component.ngOnInit();

    expect(dateService.setSelectedDate).toHaveBeenCalledWith(1); // Closest date to now
  });

  // Test case 4: Verify the selectClosestDate method
  it('should select the closest date from a list', () => {
    const dates = [
      new DateModel(1, 'Past Event', new Date('2022-12-31')),
      new DateModel(2, 'Future Event', new Date('2024-01-01')),
    ];

    spyOn(dateService, 'setSelectedDate');

    component['selectClosestDate'](dates);

    // Verify that the closest date (the future event in this case) is selected
    expect(dateService.setSelectedDate).toHaveBeenCalledWith(2);
  });
});
