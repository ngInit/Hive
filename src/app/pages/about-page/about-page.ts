import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hive-about-page',
  imports: [],
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage {
  title = 'about-page works!';
}
