import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hive-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly copyrightText = `© ${String(new Date().getFullYear())} Y2K. All Rights Reserved`;
}
