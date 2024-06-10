import { Component } from '@angular/core';
import { DateService } from '../../../services/date.service';
import { DateModel } from '../../../models/date.model';

@Component({
  selector: 'app-date-selected',
  templateUrl: './date-selected.component.html',
  styleUrls: ['./date-selected.component.css'],
})
export class DateSelectedComponent {
  selectedDate?: DateModel;

  constructor(private dateService: DateService) {
    this.dateService.selectedDate$.subscribe((date) => {
      this.selectedDate = date ?? undefined;
    });
  }
}
