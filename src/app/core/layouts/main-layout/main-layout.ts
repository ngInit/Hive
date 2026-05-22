import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hive-main-layout',
  imports: [],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {
  title = 'main-layout works!';
}
