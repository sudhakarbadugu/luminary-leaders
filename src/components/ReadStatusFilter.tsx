import type { ProfileCategory, ReadFilter } from '../utils/readProfiles';
import { useReadProfiles } from '../hooks/useReadProfiles';

interface ReadStatusFilterProps {
  category: ProfileCategory;
  totalCount: number;
  value: ReadFilter;
  onChange: (value: ReadFilter) => void;
}

const OPTIONS: Array<{ value: ReadFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'read', label: 'Read' },
];

export default function ReadStatusFilter({ category, totalCount, value, onChange }: ReadStatusFilterProps) {
  const { readCount } = useReadProfiles(category);

  return (
    <div className="mb-6 flex flex-col items-center gap-3">
      <div className="font-inter text-[13px] text-[#968671]">
        {readCount} of {totalCount} read
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {OPTIONS.map(option => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className="rounded-full border px-4 py-2 font-inter text-xs font-medium transition-all duration-200"
            style={{
              borderColor: value === option.value ? '#282b2f' : '#e5e5e0',
              background: value === option.value ? '#282b2f' : 'transparent',
              color: value === option.value ? '#f1f1ee' : '#968671',
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}