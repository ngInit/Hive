import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { PlayerService } from '@core/services/player.service';
import { Player } from '@components/player/player';

@Component({
  selector: 'hive-footer',
  imports: [Player],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'hive-footer',
    '[class.footer-with-player]': 'isPlayerVisible()',
  },
})
export class Footer {
  protected readonly copyrightText = `© ${String(new Date().getFullYear())} Y2K. All Rights Reserved`;
  private readonly playerService = inject(PlayerService);
  readonly isPlayerVisible = computed(() => {
    return this.playerService.playingTrack();
  });
}
