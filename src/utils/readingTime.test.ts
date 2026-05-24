import { describe, it, expect } from 'vitest';
import { getReadingTime } from './readingTime';

describe('readingTime', () => {
  it('returns 1 for empty content', () => {
    expect(getReadingTime('')).toBe(1);
  });

  it('returns 1 for short content', () => {
    expect(getReadingTime('Hello world')).toBe(1);
  });

  it('calculates reading time for longer content', () => {
    const words = Array(400).fill('word').join(' ');
    const time = getReadingTime(words);
    expect(time).toBeGreaterThanOrEqual(2);
  });
});
