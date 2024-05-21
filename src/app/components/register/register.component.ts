import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  errorMessage = '';

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {}

  register() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value as {
        email: string;
        password: string;
      };
      this.authService.register(email, password).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('Registration error:', error);
        },
      });
    }
  }
}
