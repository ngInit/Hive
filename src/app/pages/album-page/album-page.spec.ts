import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideJamendoRepository } from '@core/providers/repository.providers';
import { provideRouter } from '@angular/router';
import { AlbumPage } from './album-page';
import { albumsMock } from '@shared/mocks/albums.mock';

const album = albumsMock.results[0];

describe('AlbumPage', () => {
  let component: AlbumPage;
  let fixture: ComponentFixture<AlbumPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumPage],
      providers: [provideJamendoRepository(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Render artist content', () => {
    component.album.set(album);
    fixture.detectChanges();

    if (fixture.nativeElement instanceof HTMLElement) {
      expect(fixture.nativeElement.querySelector('.title-name')?.textContent).toBe(album.name);
      expect(fixture.nativeElement.querySelector('.album-information p')?.textContent).toContain(
        `Release date: ${album.releasedate}`
      );
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });

  it('Render artist links', () => {
    component.album.set(album);
    fixture.detectChanges();

    if (fixture.nativeElement instanceof HTMLElement) {
      const links = fixture.nativeElement.querySelectorAll('.album-information a');
      expect(links[0].textContent.trim()).toBe('Jamendo webpage');
      expect(links[0].getAttribute('href')).toBe(album.shareurl);
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });

  it('Render error message', () => {
    component.errorMessage.set(`Can't load this album. Please try again later.`);
    fixture.detectChanges();

    if (fixture.nativeElement instanceof HTMLElement) {
      expect(fixture.nativeElement.querySelector('.album-page-error')?.textContent).toBe(
        `Can't load this album. Please try again later.`
      );
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });
});
