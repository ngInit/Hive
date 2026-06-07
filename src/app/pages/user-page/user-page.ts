import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
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
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly pageTitle = String(this.route.snapshot.data['pageTitle']);
  protected readonly pageId = String(this.route.snapshot.paramMap.get('id'));

  async signOut() {
    this.authService.logOut();
    await this.router.navigate(['/']);
  }
}
