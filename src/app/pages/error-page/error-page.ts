import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'hive-error-page',
  imports: [MatButton, RouterLink, MatIcon],
  templateUrl: './error-page.html',
  styleUrl: './error-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPage {
  title = '404';
  description = 'This way is out of the Hive';
  tip = "We couldn't find it. But the Home Page is always available and ready to turn on awesome music";
}
