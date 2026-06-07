import { Check } from 'lucide-react';
import { useReadProfiles } from '../hooks/useReadProfiles';
import type { ProfileCategory } from '../utils/readProfiles';

interface ReadBadgeProps {
  id: string;
  category: ProfileCategory;
}

export default function ReadBadge({ id, category }: ReadBadgeProps) {
  const { isRead } = useReadProfiles();

  if (!isRead(id, category)) return null;

  return (
    <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 rounded-full bg-[rgba(40,43,47,0.82)] px-2 py-1 font-inter text-[10px] font-medium tracking-wide text-[#f1f1ee] backdrop-blur-sm">
      <Check size={10} strokeWidth={2.5} />
      Read
    </div>
  );
}