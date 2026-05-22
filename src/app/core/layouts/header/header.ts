import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'hive-header',
  imports: [RouterLink, FormsModule, MatButton, MatIconButton, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  readonly isAuthorized = input.required<boolean>();
  protected searchPlaceholder = 'Find a song and more...';
  protected searchInput = '';
}
