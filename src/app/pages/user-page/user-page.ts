import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'hive-user-page',
  imports: [MatButton],
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPage {
  title = 'User page... Will be later =)))';
  private readonly router = inject(Router);

  async signOut() {
    await this.router.navigate(['/']);
  }
}
