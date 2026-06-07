import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  private readonly router = inject(Router);
  protected readonly authService = inject(AuthService);
  protected searchInput = '';

  isPopupOpened = signal(false);

  signIn(): void {
    this.authService.logIn();
  }

  signOut(): void {
    this.authService.logOut();
    if (this.router.url === '/user') {
      void this.router.navigate(['/']);
    }
  }

  openPopup() {
    this.isPopupOpened.update((state) => !state);
  }
}
