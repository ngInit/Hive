import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hive-error-page',
  imports: [],
  templateUrl: './error-page.html',
  styleUrl: './error-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPage {
  title = 'error-page works!';
}
