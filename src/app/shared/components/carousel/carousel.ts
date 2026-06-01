import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hive-carousel',
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carousel {
  title = 'carousel works!';
}
