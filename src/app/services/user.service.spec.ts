import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;

  // Configure the testing module and inject the service
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
    });

    // Inject the service
    service = TestBed.inject(UserService);
  });

  // Test case 1: Check if the service is created successfully
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test case 2: Set user and verify the userSubject value
  it('should set the user', () => {
    const mockUser: User = new User(
      1,
      'test@example.com',
      'days',
      'dark',
      'fake-token'
    );

    service.setUser(mockUser);

    // Subscribe to the user$ observable to get the latest value
    service.user$.subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    // Verify the value of userSubject directly
    expect(service.getUser()).toEqual(mockUser);
  });

  // Test case 3: Sign out user and verify the userSubject value
  it('should sign out the user', () => {
    const mockUser: User = new User(
      1,
      'test@example.com',
      'days',
      'dark',
      'fake-token'
    );

    service.setUser(mockUser);
    service.signOut();

    // Subscribe to the user$ observable to get the latest value
    service.user$.subscribe((user) => {
      expect(user).toBeNull();
    });

    // Verify the value of userSubject directly
    expect(service.getUser()).toBeNull();
  });

  // Test case 4: Get user when no user is set
  it('should return null when no user is set', () => {
    expect(service.getUser()).toBeNull();
  });
});
