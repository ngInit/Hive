import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@core/layouts/header/header';
import { Footer } from '@core/layouts/footer/footer';

@Component({
  selector: 'hive-sign-layout',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './sign-layout.html',
  styleUrl: './sign-layout.scss',
})
export class SignLayout {}
