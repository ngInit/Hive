import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ErrorPage } from './error-page';

describe('ErrorPage', () => {
  let component: ErrorPage;
  let fixture: ComponentFixture<ErrorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Render error content', () => {
    if (fixture.nativeElement instanceof HTMLElement) {
      expect(fixture.nativeElement.querySelector('.error-title')?.textContent).toBe('404');
      expect(fixture.nativeElement.querySelector('.error-description')?.textContent).toBe(
        'This way is out of the Hive'
      );
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });

  it('Render home button with routerLink', () => {
    if (fixture.nativeElement instanceof HTMLElement) {
      const button = fixture.nativeElement.querySelector('button[routerLink="/"]');
      expect(button?.textContent.trim()).toBe('Go To Home Page');
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });
});
