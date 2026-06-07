import { useNavigate } from 'react-router-dom';
import { bioData } from '../data';
import BookmarkButton from './BookmarkButton';
import CompareToggleButton from './CompareToggleButton';
import ReadBadge from './ReadBadge';
import { getGradient, SECTION_GRADIENT_COLORS, getInitials } from '../utils/visual';
import type { Leader } from '../data/leaders';

interface LeaderCardProps {
  leader: Leader;
  getNationality: (id: string) => string;
}

export default function LeaderCard({ leader, getNationality }: LeaderCardProps) {
  const navigate = useNavigate();
  const nationality = getNationality(leader.id);
  const bio = bioData[leader.id];

  return (
    <div onClick={() => navigate(`/leader/${leader.id}`)} className="cursor-pointer">
      <div
        className="relative overflow-hidden rounded-lg"
        style={{ aspectRatio: '3/4', background: leader.image ? undefined : getGradient(SECTION_GRADIENT_COLORS, leader.id) }}
      >
        {leader.image ? (
          <img
            src={leader.image}
            alt={leader.name}
            className="w-full h-full object-cover transition-transform duration-400 hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white font-instrument text-5xl">
            {getInitials(leader.name)}
          </div>
        )}

        <ReadBadge id={leader.id} category="leader" />

        {/* Nationality badge */}
        {nationality && (
          <div className="absolute top-3 left-3 bg-[rgba(40,43,47,0.85)] backdrop-blur-sm text-[#f1f1ee] text-[11px] font-medium px-2.5 py-1 rounded-full tracking-wide">
            {nationality}
          </div>
        )}

        {/* Action buttons */}
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          <BookmarkButton id={leader.id} category="leader" name={leader.name} nickname={leader.role} />
          <CompareToggleButton
            item={{
              id: leader.id,
              name: leader.name,
              nickname: leader.role,
              category: 'leader',
              field: leader.role,
              nationality: nationality || '',
              born: '',
              era: leader.era,
              image: leader.image,
            }}
          />
        </div>
      </div>

      {/* Card info */}
      <div className="mt-4 text-[#282b2f] hover:text-[#ffcc00] transition-colors duration-200">
        <div className="text-base font-medium">{leader.name}</div>
        <div className="text-[13px] text-[#968671] mt-1">{leader.role}</div>
      </div>

      {/* Badges */}
      <div className="flex gap-1.5 mt-2 flex-wrap">
        {nationality && (
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#f1f1ee] text-[#968671] font-medium tracking-wide">
            {nationality}
          </span>
        )}
        {bio?.born && (
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#282b2f10] text-[#282b2f] font-medium tracking-wide">
            {bio.born}
          </span>
        )}
        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#ffcc0020] text-[#b8860b] font-medium tracking-wide">
          {leader.era}
        </span>
      </div>

      <div className="text-xs text-[#968671] opacity-70 mt-1">{leader.company}</div>
    </div>
  );
}
