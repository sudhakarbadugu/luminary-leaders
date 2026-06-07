import { useCallback } from 'react';
import { Check, Circle } from 'lucide-react';
import { useReadProfiles } from '../hooks/useReadProfiles';
import { markAsRead, markAsUnread, type ProfileCategory } from '../utils/readProfiles';

interface ReadToggleButtonProps {
  id: string;
  category: ProfileCategory;
}

export default function ReadToggleButton({ id, category }: ReadToggleButtonProps) {
  const { isRead } = useReadProfiles();
  const read = isRead(id, category);

  const handleClick = useCallback(() => {
    if (read) {
      markAsUnread(id, category);
    } else {
      markAsRead(id, category);
    }
  }, [read, id, category]);

  return (
    <button
      type="button"
      onClick={handleClick}
      title={read ? 'Mark as unread' : 'Mark as read'}
      className="flex items-center gap-2 rounded-full border px-4 py-2 font-inter text-xs font-medium transition-all duration-200"
      style={{
        borderColor: read ? '#ffcc00' : 'rgba(241,241,238,0.25)',
        background: read ? 'rgba(255,204,0,0.15)' : 'rgba(40,43,47,0.7)',
        color: read ? '#ffcc00' : '#f1f1ee',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = read ? 'rgba(255,204,0,0.25)' : 'rgba(40,43,47,0.9)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = read ? 'rgba(255,204,0,0.15)' : 'rgba(40,43,47,0.7)';
      }}
    >
      {read ? <Circle size={14} /> : <Check size={14} />}
      {read ? 'Mark unread' : 'Mark read'}
    </button>
  );
}