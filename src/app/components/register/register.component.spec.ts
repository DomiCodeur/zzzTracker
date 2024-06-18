import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Mock classes for services and router
class MockAuthService {
  register(email: string, password: string) {
    return of({
      userId: '123',
      token: 'fake-token',
    });
  }

  login(email: string, password: string) {
    return of({
      userId: '123',
      email: email,
      token: 'fake-token',
    });
  }
}

class MockUserService {
  setUser(user: any) {}
}

class MockRouter {
  navigate(path: string[]) {}
}

class MockErrorHandlerService {
  handleError(error: any) {
    return 'Registration failed';
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthenticationService;
  let userService: UserService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter },
        { provide: ErrorHandlerService, useClass: MockErrorHandlerService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  // Test case 1: Component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test case 2: Form invalid when empty
  it('form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  // Test case 3: Form valid when correctly filled
  it('form should be valid when filled correctly', () => {
    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('123456');
    expect(component.registerForm.valid).toBeTruthy();
  });

  // Test case 4: Successful registration and login
  it('should register and navigate home on successful registration and login', () => {
    spyOn(router, 'navigate');
    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('123456');
    component.register();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  // Test case 5: Registration failure
  it('should display error message on registration failure', () => {
    spyOn(authService, 'register').and.returnValue(
      throwError({ status: 400, message: 'Bad Request' })
    );
    component.registerForm.controls['email'].setValue('wrong@example.com');
    component.registerForm.controls['password'].setValue('wrongpassword');
    component.register();
    fixture.detectChanges();
    expect(component.errorMessage).toContain('Registration failed');
  });

  // Test case 6: Login after registration
  it('should call login after successful registration', () => {
    spyOn(authService, 'login').and.callThrough();
    component.registerForm.controls['email'].setValue('test@example.com');
    component.registerForm.controls['password'].setValue('123456');
    component.register();
    expect(authService.login).toHaveBeenCalledWith(
      'test@example.com',
      '123456'
    );
  });

  // Test case 7: Email field validity
  it('email field validity', () => {
    let email = component.registerForm.controls['email'];
    expect(email.errors?.['required']).toBeTruthy();
    email.setValue('test');
    expect(email.errors?.['email']).toBeTruthy();
  });

  // Test case 8: Password field validity
  it('password field validity', () => {
    let password = component.registerForm.controls['password'];
    expect(password.errors?.['required']).toBeTruthy();
    password.setValue('123');
    expect(password.errors?.['minlength']).toBeTruthy();
  });
});
