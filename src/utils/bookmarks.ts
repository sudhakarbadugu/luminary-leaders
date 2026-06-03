export interface Bookmark {
  id: string;
  category: 'leader' | 'trader' | 'athlete' | 'cricketer' | 'scientist';
  name: string;
  nickname: string;
  addedAt: number;
}

const STORAGE_KEY = 'luminary_bookmarks';

function load(): Bookmark[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(list: Bookmark[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function getBookmarks(): Bookmark[] {
  return load().sort((a, b) => b.addedAt - a.addedAt);
}

export function isBookmarked(id: string, category: Bookmark['category']): boolean {
  return load().some(b => b.id === id && b.category === category);
}

export function toggleBookmark(
  id: string,
  category: Bookmark['category'],
  name: string,
  nickname: string
): boolean {
  const list = load();
  const idx = list.findIndex(b => b.id === id && b.category === category);
  if (idx >= 0) {
    list.splice(idx, 1);
    save(list);
    return false;
  } else {
    list.push({ id, category, name, nickname, addedAt: Date.now() });
    save(list);
    return true;
  }
}

export function removeBookmark(id: string, category: Bookmark['category']) {
  const list = load().filter(b => !(b.id === id && b.category === category));
  save(list);
}

export function getBookmarkCount(): number {
  return load().length;
}

export function getCategoryLabel(cat: Bookmark['category']): string {
  const labels: Record<string, string> = {
    leader: 'Tech Legend',
    trader: 'Market Master',
    athlete: 'Athlete',
    cricketer: 'Cricketer',
    scientist: 'Scientist',
  };
  return labels[cat] || cat;
}

export function getCategoryRoute(cat: Bookmark['category']): string {
  const routes: Record<string, string> = {
    leader: '/leader',
    trader: '/trader',
    athlete: '/athlete',
    cricketer: '/cricketer',
    scientist: '/scientist',
  };
  return routes[cat] || '/';
}
