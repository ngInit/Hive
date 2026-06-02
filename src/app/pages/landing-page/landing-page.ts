import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TagsPanel } from '@components/tags-panel/tags-panel';
import { Carousel } from '@components/carousel/carousel';

@Component({
  selector: 'hive-landing-page',
  imports: [TagsPanel, Carousel],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {
  title = 'landing-page works!';
}
