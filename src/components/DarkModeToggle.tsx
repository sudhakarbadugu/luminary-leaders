import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

export default function DarkModeToggle() {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      onClick={toggle}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center justify-center w-9 h-9 rounded-full border cursor-pointer transition-all duration-300 border-brand-border bg-transparent hover:bg-brand-dark hover:border-brand-dark dark:border-brand-border-dark dark:bg-brand-accent dark:hover:bg-brand-accent"
    >
      {isDark ? (
        <Sun size={16} color="#282b2f" />
      ) : (
        <Moon size={16} className="text-brand-dark dark:text-brand-text-dark" />
      )}
    </button>
  );
}
