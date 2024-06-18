import { DaysUntilPipe } from './days-until.pipe';

describe('DaysUntilPipe', () => {
  let pipe: DaysUntilPipe;

  // Instantiate the pipe before each test
  beforeEach(() => {
    pipe = new DaysUntilPipe();
  });

  // Test case 1: Create the pipe instance
  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  // Test case 2: Verify the transform method with a future date
  it('should calculate the correct number of days until a future date', () => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 10); // 10 days from now

    const result = pipe.transform(futureDate);
    expect(result).toBe(10);
  });

  // Test case 3: Verify the transform method with a past date
  it('should calculate the correct number of days until a past date', () => {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - 5); // 5 days ago

    const result = pipe.transform(pastDate);
    expect(result).toBe(-5);
  });

  // Test case 4: Verify the transform method with today's date
  it('should return 0 days when the target date is today', () => {
    const today = new Date();

    const result = pipe.transform(today);
    expect(result).toBe(0);
  });
});
