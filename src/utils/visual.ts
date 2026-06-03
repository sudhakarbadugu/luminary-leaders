export const SECTION_GRADIENT_COLORS = [
  ['#2c3e50', '#3498db'],
  ['#8e44ad', '#e74c3c'],
  ['#16a085', '#f39c12'],
  ['#d35400', '#c0392b'],
  ['#27ae60', '#2980b9'],
  ['#6c3483', '#1a5276'],
  ['#784212', '#1b4f72'],
  ['#145a32', '#7d3c98'],
];

export const TRADER_GRADIENT_COLORS = [
  ['#1a472a', '#2e7d32'], ['#0d47a1', '#1976d2'], ['#b71c1c', '#d32f2f'],
  ['#4a148c', '#7b1fa2'], ['#e65100', '#f57c00'], ['#1b5e20', '#388e3c'],
  ['#006064', '#0097a7'], ['#311b92', '#5e35b1'],
];

export const SCIENTIST_GRADIENT_COLORS = [
  ['#1a237e', '#3949ab'], ['#004d40', '#00796b'], ['#b71c1c', '#d32f2f'],
  ['#4a148c', '#7b1fa2'], ['#e65100', '#f57c00'], ['#1b5e20', '#388e3c'],
  ['#006064', '#0097a7'], ['#311b92', '#5e35b1'], ['#880e4f', '#c2185b'],
  ['#3e2723', '#5d4037'], ['#263238', '#455a64'], ['#01579b', '#0288d1'],
  ['#bf360c', '#e64a19'], ['#33691e', '#558b2f'], ['#4e342e', '#6d4c41'],
];

export function getGradient(colors: string[][], id: string | number): string {
  if (!Array.isArray(colors) || colors.length === 0) {
    return 'linear-gradient(135deg, #2c3e50, #3498db)';
  }
  const numId = typeof id === 'string' ? id.split('').reduce((a, b) => a + b.charCodeAt(0), 0) : Number(id);
  const safeIndex = Number.isFinite(numId) ? Math.abs(Math.trunc(numId)) : 0;
  const c = colors[safeIndex % colors.length] ?? colors[0];
  return `linear-gradient(135deg, ${c[0]}, ${c[1]})`;
}

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}
