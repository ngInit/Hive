import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  HostBinding,
  inject,
  input,
  output,
  model,
  effect,
} from '@angular/core';
import { MatActionList, MatListItem } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'hive-popup',
  imports: [MatActionList, MatListItem, RouterLink],
  templateUrl: './popup.html',
  styleUrl: './popup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Popup {
  readonly open = model.required<boolean>();
  readonly userStatus = input.required<boolean>();
  readonly document = inject(DOCUMENT);
  readonly signOut = output();

  constructor() {
    effect((onCleanup) => {
      if (!this.open()) {
        return;
      }
      const pause = setTimeout(() => {
        this.document.addEventListener('click', this.closePopup);
      }, 10);

      onCleanup(() => {
        clearTimeout(pause);
        this.document.removeEventListener('click', this.closePopup);
      });
    });
  }

  @HostBinding('class.opened') get isOpened(): boolean {
    return this.open();
  }

  @HostBinding('class.user') get isUser(): boolean {
    return this.userStatus();
  }

  closePopup = (): void => {
    this.open.set(false);
  };

  setSignOut(): void {
    this.signOut.emit();
    this.closePopup();
  }
}
