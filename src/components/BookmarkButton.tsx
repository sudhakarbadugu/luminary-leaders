import { useState, useCallback } from 'react';
import { Bookmark } from 'lucide-react';
import { isBookmarked, toggleBookmark } from '../utils/bookmarks';

interface Props {
  id: number;
  category: 'leader' | 'trader' | 'athlete' | 'cricketer' | 'scientist';
  name: string;
  nickname: string;
  size?: number;
  style?: React.CSSProperties;
}

export default function BookmarkButton({ id, category, name, nickname, size = 18, style }: Props) {
  const [active, setActive] = useState(() => isBookmarked(id, category));

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const result = toggleBookmark(id, category, name, nickname);
    setActive(result);
  }, [id, category, name, nickname]);

  return (
    <button
      onClick={handleClick}
      title={active ? 'Remove from collection' : 'Add to collection'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: 'none',
        background: active ? '#ffcc00' : 'rgba(40,43,47,0.7)',
        backdropFilter: 'blur(4px)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ...style,
      }}
      onMouseEnter={e => {
        if (!active) e.currentTarget.style.background = 'rgba(40,43,47,0.9)';
      }}
      onMouseLeave={e => {
        if (!active) e.currentTarget.style.background = 'rgba(40,43,47,0.7)';
      }}
    >
      <Bookmark size={size} fill={active ? '#282b2f' : 'none'} color={active ? '#282b2f' : '#fff'} strokeWidth={2} />
    </button>
  );
}
