import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '@core/services/firebase.service';

@Component({
  selector: 'hive-user-page',
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPage {
  private readonly authService = inject(FirebaseService);
  private readonly route = inject(ActivatedRoute);
  protected readonly pageTitle = String(this.route.snapshot.data['pageTitle']);
  protected readonly pageId = String(this.route.snapshot.paramMap.get('id'));
  protected readonly user = this.authService.currentUser;
}
