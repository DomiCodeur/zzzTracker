import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  public handleError(error: any): string {
    let message = 'An unexpected error occurred. Please try again later.';
    switch (error.status) {
      case 400:
        message = 'Please check your input and try again.';
        break;
      case 401:
        message = 'You are not authorized. Please login again.';
        break;
      case 403:
        message =
          'Access denied. You do not have permission to perform this action.';
        break;
      case 404:
        message = 'This user was not found.';
        break;
      case 409:
        message =
          'This email is already registered. Try logging in or use a different email.';
        break;
      case 500:
        message =
          'We are experiencing some problems on our server. Please try again later.';
        break;
      default:
        console.error('Error:', error);
    }
    return message;
  }
}
