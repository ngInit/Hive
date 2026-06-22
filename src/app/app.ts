import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainLayout } from '@core/layouts/main-layout/main-layout';

@Component({
  selector: 'hive-root',
  imports: [MainLayout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
