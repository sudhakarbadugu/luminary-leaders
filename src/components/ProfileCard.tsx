import { useNavigate } from 'react-router-dom';
import BookmarkButton from './BookmarkButton';
import CompareToggleButton from './CompareToggleButton';
import { getGradient, SECTION_GRADIENT_COLORS, getInitials } from '../utils/visual';

type ProfileCategory = 'leader' | 'trader' | 'athlete' | 'cricketer' | 'scientist';

interface ProfileCardProps {
  id: string;
  name: string;
  subtitle: string;
  category: ProfileCategory;
  route: string;
  field: string;
  nationality?: string;
  born?: string;
  era?: string;
  image?: string;
  accent?: string;
  extraBadges?: string[];
  refCallback?: (element: HTMLDivElement | null) => void;
}

export default function ProfileCard({
  id,
  name,
  subtitle,
  category,
  route,
  field,
  nationality,
  born,
  era,
  image,
  accent = '#ffcc00',
  extraBadges = [],
  refCallback,
}: ProfileCardProps) {
  const navigate = useNavigate();

  return (
    <div ref={refCallback} onClick={() => navigate(`/${route}/${id}`)} className="group cursor-pointer opacity-0">
      <div
        className="relative overflow-hidden rounded-xl border border-black/5 shadow-[0_16px_36px_rgba(40,43,47,0.08)]"
        style={{ aspectRatio: '3/4', background: image ? undefined : getGradient(SECTION_GRADIENT_COLORS, id) }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-instrument text-5xl text-white">
            {getInitials(name)}
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />

        {field && (
          <div className="absolute right-3 top-3 rounded-full bg-[rgba(40,43,47,0.86)] px-2.5 py-1 text-[11px] font-medium tracking-wide text-[#f1f1ee] backdrop-blur-sm">
            {field}
          </div>
        )}

        <div className="absolute bottom-3 right-3 z-10 flex gap-1.5">
          <BookmarkButton id={id} category={category} name={name} nickname={subtitle} />
          <CompareToggleButton
            item={{
              id,
              name,
              nickname: subtitle,
              category,
              field,
              nationality: nationality || '',
              born: born || '',
              era: era || '',
              image,
            }}
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="font-inter text-base font-medium text-[#282b2f] transition-colors group-hover:text-[#b8860b]">
          {name}
        </div>
        <div className="mt-1 font-inter text-[13px] text-[#968671]">{subtitle}</div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {nationality && (
          <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-[#968671]">
            {nationality}
          </span>
        )}
        {born && (
          <span className="rounded-full bg-[#282b2f10] px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-[#282b2f]">
            {born}
          </span>
        )}
        {era && (
          <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide" style={{ background: `${accent}22`, color: accent }}>
            {era}
          </span>
        )}
        {extraBadges.slice(0, 3).map((badge) => (
          <span key={badge} className="rounded-full border border-[#e5e5e0] px-2.5 py-0.5 text-[11px] text-[#968671]">
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
