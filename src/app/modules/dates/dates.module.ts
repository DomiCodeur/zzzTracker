import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateAddComponent } from './date-add/date-add.component';
import { DateListComponent } from './date-list/date-list.component';
import { DateItemComponent } from './date-item/date-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DateSelectedComponent } from './date-selected/date-selected.component';

@NgModule({
  declarations: [
    DateAddComponent,
    DateListComponent,
    DateItemComponent,
    DateSelectedComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    DateAddComponent,
    DateListComponent,
    DateItemComponent,
    DateSelectedComponent,
  ],
})
export class DatesModule {}
