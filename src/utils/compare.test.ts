import { describe, it, expect, beforeEach } from 'vitest';
import { getCompareItems, toggleCompare, clearCompare, isInCompare, type CompareItem } from './compare';

describe('compare utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty array when no items stored', () => {
    expect(getCompareItems()).toEqual([]);
  });

  it('adds and retrieves compare items', () => {
    const item: CompareItem = { id: 1, name: 'Test Leader', nickname: 'TL', category: 'leader', field: 'Tech', nationality: 'US', born: '2000', era: 'Modern' };
    toggleCompare(item);
    const items = getCompareItems();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(1);
    expect(items[0].name).toBe('Test Leader');
  });

  it('removes a compare item via toggle', () => {
    const item: CompareItem = { id: 2, name: 'Another Leader', nickname: 'AL', category: 'leader', field: 'Tech', nationality: 'US', born: '2000', era: 'Modern' };
    toggleCompare(item);
    expect(isInCompare(2, 'leader')).toBe(true);
    toggleCompare(item);
    expect(isInCompare(2, 'leader')).toBe(false);
  });

  it('clears all compare items', () => {
    const item1: CompareItem = { id: 1, name: 'A', nickname: 'A', category: 'leader', field: 'Tech', nationality: 'US', born: '2000', era: 'Modern' };
    const item2: CompareItem = { id: 2, name: 'B', nickname: 'B', category: 'trader', field: 'Finance', nationality: 'UK', born: '2000', era: 'Modern' };
    toggleCompare(item1);
    toggleCompare(item2);
    clearCompare();
    expect(getCompareItems()).toEqual([]);
  });
});
