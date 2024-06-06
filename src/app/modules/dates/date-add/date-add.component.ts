import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateService } from '../../../services/date.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-date-add',
  templateUrl: './date-add.component.html',
  styleUrls: ['./date-add.component.css'],
})
export class DateAddComponent {
  dateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dateService: DateService,
    private userService: UserService
  ) {
    this.dateForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  saveDate() {
    if (this.dateForm.valid) {
      const { name, date } = this.dateForm.value;
      const user = this.userService.getUser();
      if (user) {
        const userId = user.id;
        const token = user.token;
        this.dateService
          .saveDate(userId, new Date(date), name, token)
          .subscribe({
            next: (response) => {
              console.log('Date saved successfully', response);
            },
            error: (error) => {
              console.error('Error saving date', error);
            },
          });
      } else {
        console.error('User not authenticated');
      }
    }
  }
}
