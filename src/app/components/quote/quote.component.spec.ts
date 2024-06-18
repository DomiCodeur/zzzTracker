import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { QuoteComponent } from './quote.component';
import { QuoteService } from '../../services/quote.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock class for QuoteService
class MockQuoteService {
  getRandomQuote(lang: string) {
    return of({
      content: 'Test Quote',
      author: 'Test Author',
    });
  }
}

describe('QuoteComponent', () => {
  let component: QuoteComponent;
  let fixture: ComponentFixture<QuoteComponent>;
  let quoteService: QuoteService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: QuoteService, useClass: MockQuoteService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteComponent);
    component = fixture.componentInstance;
    quoteService = TestBed.inject(QuoteService);
    fixture.detectChanges();
  });

  // Test case 1: Component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test case 2: Initial quote load on ngOnInit
  it('should load a quote on initialization', () => {
    spyOn(quoteService, 'getRandomQuote').and.callThrough();
    component.ngOnInit();
    expect(quoteService.getRandomQuote).toHaveBeenCalledWith('fr');
    expect(component.quote).toBe('Test Quote');
    expect(component.author).toBe('Test Author');
  });

  // Test case 3: Load random quote with specific language
  it('should load a random quote in the specified language', () => {
    spyOn(quoteService, 'getRandomQuote').and.callThrough();
    component.loadRandomQuote('en');
    expect(quoteService.getRandomQuote).toHaveBeenCalledWith('en');
    expect(component.quote).toBe('Test Quote');
    expect(component.author).toBe('Test Author');
  });
});
