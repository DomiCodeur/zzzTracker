import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateService } from '../../../services/date.service';
import { DateModel } from '../../../models/date.model';

@Component({
  selector: 'date-selected',
  templateUrl: './date-selected.component.html',
  styleUrls: ['./date-selected.component.css'],
})
export class DateSelectedComponent implements OnDestroy {
  selectedDate?: DateModel;
  private subscription: Subscription;

  constructor(private dateService: DateService) {
    this.subscription = this.dateService.selectedDate$.subscribe((date) => {
      this.selectedDate = date;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
