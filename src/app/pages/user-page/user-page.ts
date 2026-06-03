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
  private readonly pageTitle = String(this.route.snapshot.data['pageTitle']);
  private readonly pageId = String(this.route.snapshot.paramMap.get('id'));
  headerText = `User page... and will be later =)))`;
  subtitle = `Page title is ${this.pageTitle}`;
  idTitle = `Page id is ${this.pageId}`;

  async signOut() {
    this.authService.logOut();
    await this.router.navigate(['/']);
  }
}
