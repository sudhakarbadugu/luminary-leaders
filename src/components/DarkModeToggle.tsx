import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

export default function DarkModeToggle() {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      onClick={toggle}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: '1px solid #e5e5e0',
        background: isDark ? '#ffcc00' : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={e => {
        if (!isDark) {
          e.currentTarget.style.background = '#282b2f';
          e.currentTarget.style.borderColor = '#282b2f';
        }
      }}
      onMouseLeave={e => {
        if (!isDark) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = '#e5e5e0';
        }
      }}
    >
      {isDark ? (
        <Sun size={16} color="#282b2f" />
      ) : (
        <Moon size={16} color="#282b2f" />
      )}
    </button>
  );
}
