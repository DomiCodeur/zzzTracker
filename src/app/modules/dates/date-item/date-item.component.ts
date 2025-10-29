import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DateModel } from '../../../models/date.model';

@Component({
    selector: 'app-date-item',
    templateUrl: './date-item.component.html',
    styleUrls: ['./date-item.component.css'],
    standalone: false
})
export class DateItemComponent {
  @Input()
  date!: DateModel;
  @Output() select = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onSelect(): void {
    this.select.emit(this.date.id);
  }

  onDelete(): void {
    this.delete.emit(this.date.id);
  }
}
