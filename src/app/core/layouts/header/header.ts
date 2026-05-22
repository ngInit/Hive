import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hive-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  appName = 'Hive';
}
