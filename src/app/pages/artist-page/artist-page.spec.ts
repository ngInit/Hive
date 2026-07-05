import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideJamendoRepository } from '@core/providers/repository.providers';
import { provideRouter } from '@angular/router';
import { ArtistPage } from './artist-page';
import { artistsMock } from '@shared/mocks/artists.mock';

const artist = artistsMock.results[0];

describe('ArtistPage', () => {
  let component: ArtistPage;
  let fixture: ComponentFixture<ArtistPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistPage],
      providers: [provideJamendoRepository(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Render artist content', () => {
    component.artist.set(artist);
    fixture.detectChanges();

    if (fixture.nativeElement instanceof HTMLElement) {
      expect(fixture.nativeElement.querySelector('.title-name')?.textContent).toBe(artist.name);
      expect(fixture.nativeElement.querySelector('.artist-information')?.textContent).toContain(
        `Joined date: ${artist.joindate}`
      );
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });

  it('Render artist links', () => {
    component.artist.set(artist);
    fixture.detectChanges();

    if (fixture.nativeElement instanceof HTMLElement) {
      const links = fixture.nativeElement.querySelectorAll('.artist-information a');
      expect(links[0].textContent.trim()).toBe('Official webpage');
      expect(links[0].getAttribute('href')).toBe(artist.website);
      expect(links[1].textContent.trim()).toBe('Jamendo webpage');
      expect(links[1].getAttribute('href')).toBe(artist.shareurl);
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });

  it('Render error message', () => {
    component.errorMessage.set(`Can't load this artist. Please try again later.`);
    fixture.detectChanges();

    if (fixture.nativeElement instanceof HTMLElement) {
      expect(fixture.nativeElement.querySelector('.artist-page-error')?.textContent).toBe(
        `Can't load this artist. Please try again later.`
      );
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });
});
