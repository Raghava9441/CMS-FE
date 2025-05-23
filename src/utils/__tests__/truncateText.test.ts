import truncateText from '../truncateText';

describe('truncateText', () => {
  it('should return the original string if shorter than n', () => {
    expect(truncateText('hello', 10)).toBe('hello');
  });

  it('should return the string with an ellipsis if equal to n', () => {
    expect(truncateText('hello', 5)).toBe('hello…'); 
  });

  it('should truncate and add ellipsis if longer than n', () => {
    expect(truncateText('hello world', 5)).toBe('hello…');
  });

  it('should return an empty string if input is empty', () => {
    expect(truncateText('', 5)).toBe('');
  });

  it('should return null or undefined if input is null or undefined', () => {
    expect(truncateText(null, 5)).toBeNull();
    expect(truncateText(undefined, 5)).toBeUndefined();
  });

  it('should return ellipsis if n is 0', () => {
    expect(truncateText('hello', 0)).toBe('…');
  });

  it('should return ellipsis if n is negative', () => {
    // Based on stringz behavior, limit(str, negativeNum) returns empty string.
    // So, the function will return "…"
    expect(truncateText('hello', -5)).toBe('…');
  });
});
