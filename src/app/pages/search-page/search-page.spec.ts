import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideJamendoRepository } from '@core/providers/repository.providers';
import { provideRouter } from '@angular/router';
import { SearchPage } from './search-page';

describe('SearchPage', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPage],
      providers: [provideJamendoRepository(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Render search section titles', () => {
    if (fixture.nativeElement instanceof HTMLElement) {
      const titles = fixture.nativeElement.querySelectorAll('.search-title');
      expect(titles.length).toBe(3);
      expect(titles[0].textContent).toBe('Artists');
      expect(titles[1].textContent).toBe('Albums');
      expect(titles[2].textContent).toBe('Tracks');
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });

  it('Render empty search results', () => {
    if (fixture.nativeElement instanceof HTMLElement) {
      const emptyMessages = fixture.nativeElement.querySelectorAll('.search-results-empty');
      expect(emptyMessages.length).toBe(3);
      emptyMessages.forEach((element) => {
        expect(element.textContent).toBe('No results');
      });
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });

  it('Render loading state', () => {
    component.isArtistsLoading.set(true);
    fixture.detectChanges();

    if (fixture.nativeElement instanceof HTMLElement) {
      expect(fixture.nativeElement.querySelector('.search-results-loading')?.textContent).toBe('Loading...');
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });
});
