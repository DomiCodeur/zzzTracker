import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date.service';
import { DateModel } from '../../../models/date.model';

@Component({
  selector: 'app-date-selected',
  templateUrl: './date-selected.component.html',
  styleUrls: ['./date-selected.component.css'],
})
export class DateSelectedComponent implements OnInit {
  selectedDate?: DateModel;

  constructor(private dateService: DateService) {}

  ngOnInit() {
    this.dateService.selectedDate$.subscribe((date) => {
      this.selectedDate = date ?? undefined;
    });

    this.dateService.dates$.subscribe((dates) => {
      if (!this.selectedDate && dates.length) {
        this.selectClosestDate(dates);
      }
    });
  }

  private selectClosestDate(dates: DateModel[]): void {
    const now = new Date();
    const closestDate = dates.reduce((prev, curr) =>
      Math.abs(curr.date.getTime() - now.getTime()) <
      Math.abs(prev.date.getTime() - now.getTime())
        ? curr
        : prev
    );
    this.dateService.setSelectedDate(closestDate.id);
  }
}
