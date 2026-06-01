import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trackDurationShort',
})
export class TrackDurationShortPipe implements PipeTransform {
  transform(seconds: number): string {
    const daysLeft = Math.floor(seconds / (24 * 3600));
    seconds -= daysLeft * 24 * 3600;
    const hoursLeft = Math.floor(seconds / 3600);
    seconds -= hoursLeft * 3600;
    const minutesLeft = Math.floor(seconds / 60);
    seconds -= minutesLeft * 60;

    if (daysLeft !== 0) {
      return `${String(daysLeft)}d ${String(hoursLeft).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    if (hoursLeft !== 0) {
      return `${String(hoursLeft)}:${String(minutesLeft).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    return `${String(minutesLeft)}:${String(seconds).padStart(2, '0')}`;
  }
}
