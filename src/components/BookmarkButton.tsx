import { useState, useCallback } from 'react';
import { Bookmark } from 'lucide-react';
import { isBookmarked, toggleBookmark } from '../utils/bookmarks';
import { cn } from '@/lib/utils';

interface Props {
  id: string;
  category: 'leader' | 'trader' | 'athlete' | 'cricketer' | 'scientist';
  name: string;
  nickname: string;
  size?: number;
  className?: string;
}

export default function BookmarkButton({ id, category, name, nickname, size = 18, className }: Props) {
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
      className={cn(
        'flex items-center justify-center w-9 h-9 rounded-full border-none cursor-pointer transition-all duration-200 backdrop-blur-sm',
        active ? 'bg-[#ffcc00]' : 'bg-[rgba(40,43,47,0.7)] hover:bg-[rgba(40,43,47,0.9)]',
        className
      )}
    >
      <Bookmark size={size} fill={active ? '#282b2f' : 'none'} color={active ? '#282b2f' : '#fff'} strokeWidth={2} />
    </button>
  );
}
