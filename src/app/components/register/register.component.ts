import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value as {
        email: string;
        password: string;
      };
      this.authService.register(email, password).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/']);
          const newUser = new User(
            response.userId,
            response.email,
            null,
            null,
            response.token
          );
          this.userService.setUser(newUser);
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('Registration error:', error);
        },
      });
    }
  }
}
