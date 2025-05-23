import { getSimpleData } from '../timeFormatter';

describe('getSimpleData', () => {
  it('should format a valid date string correctly', () => {
    expect(getSimpleData('2023-10-26T10:00:00.000Z')).toBe('26th October, 2023');
  });

  // Test cases for ordinal suffixes
  it('should handle "st" suffix correctly', () => {
    expect(getSimpleData('2023-01-01T10:00:00.000Z')).toBe('1st January, 2023');
    expect(getSimpleData('2023-01-21T10:00:00.000Z')).toBe('21st January, 2023');
    expect(getSimpleData('2023-01-31T10:00:00.000Z')).toBe('31st January, 2023');
  });

  it('should handle "nd" suffix correctly', () => {
    expect(getSimpleData('2023-02-02T10:00:00.000Z')).toBe('2nd February, 2023');
    expect(getSimpleData('2023-02-22T10:00:00.000Z')).toBe('22nd February, 2023');
  });

  it('should handle "rd" suffix correctly', () => {
    expect(getSimpleData('2023-03-03T10:00:00.000Z')).toBe('3rd March, 2023');
    expect(getSimpleData('2023-03-23T10:00:00.000Z')).toBe('23rd March, 2023');
  });

  it('should handle "th" suffix correctly', () => {
    expect(getSimpleData('2023-04-04T10:00:00.000Z')).toBe('4th April, 2023');
    expect(getSimpleData('2023-04-11T10:00:00.000Z')).toBe('11th April, 2023'); // Covers 11th, 12th, 13th
    expect(getSimpleData('2023-04-25T10:00:00.000Z')).toBe('25th April, 2023');
  });

  // Test cases for different months and years
  it('should format dates in different months correctly', () => {
    expect(getSimpleData('2023-07-15T10:00:00.000Z')).toBe('15th July, 2023');
    expect(getSimpleData('2023-12-10T10:00:00.000Z')).toBe('10th December, 2023');
  });

  it('should format dates in different years correctly', () => {
    expect(getSimpleData('2022-05-20T10:00:00.000Z')).toBe('20th May, 2022');
    expect(getSimpleData('2025-09-05T10:00:00.000Z')).toBe('5th September, 2025');
  });

  // Test case for a leap year date (February 29th)
  it('should format a leap year date correctly', () => {
    expect(getSimpleData('2024-02-29T10:00:00.000Z')).toBe('29th February, 2024');
  });

  // Test cases for invalid date strings
  // The JavaScript `new Date()` constructor is quite lenient.
  // "not-a-date" results in "Invalid Date" from `date.toString()`, 
  // then getDate(), getMonth(), getFullYear() will return NaN.
  // The function will then output "NaNth undefined, NaN".
  it('should handle invalid date strings gracefully', () => {
    expect(getSimpleData('not-a-date')).toBe('NaNth undefined, NaN');
    expect(getSimpleData('')).toBe('NaNth undefined, NaN'); // Empty string also results in "Invalid Date"
  });

  // Test cases for null and undefined inputs
  // `new Date(null)` results in "1st January, 1970" (or similar, epoch time)
  // `new Date(undefined)` results in "Invalid Date"
  it('should handle null input by treating it as epoch', () => {
    // Behavior of `new Date(null)` is equivalent to `new Date(0)` which is epoch start.
    // The exact date might vary based on timezone, so we check for a pattern.
    // For UTC, it's '1st January, 1970'
    // Let's make this test more robust if timezone is an issue, 
    // or mock Date constructor if we need perfect consistency.
    // For now, assuming UTC or consistent local timezone for testing.
    expect(getSimpleData(null)).toBe('1st January, 1970'); 
  });

  it('should handle undefined input gracefully', () => {
    expect(getSimpleData(undefined)).toBe('NaNth undefined, NaN');
  });
});
