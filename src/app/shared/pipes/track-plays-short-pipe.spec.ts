import { TrackPlaysShortPipe } from './track-plays-short-pipe';

const pipe = new TrackPlaysShortPipe();

describe('Plays is undefined', () => {
  it('Undefined should be 0', () => {
    expect(pipe.transform(undefined)).toBe('0');
  });
});

describe('Plays < 1000', () => {
  it.each([
    [0, '0'],
    [1, '1'],
    [10, '10'],
    [100, '100'],
    [900, '900'],
    [999, '999'],
  ])('%d plays is %s', (input, expected) => {
    expect(pipe.transform(input)).toBe(expected);
  });
});

describe('Plays >= 1000 but < 10000', () => {
  it.each([
    [1000, '1K'],
    [1001, '1K'],
    [1100, '1.1K'],
    [1949, '1.9K'],
    [1950, '2K'],
    [1951, '2K'],
    [1990, '2K'],
    [1999, '2K'],
    [2000, '2K'],
    [9899, '9.9K'],
    [9900, '9.9K'],
    [9999, '10K'],
  ])('%d plays is %s', (input, expected) => {
    expect(pipe.transform(input)).toBe(expected);
  });
});

describe('Plays >= 10000 but < 100000', () => {
  it.each([
    [10000, '10K'],
    [10001, '10K'],
    [10100, '10.1K'],
    [10499, '10.5K'],
    [10500, '10.5K'],
    [10949, '10.9K'],
    [10950, '11K'],
    [19949, '19.9K'],
    [19950, '20K'],
    [20000, '20K'],
    [98999, '99K'],
    [99000, '99K'],
    [99949, '99.9K'],
    [99950, '100K'],
    [99999, '100K'],
  ])('%d plays is %s', (input, expected) => {
    expect(pipe.transform(input)).toBe(expected);
  });
});

describe('Plays >= 100000 but < 1000000', () => {
  it.each([
    [100000, '100K'],
    [100001, '100K'],
    [100100, '100.1K'],
    [100949, '100.9K'],
    [100950, '101K'],
    [100999, '101K'],
    [101000, '101K'],
    [500000, '500K'],
    [549999, '550K'],
    [989999, '990K'],
    [990000, '990K'],
    [999949, '999.9K'],
    [999950, '1M'],
    [999999, '1M'],
  ])('%d plays is %s', (input, expected) => {
    expect(pipe.transform(input)).toBe(expected);
  });
});

describe('Plays >= 1000000 but < 1000000000', () => {
  it.each([
    [1000000, '1M'],
    [1000001, '1M'],
    [1049999, '1M'],
    [1050000, '1.1M'],
    [1094999, '1.1M'],
    [1949999, '1.9M'],
    [1950000, '2M'],
    [2000000, '2M'],
    [9999999, '10M'],
    [10000000, '10M'],
    [10094999, '10.1M'],
    [10095000, '10.1M'],
    [99999999, '100M'],
    [100000000, '100M'],
    [999999949, '1B'],
    [999999950, '1B'],
    [999999999, '1B'],
  ])('%d plays is %s', (input, expected) => {
    expect(pipe.transform(input)).toBe(expected);
  });
});

describe('Plays >= 1000000000', () => {
  it.each([
    [1000000000, '1B'],
    [1050000000, '1.1B'],
    [1950000000, '2B'],
    [10000000000, '10B'],
    [100000000000, '100B'],
  ])('%d plays is %s', (input, expected) => {
    expect(pipe.transform(input)).toBe(expected);
  });
});
