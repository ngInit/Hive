import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAuthRepository } from '@core/providers/repository.providers';
import { SignPage } from './sign-page';

describe('SignPage', () => {
  let component: SignPage;
  let fixture: ComponentFixture<SignPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignPage],
      providers: [provideAuthRepository()],
    }).compileComponents();

    fixture = TestBed.createComponent(SignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Render sign in form', () => {
    if (fixture.nativeElement instanceof HTMLElement) {
      expect(fixture.nativeElement.querySelector('.sign-form.show-form .sign-form-title')?.textContent).toBe('Sign In');
      expect(fixture.nativeElement.querySelector('button[aria-label="Sign In button"]')?.textContent.trim()).toBe(
        'Sign In'
      );
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });

  it('Render error message', () => {
    component.errorMessage.set('Please fill in all fields');
    fixture.detectChanges();

    if (fixture.nativeElement instanceof HTMLElement) {
      expect(fixture.nativeElement.querySelector('.error-message')?.textContent).toBe('Please fill in all fields');
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });
});
