import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    private errorHandlerService: ErrorHandlerService,

    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
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
          this.errorMessage = this.errorHandlerService.handleError(error);
          console.error('Login error:', error);
        },
      });
    } else {
      this.errorMessage = 'Please fill all fields correctly.';
    }
  }
}
