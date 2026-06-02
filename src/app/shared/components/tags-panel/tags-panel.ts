import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hive-tags-panel',
  imports: [],
  templateUrl: './tags-panel.html',
  styleUrl: './tags-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsPanel {
  title = 'tags-panel works!';
}
