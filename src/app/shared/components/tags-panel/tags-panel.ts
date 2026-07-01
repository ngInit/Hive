import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationService } from '@core/services/navigation.service';
import { MatChip, MatChipSet } from '@angular/material/chips';

@Component({
  selector: 'hive-tags-panel',
  imports: [MatChipSet, MatChip],
  templateUrl: './tags-panel.html',
  styleUrl: './tags-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsPanel {
  private readonly navigationService = inject(NavigationService);
  tags: string[] = [
    'rock',
    'pop',
    'jazz',
    'blues',
    'classic',
    'country',
    'electronic',
    'instrumental',
    'hip-hop',
    'r&b',
  ];

  goToTag(tag: string): void {
    void this.navigationService.goToTagsSearch(tag);
  }
}
