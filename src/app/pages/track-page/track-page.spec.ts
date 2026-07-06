import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideJamendoRepository } from '@core/providers/repository.providers';
import { provideRouter } from '@angular/router';
import { TrackPage } from './track-page';
import { tracksMock } from '@shared/mocks/tracks.mock';

const track = tracksMock.results[0];

describe('TrackPage', () => {
  let component: TrackPage;
  let fixture: ComponentFixture<TrackPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackPage],
      providers: [provideJamendoRepository(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Render track information', () => {
    component.track.set(track);
    fixture.detectChanges();

    if (fixture.nativeElement instanceof HTMLElement) {
      const links = fixture.nativeElement.querySelectorAll('.release-information p');
      expect(links[0].textContent.trim()).toBe(`Released: ${track.releasedate}`);
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });

  it('Render error message', () => {
    component.errorMessage.set(`Can't load this artist. Please try again later.`);
    fixture.detectChanges();

    if (fixture.nativeElement instanceof HTMLElement) {
      expect(fixture.nativeElement.querySelector('.track-page-error')?.textContent).toBe(
        `Can't load this artist. Please try again later.`
      );
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });
});
