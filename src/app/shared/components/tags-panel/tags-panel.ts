import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatChip, MatChipSet } from '@angular/material/chips';

@Component({
  selector: 'hive-tags-panel',
  imports: [MatChipSet, MatChip],
  templateUrl: './tags-panel.html',
  styleUrl: './tags-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsPanel {
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
}
