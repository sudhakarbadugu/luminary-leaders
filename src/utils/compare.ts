export interface CompareItem {
  id: string;
  name: string;
  nickname: string;
  category: 'leader' | 'trader' | 'athlete' | 'cricketer' | 'scientist';
  field: string;
  nationality: string;
  born: string;
  era: string;
  image?: string;
}

const STORAGE_KEY = 'luminary_compare';

function load(): CompareItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(list: CompareItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function getCompareItems(): CompareItem[] {
  return load();
}

export function isInCompare(id: string, category: CompareItem['category']): boolean {
  return load().some(item => item.id === id && item.category === category);
}

export function toggleCompare(item: CompareItem): boolean {
  const list = load();
  const idx = list.findIndex(i => i.id === item.id && i.category === item.category);
  if (idx >= 0) {
    list.splice(idx, 1);
    save(list);
    return false;
  } else if (list.length < 3) {
    list.push(item);
    save(list);
    return true;
  }
  return false;
}

export function clearCompare() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getCompareCount(): number {
  return load().length;
}
