import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'hive-user-page',
  imports: [MatButton],
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPage {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  title = 'User page... Will be later =)))';

  async signOut() {
    this.authService.logOut();
    await this.router.navigate(['/']);
  }
}
