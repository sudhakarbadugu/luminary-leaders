import { ArrowRight, BookOpen, FlaskConical, TrendingUp, Trophy, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getFeaturedProfile } from '../utils/featuredProfile';

const categories = [
  { label: 'Technology Leaders', target: '#legends', count: '100', icon: Users, color: '#7b1fa2' },
  { label: 'Market Masters', target: '#traders', count: '50', icon: TrendingUp, color: '#e65100' },
  { label: 'Sports Icons', target: '#sports', count: '51', icon: Trophy, color: '#2e7d32' },
  { label: 'Cricket Greats', target: '#cricket', count: '51', icon: Trophy, color: '#1976d2' },
  { label: 'Science Giants', target: '#scientists', count: '50', icon: FlaskConical, color: '#7b1fa2' },
];

export default function FeaturedReading() {
  const navigate = useNavigate();
  const profile = getFeaturedProfile();
  const route = `/${profile.category}/${profile.id}`;

  return (
    <section id="start-reading" className="relative z-[2] bg-[#f1f1ee] px-5 py-12 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-[1200px] gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden rounded-[28px] bg-[#282b2f] p-7 text-[#f1f1ee] shadow-[0_24px_70px_rgba(40,43,47,0.18)] md:p-10">
          <div className="absolute right-[-80px] top-[-80px] h-64 w-64 rounded-full bg-[#ffcc00]/20 blur-2xl" />
          <div className="relative">
            <div className="mb-5 flex items-center gap-2 font-inter text-[11px] font-medium uppercase tracking-[0.22em] text-[#ffcc00]">
              <BookOpen size={14} /> Start Reading
            </div>
            <h2 className="max-w-[620px] font-instrument text-[clamp(34px,4vw,56px)] font-normal leading-tight">
              Begin with one story, then follow the thread.
            </h2>
            <p className="mt-5 max-w-[560px] font-inter text-[15px] leading-7 text-[#cfc8bd]">
              A curated path keeps the archive from feeling like a directory. Start with a high-signal profile, or jump into the category that matches your mood.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate(route)}
                className="rounded-full bg-[#ffcc00] px-6 py-3 font-inter text-[13px] font-semibold text-[#282b2f] transition-transform hover:-translate-y-0.5"
              >
                Read Featured Story
              </button>
              <a
                href="#category-index"
                className="inline-flex items-center gap-2 rounded-full border border-[#f1f1ee]/30 px-6 py-3 font-inter text-[13px] font-medium text-[#f1f1ee] no-underline transition-colors hover:border-[#ffcc00] hover:text-[#ffcc00]"
              >
                Choose a Category <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>

        <div id="category-index" className="rounded-[28px] border border-[#e5e5e0] bg-white p-5 shadow-[0_16px_48px_rgba(40,43,47,0.07)] md:p-6">
          <div className="mb-4 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#968671]">Category Index</div>
          <div className="grid gap-3">
            {categories.map(({ label, target, count, icon: Icon, color }) => (
              <a
                key={label}
                href={target}
                className="group flex items-center justify-between rounded-2xl border border-[#e5e5e0] bg-[#f8f7f3] p-4 text-[#282b2f] no-underline transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_28px_rgba(40,43,47,0.08)]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: `${color}18`, color }}>
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className="block font-inter text-sm font-medium">{label}</span>
                    <span className="block font-inter text-xs text-[#968671]">{count} concise profiles</span>
                  </span>
                </span>
                <ArrowRight size={16} className="text-[#968671] transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
