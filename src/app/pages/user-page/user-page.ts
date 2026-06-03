import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hive-user-page',
  imports: [],
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPage {
  title = 'user-page works!';
}
