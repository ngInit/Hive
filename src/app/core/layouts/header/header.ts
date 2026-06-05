import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '@core/services/auth.service';
import { Popup } from '@components/popup/popup';

@Component({
  selector: 'hive-header',
  imports: [RouterLink, FormsModule, MatButton, MatIconButton, MatIcon, Popup],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly authService = inject(AuthService);
  protected searchPlaceholder = 'Find a song and more...';
  protected searchInput = '';

  isPopupOpened = signal(false);

  signIn(): void {
    this.authService.logIn();
  }
  openPopup() {
    this.isPopupOpened.update((state) => !state);
  }
}
