import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hive-popup',
  imports: [],
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Popup {
  title = 'popup works!';
}
