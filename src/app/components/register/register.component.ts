import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

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
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.authService.register(email, password).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.loginAfterRegister(email, password);
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.errorMessage = this.errorHandlerService.handleError(error);
        },
      });
    } else {
      this.errorMessage =
        'Please fill all required fields with valid information.';
    }
  }

  private loginAfterRegister(email: string, password: string) {
    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/']);
        const newUser = new User(
          response.userId,
          email,
          null,
          null,
          response.token
        );
        this.userService.setUser(newUser);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = this.errorHandlerService.handleError(error);
      },
    });
  }
}
