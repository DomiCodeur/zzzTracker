import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

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
      const { email, password } = this.registerForm.value;
      this.authService.register(email, password).subscribe({
        next: (response) => {
          console.log('Registration successful', response);

          this.authService.login(email, password).subscribe({
            next: (loginResponse) => {
              console.log('Login successful', loginResponse);
              this.router.navigate(['/']);
              const newUser = new User(
                loginResponse.userId,
                email,
                null,
                null,
                loginResponse.token
              );
              this.userService.setUser(newUser);
            },
            error: (loginError) => {
              console.error('Login error:', loginError);
              this.errorMessage = loginError.message;
            },
          });
        },
        error: (registerError) => {
          console.error('Registration error:', registerError);
          this.errorMessage = registerError.message;
        },
      });
    }
  }
}
