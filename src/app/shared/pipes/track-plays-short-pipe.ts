import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trackPlaysShort',
})
export class TrackPlaysShortPipe implements PipeTransform {
  transform(rawPlays: number | undefined): string {
    if (!rawPlays) {
      return '';
    }
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    }).format(rawPlays);
  }
}
