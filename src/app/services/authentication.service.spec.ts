import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  // Configure the testing module and inject the necessary services
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService],
    });

    // Inject the service and the HttpTestingController for mocking HTTP requests
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Verify that there are no outstanding HTTP requests after each test
  afterEach(() => {
    httpMock.verify();
  });

  // Test case 1: Check if the service is created successfully
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test case 2: Check the register method
  it('should register a user', () => {
    // Mock response from the server
    const mockResponse = {
      id: '123',
      email: 'test@example.com',
      token: 'fake-token',
      userId: 1,
    };

    // Call the register method and subscribe to the result
    service
      .register('test@example.com', 'password123')
      .subscribe((response) => {
        // Check that the response matches the mock response
        expect(response).toEqual(mockResponse);
      });

    // Expect a single POST request to the correct URL
    const req = httpMock.expectOne(`${service['apiBaseUrl']}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      email: 'test@example.com',
      password: 'password123',
      signInMethod: 'email',
    });

    // Flush the mock response to the request
    req.flush(mockResponse);
  });

  // Test case 3: Check the login method
  it('should login a user', () => {
    // Mock response from the server
    const mockResponse = {
      id: '123',
      email: 'test@example.com',
      token: 'fake-token',
      userId: 1,
    };

    // Call the login method and subscribe to the result
    service.login('test@example.com', 'password123').subscribe((response) => {
      // Check that the response matches the mock response
      expect(response).toEqual(mockResponse);
    });

    // Expect a single POST request to the correct URL
    const req = httpMock.expectOne(
      `${service['apiBaseUrl']}/auth/authenticate`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      email: 'test@example.com',
      password: 'password123',
    });

    // Flush the mock response to the request
    req.flush(mockResponse);
  });
});
