export interface CategoryStyle {
  accent: string;
  accentLight: string;
  gradient: string[];
  label: string;
  labelPlural: string;
}

export const categoryStyles: Record<string, CategoryStyle> = {
  leader: {
    accent: '#ffcc00',
    accentLight: 'rgba(255,204,0,0.12)',
    gradient: ['#ffcc00', '#e5b800'],
    label: 'Tech Legend',
    labelPlural: 'Tech Legends',
  },
  trader: {
    accent: '#c78d3f',
    accentLight: 'rgba(199,141,63,0.12)',
    gradient: ['#c78d3f', '#a6732f'],
    label: 'Market Master',
    labelPlural: 'Market Masters',
  },
  athlete: {
    accent: '#4a9b8e',
    accentLight: 'rgba(74,155,142,0.12)',
    gradient: ['#4a9b8e', '#3a7d72'],
    label: 'Athlete',
    labelPlural: 'Athletes',
  },
  cricketer: {
    accent: '#5e8f6b',
    accentLight: 'rgba(94,143,107,0.12)',
    gradient: ['#5e8f6b', '#4a7555'],
    label: 'Cricketer',
    labelPlural: 'Cricketers',
  },
  scientist: {
    accent: '#7b6bb3',
    accentLight: 'rgba(123,107,179,0.12)',
    gradient: ['#7b6bb3', '#63569c'],
    label: 'Scientist',
    labelPlural: 'Scientists',
  },
};

export function getCategoryStyle(category: string): CategoryStyle {
  return categoryStyles[category] || categoryStyles.leader;
}
