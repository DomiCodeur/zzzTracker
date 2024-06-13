import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  calendar: any[] = [];
  private colorClasses = ['color1', 'color2', 'color3', 'color4', 'color5'];

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarService.getCalendarWithEvents().subscribe((calendar) => {
      this.calendar = calendar;
    });
  }

  getDayClass(dayIndex: number, eventCount: number): string {
    if (eventCount > 0) {
      return this.colorClasses[dayIndex % this.colorClasses.length];
    }
    return '';
  }
}
