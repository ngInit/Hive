import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from '@core/layouts/header/header';
import { RouterOutlet } from '@angular/router';
import { Footer } from '@core/layouts/footer/footer';

@Component({
  selector: 'hive-main-layout',
  imports: [Header, RouterOutlet, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {}
