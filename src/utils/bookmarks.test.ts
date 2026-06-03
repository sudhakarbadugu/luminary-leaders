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
    toggleBookmark('test-leader', 'leader', 'Test Leader', 'TL');
    const bookmarks = getBookmarks();
    expect(bookmarks).toHaveLength(1);
    expect(bookmarks[0].id).toBe('test-leader');
    expect(bookmarks[0].category).toBe('leader');
  });

  it('checks if an item is bookmarked', () => {
    toggleBookmark('test-leader', 'leader', 'Test Leader', 'TL');
    expect(isBookmarked('test-leader', 'leader')).toBe(true);
    expect(isBookmarked('other-leader', 'leader')).toBe(false);
  });

  it('removes a bookmark', () => {
    toggleBookmark('test-leader', 'leader', 'Test Leader', 'TL');
    removeBookmark('test-leader', 'leader');
    expect(getBookmarks()).toEqual([]);
  });

  it('toggles bookmarks off via toggle', () => {
    toggleBookmark('test-leader', 'leader', 'Test Leader', 'TL');
    expect(isBookmarked('test-leader', 'leader')).toBe(true);
    toggleBookmark('test-leader', 'leader', 'Test Leader', 'TL');
    expect(isBookmarked('test-leader', 'leader')).toBe(false);
  });
});
