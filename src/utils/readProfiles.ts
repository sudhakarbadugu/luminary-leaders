export type ProfileCategory = 'leader' | 'trader' | 'athlete' | 'cricketer' | 'scientist';
export type ReadFilter = 'all' | 'read' | 'unread';

export interface ReadProfile {
  id: string;
  category: ProfileCategory;
  readAt: number;
  lastReadAt: number;
}

const STORAGE_KEY = 'luminary_read_profiles';
export const READ_CHANGE_EVENT = 'luminary-read-change';

function load(): ReadProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(list: ReadProfile[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent(READ_CHANGE_EVENT));
}

function findIndex(list: ReadProfile[], id: string, category: ProfileCategory) {
  return list.findIndex(entry => entry.id === id && entry.category === category);
}

export function markAsRead(id: string, category: ProfileCategory): void {
  const list = load();
  const now = Date.now();
  const idx = findIndex(list, id, category);

  if (idx >= 0) {
    list[idx].lastReadAt = now;
  } else {
    list.push({ id, category, readAt: now, lastReadAt: now });
  }

  save(list);
}

export function markAsUnread(id: string, category: ProfileCategory): void {
  const list = load();
  const idx = findIndex(list, id, category);
  if (idx < 0) return;

  list.splice(idx, 1);
  save(list);
}

export function toggleReadStatus(id: string, category: ProfileCategory): boolean {
  if (isRead(id, category)) {
    markAsUnread(id, category);
    return false;
  }
  markAsRead(id, category);
  return true;
}

export function isRead(id: string, category: ProfileCategory): boolean {
  return findIndex(load(), id, category) >= 0;
}

export function getReadProfiles(category?: ProfileCategory): ReadProfile[] {
  const list = category ? load().filter(entry => entry.category === category) : load();
  return list.sort((a, b) => b.lastReadAt - a.lastReadAt);
}

export function getReadCount(category: ProfileCategory): number {
  return load().filter(entry => entry.category === category).length;
}

export function clearReadProfiles(category?: ProfileCategory): void {
  if (!category) {
    save([]);
    return;
  }
  save(load().filter(entry => entry.category !== category));
}

export function filterByReadStatus<T extends { id: string }>(
  items: T[],
  category: ProfileCategory,
  readFilter: ReadFilter
): T[] {
  if (readFilter === 'all') return items;

  return items.filter(item => {
    const read = isRead(item.id, category);
    return readFilter === 'read' ? read : !read;
  });
}