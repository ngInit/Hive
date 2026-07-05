import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumCard } from './album-card';
import { albumsMock } from '@shared/mocks/albums.mock';

const album = albumsMock.results[0];

describe('AlbumCard component', () => {
  let component: AlbumCard;
  let fixture: ComponentFixture<AlbumCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('album', album);
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Render album name', () => {
    if (fixture.nativeElement instanceof HTMLElement) {
      const cardButton = fixture.nativeElement.querySelector('.album-card-button');
      expect(cardButton?.textContent.trim()).toBe(album.name);
    }
  });
});
