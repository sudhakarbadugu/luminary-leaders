import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-[2] bg-brand-dark px-5 py-10 pb-5 md:px-10 md:py-20 dark:bg-brand-dark-hero" style={{ padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 40px) clamp(20px, 3vw, 40px)' }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="grid gap-12" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))' }}>
          <div>
            <div className="font-inter text-[13px] font-medium tracking-widest uppercase text-brand-inverse">
              LUMINARY
            </div>
            <p className="font-inter text-[13px] text-brand-muted mt-4 leading-relaxed dark:text-brand-muted-dark">
              303 stories of human excellence. Deeply researched biographies of the pioneers who shaped our world across every field.
            </p>
          </div>
          <div>
            <h3 className="font-inter text-[11px] font-medium tracking-widest uppercase text-brand-inverse mb-4">
              Explore
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Legends', id: 'legends' },
                { label: 'Traders', id: 'traders' },
                { label: 'Athletes', id: 'sports' },
                { label: 'Cricket', id: 'cricket' },
                { label: 'Science', id: 'scientists' },
                { label: 'Stories', id: 'blog' },
              ].map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="border-none bg-transparent p-0 text-left font-inter text-[13px] text-brand-muted cursor-pointer transition-colors duration-200 hover:text-brand-accent dark:text-brand-muted-dark dark:hover:text-brand-accent"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-inter text-[11px] font-medium tracking-widest uppercase text-brand-inverse mb-4">
              Company
            </h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => scrollToSection('about')}
                className="border-none bg-transparent p-0 text-left font-inter text-[13px] text-brand-muted cursor-pointer transition-colors duration-200 hover:text-brand-accent dark:text-brand-muted-dark dark:hover:text-brand-accent"
              >
                About
              </button>
              <button
                onClick={() => navigate('/blog')}
                className="border-none bg-transparent p-0 text-left font-inter text-[13px] text-brand-muted cursor-pointer transition-colors duration-200 hover:text-brand-accent dark:text-brand-muted-dark dark:hover:text-brand-accent"
              >
                Blog
              </button>
              <button
                onClick={() => navigate('/privacy')}
                className="border-none bg-transparent p-0 text-left font-inter text-[13px] text-brand-muted cursor-pointer transition-colors duration-200 hover:text-brand-accent dark:text-brand-muted-dark dark:hover:text-brand-accent"
              >
                Privacy
              </button>
              <button
                onClick={() => navigate('/terms')}
                className="border-none bg-transparent p-0 text-left font-inter text-[13px] text-brand-muted cursor-pointer transition-colors duration-200 hover:text-brand-accent dark:text-brand-muted-dark dark:hover:text-brand-accent"
              >
                Terms
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-inter text-[11px] font-medium tracking-widest uppercase text-brand-inverse mb-4">
              Connect
            </h3>
            <p className="font-inter text-[13px] text-brand-muted leading-relaxed dark:text-brand-muted-dark">
              Built with care. Powered by curiosity.
            </p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="font-inter text-[12px] text-brand-muted dark:text-brand-muted-dark">
            © {new Date().getFullYear()} Luminary. All rights reserved.
          </p>
          <p className="font-inter text-[11px] text-brand-muted/60 dark:text-brand-muted-dark/60">
            v{__APP_VERSION__} · Built {new Date(__APP_BUILD_TIME__).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>
    </footer>
  );
}
