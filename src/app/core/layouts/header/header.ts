import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, isActive } from '@angular/router';
import { FirebaseService } from '@core/services/firebase.service';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
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
  protected readonly firebaseService = inject(FirebaseService);
  protected searchInput = '';
  readonly isSign = isActive('/sign', this.router);

  isPopupOpened = signal(false);

  async signOut(): Promise<void> {
    await this.firebaseService.signOut();
    if (this.router.url === '/user') {
      await this.router.navigate(['/']);
    }
  }

  openPopup() {
    this.isPopupOpened.update((state) => !state);
  }
}
