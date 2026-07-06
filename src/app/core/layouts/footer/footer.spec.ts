import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';
import { Track } from '@core/models/jamendo/tracks.model';
import { tracksMock } from '@shared/mocks/tracks.mock';
import { Component } from '@angular/core';
import { PlayerService } from '@core/services/player.service';

@Component({ selector: 'hive-player', template: '', standalone: true })
class MockPlayer {}

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;
  let playerService: PlayerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
    })
      .overrideComponent(Footer, { set: { imports: [MockPlayer] } })
      .compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    playerService = TestBed.inject(PlayerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Show player if it has a track', () => {
    const track: Track = tracksMock.results[0];

    playerService.playCollection([track]);
    fixture.detectChanges();

    playerService.pauseTrack();
    fixture.detectChanges();

    if (fixture.nativeElement instanceof HTMLElement) {
      expect(fixture.nativeElement.querySelector('hive-player')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.footer-copyright')).toBeNull();
    } else {
      throw new Error('Expected nativeElement to be HTMLElement');
    }
  });
});
