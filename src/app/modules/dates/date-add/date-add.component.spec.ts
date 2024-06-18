import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DateAddComponent } from './date-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DateService } from '../services/date.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock class for DateService
class MockDateService {
  saveDate(date: Date, name: string) {
    return of({ success: true });
  }
}

describe('DateAddComponent', () => {
  let component: DateAddComponent;
  let fixture: ComponentFixture<DateAddComponent>;
  let dateService: DateService;

  // Configure the testing module and inject the necessary services
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DateAddComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [{ provide: DateService, useClass: MockDateService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateAddComponent);
    component = fixture.componentInstance;
    dateService = TestBed.inject(DateService);
    fixture.detectChanges();
  });

  // Test case 1: Check if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test case 2: Form invalid when empty
  it('form should be invalid when empty', () => {
    expect(component.dateForm.valid).toBeFalsy();
  });

  // Test case 3: Form valid when correctly filled
  it('form should be valid when filled correctly', () => {
    component.dateForm.controls['name'].setValue('Event Name');
    component.dateForm.controls['date'].setValue('2023-12-31');
    expect(component.dateForm.valid).toBeTruthy();
  });

  // Test case 4: Successful date save
  it('should save the date successfully', () => {
    spyOn(dateService, 'saveDate').and.callThrough();
    spyOn(console, 'log');

    component.dateForm.controls['name'].setValue('Event Name');
    component.dateForm.controls['date'].setValue('2023-12-31');
    component.saveDate();

    expect(dateService.saveDate).toHaveBeenCalledWith(
      new Date('2023-12-31'),
      'Event Name'
    );
    expect(console.log).toHaveBeenCalledWith('Date saved successfully', {
      success: true,
    });
  });

  // Test case 5: Handle error when saving date
  it('should handle error when saving date', () => {
    spyOn(dateService, 'saveDate').and.returnValue(
      throwError({ status: 500, message: 'Internal Server Error' })
    );
    spyOn(console, 'error');

    component.dateForm.controls['name'].setValue('Event Name');
    component.dateForm.controls['date'].setValue('2023-12-31');
    component.saveDate();

    expect(dateService.saveDate).toHaveBeenCalledWith(
      new Date('2023-12-31'),
      'Event Name'
    );
    expect(console.error).toHaveBeenCalledWith('Error saving date', {
      status: 500,
      message: 'Internal Server Error',
    });
  });
});
