import { Injectable } from '@angular/core';
import { DateService } from '../modules/dates/services/date.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();

  constructor(private dateService: DateService) {}

  generateCalendar(year: number): any[] {
    const months = [
      { name: 'January', days: 31 },
      { name: 'February', days: year % 4 === 0 ? 29 : 28 },
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

    const calendar = months
      .slice(this.currentMonth, this.currentMonth + 2)
      .map((month) => {
        const days = [];
        for (let i = 1; i <= month.days; i++) {
          days.push({ day: i, events: [] });
        }
        return { month: month.name, days };
      });

    return calendar;
  }

  getCalendarWithEvents(): Observable<any[]> {
    return this.dateService.getDates().pipe(
      map((events) => {
        const calendar = this.generateCalendar(this.currentYear);
        events.forEach((event) => {
          const eventDate = new Date(event.date);
          if (eventDate.getFullYear() === this.currentYear) {
            const monthIndex = eventDate.getMonth() - this.currentMonth;
            if (monthIndex >= 0 && monthIndex < calendar.length) {
              const day = calendar[monthIndex].days[eventDate.getDate() - 1];
              if (day) {
                day.events.push(event);
              }
            }
          }
        });
        return calendar;
      })
    );
  }

  // Ajoutez les méthodes pour avancer ou reculer le calendrier ici
}
