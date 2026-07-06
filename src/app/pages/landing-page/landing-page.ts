import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TagsPanel } from '@components/tags-panel/tags-panel';

@Component({
  selector: 'hive-landing-page',
  imports: [RouterOutlet, TagsPanel],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {}
