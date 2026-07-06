import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistCard } from './artist-card';
import { artistsMock } from '@shared/mocks/artists.mock';

const artist = artistsMock.results[0];

describe('ArtistCard component', () => {
  let component: ArtistCard;
  let fixture: ComponentFixture<ArtistCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('artist', artist);
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Render artist name', () => {
    if (fixture.nativeElement instanceof HTMLElement) {
      const cardButton = fixture.nativeElement.querySelector('.artist-card-button');
      expect(cardButton?.textContent.trim()).toBe(artist.name);
    }
  });
});
