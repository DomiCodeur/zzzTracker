import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

// Mock classes for services and router
class MockAuthService {
  login(email: string, password: string) {
    return of({
      userId: 1,
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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthenticationService;
  let userService: UserService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
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

  // Test case 2: Successful login redirects to home
  it('should navigate to home on successful login', () => {
    spyOn(router, 'navigate');
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('123456');
    component.login();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  // Test case 3: Form invalid when empty
  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  // Test case 4: Email field validity
  it('email field validity', () => {
    let email = component.loginForm.controls['email'];
    expect(email.errors?.['required']).toBeTruthy();
    email.setValue('test');
    expect(email.errors?.['email']).toBeTruthy();
  });
  // Test case 5: Display error message on login failure
  it('should display error message on login failure', () => {
    spyOn(authService, 'login').and.returnValue(
      throwError({ status: 401, message: 'Unauthorized' })
    );
    component.loginForm.controls['email'].setValue('wrong@example.com');
    component.loginForm.controls['password'].setValue('wrongpassword');
    component.login();
    fixture.detectChanges();
    expect(component.errorMessage).toContain('Unauthorized');
  });
});
