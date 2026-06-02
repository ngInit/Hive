import {
  ChangeDetectionStrategy,
  Component,
  input,
  inject,
  signal,
  DestroyRef,
  ElementRef,
  viewChild,
  afterRenderEffect,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'hive-carousel',
  imports: [MatIconButton, MatIcon],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carousel {
  private readonly viewport = viewChild<ElementRef<HTMLElement>>('viewport');
  private readonly destroyRef = inject(DestroyRef);
  private readonly defaultScrollStep = 200;

  isLoading = input(true);

  readonly needControls = signal(false);
  readonly canScrollNext = signal(false);
  readonly canScrollPrev = signal(false);

  constructor() {
    afterRenderEffect({
      read: () => {
        if (this.isLoading()) {
          return;
        }
        this.updateScrollState();
      },
    });

    window.addEventListener('resize', this.onResize);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', this.onResize);
    });
  }

  private readonly onResize = (): void => {
    this.updateScrollState();
  };

  scrollPrev(): void {
    this.scrollBy(-this.getScrollStep());
  }

  scrollNext(): void {
    this.scrollBy(this.getScrollStep());
  }

  updateScrollState(): void {
    const viewportElement = this.viewport()?.nativeElement;
    if (viewportElement) {
      const maxScrollLeft = viewportElement.scrollWidth - viewportElement.clientWidth;
      this.canScrollPrev.set(viewportElement.scrollLeft > 0);
      this.canScrollNext.set(viewportElement.scrollLeft < maxScrollLeft - 1);
      this.needControls.set(viewportElement.clientWidth < viewportElement.scrollWidth - 1);
    }
  }

  private scrollBy(delta: number): void {
    const viewportElement = this.viewport();
    if (viewportElement) {
      viewportElement.nativeElement.scrollBy({
        left: delta,
      });
    }
  }

  private getScrollStep(): number {
    const viewportElement = this.viewport()?.nativeElement;
    if (viewportElement) {
      return viewportElement.clientWidth <= this.defaultScrollStep
        ? this.defaultScrollStep
        : Math.floor(viewportElement.clientWidth / this.defaultScrollStep) * this.defaultScrollStep;
    }
    return 0;
  }
}
