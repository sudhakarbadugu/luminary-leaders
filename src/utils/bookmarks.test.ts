import { describe, it, expect, beforeEach } from 'vitest';
import { getBookmarks, toggleBookmark, removeBookmark, isBookmarked } from './bookmarks';

describe('bookmarks utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty array when no bookmarks stored', () => {
    expect(getBookmarks()).toEqual([]);
  });

  it('adds and retrieves bookmarks', () => {
    toggleBookmark(1, 'leader', 'Test Leader', 'TL');
    const bookmarks = getBookmarks();
    expect(bookmarks).toHaveLength(1);
    expect(bookmarks[0].id).toBe(1);
    expect(bookmarks[0].category).toBe('leader');
  });

  it('checks if an item is bookmarked', () => {
    toggleBookmark(1, 'leader', 'Test Leader', 'TL');
    expect(isBookmarked(1, 'leader')).toBe(true);
    expect(isBookmarked(2, 'leader')).toBe(false);
  });

  it('removes a bookmark', () => {
    toggleBookmark(1, 'leader', 'Test Leader', 'TL');
    removeBookmark(1, 'leader');
    expect(getBookmarks()).toEqual([]);
  });

  it('toggles bookmarks off via toggle', () => {
    toggleBookmark(1, 'leader', 'Test Leader', 'TL');
    expect(isBookmarked(1, 'leader')).toBe(true);
    toggleBookmark(1, 'leader', 'Test Leader', 'TL');
    expect(isBookmarked(1, 'leader')).toBe(false);
  });
});
