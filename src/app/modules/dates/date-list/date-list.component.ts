import { Component, OnInit } from '@angular/core';
import { DateService } from '../../../services/date.service';
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
        this.dateService.fetchDatesFromAPI();
      },
      error: (error) => {
        console.error('Error deleting date:', error);
      },
    });
  }
}
