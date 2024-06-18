import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date.service';
import { DateModel } from '../../../models/date.model';

@Component({
  selector: 'app-date-list',
  templateUrl: './date-list.component.html',
  styleUrls: ['./date-list.component.css'],
})
export class DateListComponent implements OnInit {
  dates: DateModel[] = [];

  constructor(private dateService: DateService) {}

  ngOnInit() {
    this.dateService.dates$.subscribe((dates) => {
      this.dates = dates;
    });
    this.dateService.fetchDatesFromAPI();
  }

  onSelectDate(dateId: number): void {
    this.dateService.setSelectedDate(dateId);
  }

  onDeleteDate(dateId: number): void {
    this.dateService.deleteDate(dateId).subscribe({
      next: () => {
        console.log('Date deleted');
      },
      error: (error) => {
        console.error('Error deleting date:', error);
      },
    });
  }

  moveDateUp(dateId: number): void {
    const index = this.dates.findIndex((date) => date.id === dateId);
    if (index > 0) {
      const [removed] = this.dates.splice(index, 1);
      this.dates.splice(index - 1, 0, removed);
      this.dateService.setSelectedDate(dateId);
    }
  }

  moveDateDown(dateId: number): void {
    const index = this.dates.findIndex((date) => date.id === dateId);
    if (index < this.dates.length - 1) {
      const [removed] = this.dates.splice(index, 1);
      this.dates.splice(index + 1, 0, removed);
      this.dateService.setSelectedDate(dateId);
    }
  }
}
