import { Injectable } from '@angular/core';
import { DateService } from '../modules/dates/services/date.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private currentDate = new Date();
  private currentYear = this.currentDate.getFullYear();
  private currentMonth = this.currentDate.getMonth();

  constructor(private dateService: DateService) {}

  generateCalendar(): any[] {
    const months = [
      { name: 'January', days: 31 },
      { name: 'February', days: this.currentYear % 4 === 0 ? 29 : 28 },
      { name: 'March', days: 31 },
      { name: 'April', days: 30 },
      { name: 'May', days: 31 },
      { name: 'June', days: 30 },
      { name: 'July', days: 31 },
      { name: 'August', days: 31 },
      { name: 'September', days: 30 },
      { name: 'October', days: 31 },
      { name: 'November', days: 30 },
      { name: 'December', days: 31 },
    ];

    // Generate calendar for one year starting from the current month
    let calendar = [];
    for (let m = 0; m < 12; m++) {
      const monthIndex = (this.currentMonth + m) % 12;
      const yearOffset = Math.floor((this.currentMonth + m) / 12);
      const daysInMonth = months[monthIndex].days;
      const monthDays = [];
      for (let d = 1; d <= daysInMonth; d++) {
        monthDays.push({ day: d, events: [] });
      }
      calendar.push({
        month: months[monthIndex].name + ' ' + (this.currentYear + yearOffset),
        days: monthDays,
      });
    }
    return calendar;
  }

  getCalendarWithEvents(): Observable<any[]> {
    return this.dateService.getDates().pipe(
      map((events) => {
        const calendar = this.generateCalendar();
        events.forEach((event) => {
          const eventDate = new Date(event.date);
          const eventYear = eventDate.getFullYear();
          const eventMonth = eventDate.getMonth();
          const eventDay = eventDate.getDate();
          const calendarIndex =
            (eventYear - this.currentYear) * 12 +
            (eventMonth - this.currentMonth);
          if (calendarIndex >= 0 && calendarIndex < calendar.length) {
            const dayIndex = eventDay - 1;
            const day = calendar[calendarIndex].days[dayIndex];
            if (day) {
              day.events.push(event);
              console.log('Event added:', event, 'to day:', day);
            }
          } else {
            console.log(
              'Event not added:',
              event,
              'Index out of bounds:',
              calendarIndex
            );
          }
        });
        return calendar;
      })
    );
  }
}
