import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  calendar: any[] = [];
  currentMonths: any[] = [];
  public currentIndex = 0;
  private colorClasses = ['color1', 'color2', 'color3', 'color4', 'color5'];

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarService.getCalendarWithEvents().subscribe((calendar) => {
      this.calendar = calendar;
      console.log('Calendar Loaded:', this.calendar); // Vérifie les données chargées

      this.updateCurrentMonths();
    });
  }

  updateCurrentMonths() {
    this.currentMonths = this.calendar.slice(
      this.currentIndex,
      this.currentIndex + 2
    );
  }

  changeMonth(step: number) {
    this.currentIndex += step;
    this.currentIndex = Math.max(
      0,
      Math.min(this.currentIndex, this.calendar.length - 2)
    );
    console.log('Current Index:', this.currentIndex); // Vérifie la valeur de currentIndex après changement

    this.updateCurrentMonths();
  }

  getDayClass(dayIndex: number, eventCount: number): string {
    if (eventCount > 0) {
      return this.colorClasses[dayIndex % this.colorClasses.length];
    }
    return '';
  }

  canNavigateBack(): boolean {
    return this.currentIndex > 0;
  }

  canNavigateForward(): boolean {
    return this.currentIndex < this.calendar.length - 2;
  }
}
