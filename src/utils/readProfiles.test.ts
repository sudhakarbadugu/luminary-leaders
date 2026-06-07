import { describe, it, expect, beforeEach } from 'vitest';
import {
  markAsRead,
  markAsUnread,
  toggleReadStatus,
  isRead,
  getReadProfiles,
  getReadCount,
  clearReadProfiles,
  filterByReadStatus,
} from './readProfiles';

describe('readProfiles utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns false when profile has not been read', () => {
    expect(isRead('ada-lovelace', 'leader')).toBe(false);
  });

  it('marks a profile as read on first visit', () => {
    markAsRead('ada-lovelace', 'leader');
    expect(isRead('ada-lovelace', 'leader')).toBe(true);
    expect(getReadCount('leader')).toBe(1);
  });

  it('updates lastReadAt on repeat visits without duplicating entries', () => {
    markAsRead('ada-lovelace', 'leader');
    const first = getReadProfiles('leader')[0];
    markAsRead('ada-lovelace', 'leader');
    const second = getReadProfiles('leader')[0];

    expect(getReadCount('leader')).toBe(1);
    expect(second.readAt).toBe(first.readAt);
    expect(second.lastReadAt).toBeGreaterThanOrEqual(first.lastReadAt);
  });

  it('tracks categories independently', () => {
    markAsRead('ada-lovelace', 'leader');
    markAsRead('jesse-livermore', 'trader');

    expect(isRead('ada-lovelace', 'leader')).toBe(true);
    expect(isRead('ada-lovelace', 'trader')).toBe(false);
    expect(getReadCount('leader')).toBe(1);
    expect(getReadCount('trader')).toBe(1);
  });

  it('clears read profiles by category', () => {
    markAsRead('ada-lovelace', 'leader');
    markAsRead('jesse-livermore', 'trader');
    clearReadProfiles('leader');

    expect(getReadCount('leader')).toBe(0);
    expect(getReadCount('trader')).toBe(1);
  });

  it('marks a profile as unread', () => {
    markAsRead('ada-lovelace', 'leader');
    markAsUnread('ada-lovelace', 'leader');
    expect(isRead('ada-lovelace', 'leader')).toBe(false);
    expect(getReadCount('leader')).toBe(0);
  });

  it('toggles read status', () => {
    expect(toggleReadStatus('ada-lovelace', 'leader')).toBe(true);
    expect(isRead('ada-lovelace', 'leader')).toBe(true);
    expect(toggleReadStatus('ada-lovelace', 'leader')).toBe(false);
    expect(isRead('ada-lovelace', 'leader')).toBe(false);
  });

  it('filters items by read status', () => {
    const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    markAsRead('a', 'leader');
    markAsRead('c', 'leader');

    expect(filterByReadStatus(items, 'leader', 'all')).toHaveLength(3);
    expect(filterByReadStatus(items, 'leader', 'read').map(item => item.id)).toEqual(['a', 'c']);
    expect(filterByReadStatus(items, 'leader', 'unread').map(item => item.id)).toEqual(['b']);
  });
});