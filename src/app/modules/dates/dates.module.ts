import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAddComponent } from './date-add/date-add.component';
import { DateListComponent } from './date-list/date-list.component';
import { DateItemComponent } from './date-item/date-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DateSelectedComponent } from './date-selected/date-selected.component';
import { DaysUntilPipe } from './pipes/days-until.pipe';
import { DateService } from './services/date.service';

@NgModule({
  declarations: [
    DateAddComponent,
    DateListComponent,
    DateItemComponent,
    DateSelectedComponent,
    DaysUntilPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DateService],
  exports: [
    DateAddComponent,
    DateListComponent,
    DateItemComponent,
    DateSelectedComponent,
  ],
})
export class DatesModule {}
