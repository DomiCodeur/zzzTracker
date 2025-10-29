import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'daysUntil',
    standalone: false
})
export class DaysUntilPipe implements PipeTransform {
  transform(value: Date): number {
    const today = new Date();
    const targetDate = new Date(value);
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
