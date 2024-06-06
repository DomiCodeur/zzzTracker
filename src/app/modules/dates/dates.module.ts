import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAddComponent } from './date-add/date-add.component';
import { DateListComponent } from './date-list/date-list.component';
import { DateItemComponent } from './date-item/date-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DateAddComponent, DateListComponent, DateItemComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [DateAddComponent, DateListComponent, DateItemComponent],
})
export class DatesModule {}
