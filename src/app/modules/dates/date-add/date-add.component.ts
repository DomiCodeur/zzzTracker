import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateService } from '../../../services/date.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-date-add',
  templateUrl: './date-add.component.html',
  styleUrls: ['./date-add.component.css'],
})
export class DateAddComponent implements OnInit {
  dateForm: FormGroup;
  user: User | null = null;

  constructor(
    private fb: FormBuilder,
    private dateService: DateService,
    private userService: UserService
  ) {
    this.dateForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  saveDate() {
    if (this.dateForm.valid && this.user) {
      const { title, date } = this.dateForm.value;
      const userId = this.user.id;
      const token = this.user.token;

      if (token) {
        this.dateService
          .saveDate(userId as number, title, new Date(date), token)
          .subscribe({
            next: (response) => {
              console.log('Date saved successfully', response);
            },
            error: (error) => {
              console.error('Error saving date', error);
            },
          });
      } else {
        console.error('User token is missing');
      }
    } else {
      console.error('User is not authenticated or form is invalid');
    }
  }
}
