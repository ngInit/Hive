import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Popup } from './popup';

describe('Popup', () => {
  let component: Popup;
  let fixture: ComponentFixture<Popup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Popup],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Popup);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('userStatus', false);
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Render guest menu items', () => {
    fixture.componentRef.setInput('userStatus', false);
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    if (fixture.nativeElement instanceof HTMLElement) {
      const items = fixture.nativeElement.querySelectorAll('.popup-list-item');
      expect(items[0].textContent.trim()).toBe('About');
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });

  it('Render user menu items', () => {
    fixture.componentRef.setInput('userStatus', true);
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    if (fixture.nativeElement instanceof HTMLElement) {
      const items = fixture.nativeElement.querySelectorAll('.popup-list-item');
      expect(items[0].textContent.trim()).toBe('Profile');
      expect(items[1].textContent.trim()).toBe('About');
      expect(items[2].textContent.trim()).toBe('Sign out');
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });
});
