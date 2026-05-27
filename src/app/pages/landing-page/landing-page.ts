import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hive-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {
  title = 'landing-page works!';
}
