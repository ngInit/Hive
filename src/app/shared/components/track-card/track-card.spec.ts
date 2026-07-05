import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerService } from '@core/services/player.service';
import { tracksMock } from '@shared/mocks/tracks.mock';
import { TrackCard } from './track-card';

describe('TrackCard component', () => {
  let component: TrackCard;
  let fixture: ComponentFixture<TrackCard>;
  let playerService: PlayerService;
  const track = tracksMock.results[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackCard);
    playerService = TestBed.inject(PlayerService);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('track', track);
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Show play icon when track is not playing', () => {
    if (fixture.nativeElement instanceof HTMLElement) {
      const icon = fixture.nativeElement.querySelector('.track-card-icon');
      expect(icon?.textContent.trim()).toBe('play_circle_outline');
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });

  it('Show pause icon when track is playing', () => {
    playerService.playCollection([track]);
    fixture.detectChanges();

    if (fixture.nativeElement instanceof HTMLElement) {
      const icon = fixture.nativeElement.querySelector('.track-card-icon');
      expect(icon?.textContent.trim()).toBe('pause_circle_outline');
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });
});
