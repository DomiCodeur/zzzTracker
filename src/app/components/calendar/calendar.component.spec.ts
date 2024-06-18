import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';
import { CalendarService } from '../../services/calendar.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock class for CalendarService
class MockCalendarService {
  getCalendarWithEvents() {
    return of([
      { day: 1, events: ['Event 1'] },
      { day: 2, events: [] },
      { day: 3, events: ['Event 2', 'Event 3'] },
    ]);
  }
}

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let calendarService: CalendarService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: CalendarService, useClass: MockCalendarService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    calendarService = TestBed.inject(CalendarService);
    fixture.detectChanges();
  });

  // Test case 1: Component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test case 2: Initial calendar load on ngOnInit
  it('should load calendar with events on initialization', () => {
    spyOn(calendarService, 'getCalendarWithEvents').and.callThrough();
    component.ngOnInit();
    expect(calendarService.getCalendarWithEvents).toHaveBeenCalled();
    expect(component.calendar.length).toBe(3);
    expect(component.calendar[0].events.length).toBe(1);
    expect(component.calendar[1].events.length).toBe(0);
    expect(component.calendar[2].events.length).toBe(2);
  });

  // Test case 3: getDayClass method
  it('should return correct class for day with events', () => {
    const dayIndex = 2;
    const eventCount = 2;
    const dayClass = component.getDayClass(dayIndex, eventCount);
    expect(dayClass).toBe('color3');
  });

  it('should return empty string for day without events', () => {
    const dayIndex = 1;
    const eventCount = 0;
    const dayClass = component.getDayClass(dayIndex, eventCount);
    expect(dayClass).toBe('');
  });
});
