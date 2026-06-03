import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'hive-header',
  imports: [RouterLink, FormsModule, MatButton, MatIconButton, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly authService = inject(AuthService);
  protected searchPlaceholder = 'Find a song and more...';
  protected searchInput = '';

  signIn(): void {
    this.authService.logIn();
  }
}
