import { useEffect, useState } from 'react';

interface ReadingProgressProps {
  sections: Array<{ id: string; label: string }>;
}

export default function ReadingProgress({ sections }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[120] h-1 bg-transparent">
        <div className="h-full bg-[#ffcc00]" style={{ width: `${progress}%` }} />
      </div>
      <aside className="fixed right-5 top-24 z-[60] hidden max-w-[150px] rounded-2xl border border-[#e5e5e0] bg-white/88 p-3 shadow-[0_12px_34px_rgba(40,43,47,0.1)] backdrop-blur-md xl:block">
        <div className="mb-2 font-inter text-[10px] font-semibold uppercase tracking-[0.18em] text-[#968671]">Reading</div>
        <div className="flex flex-col gap-1">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="rounded-lg px-2 py-1.5 font-inter text-xs text-[#282b2f] no-underline hover:bg-[#f1f1ee]">
              {section.label}
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}
