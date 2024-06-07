import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateService } from '../../../services/date.service';

@Component({
  selector: 'app-date-add',
  templateUrl: './date-add.component.html',
  styleUrls: ['./date-add.component.css'],
})
export class DateAddComponent {
  dateForm: FormGroup;

  constructor(private fb: FormBuilder, private dateService: DateService) {
    this.dateForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  saveDate() {
    if (this.dateForm.valid) {
      const { name, date } = this.dateForm.value;
      this.dateService.saveDate(new Date(date), name).subscribe({
        next: (response) => {
          console.log('Date saved successfully', response);
        },
        error: (error) => {
          console.error('Error saving date', error);
        },
      });
    }
  }
}
