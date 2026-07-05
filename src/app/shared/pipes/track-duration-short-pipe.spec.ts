import { TrackDurationShortPipe } from './track-duration-short-pipe';

const pipe = new TrackDurationShortPipe();

describe('Duration < 1 hour', () => {
  it.each([
    [0, '0:00'],
    [1, '0:01'],
    [9, '0:09'],
    [10, '0:10'],
    [11, '0:11'],
    [59, '0:59'],
    [60, '1:00'],
    [61, '1:01'],
    [1200, '20:00'],
    [3599, '59:59'],
  ])('%d seconds is %s', (input, expected) => {
    expect(pipe.transform(input)).toBe(expected);
  });
});

describe('Duration >= 1 hour but < 1 day', () => {
  it.each([
    [3600, '1:00:00'],
    [3601, '1:00:01'],
    [3660, '1:01:00'],
    [3661, '1:01:01'],
    [4861, '1:21:01'],
    [86399, '23:59:59'],
  ])('%d seconds is %s', (input, expected) => {
    expect(pipe.transform(input)).toBe(expected);
  });
});

describe('Duration >= 1 day', () => {
  it.each([
    [86400, '1d 00:00:00'],
    [86401, '1d 00:00:01'],
    [172800, '2d 00:00:00'],
    [1000000, '11d 13:46:40'],
  ])('%d seconds is %s', (input, expected) => {
    expect(pipe.transform(input)).toBe(expected);
  });
});
