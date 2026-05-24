import { useCallback, useState } from 'react';
import { Menu, X } from 'lucide-react';
import DarkModeToggle from '../components/DarkModeToggle';
import { useIsMobile } from '../hooks/useMediaQuery';

interface NavigationProps {
  lenisRef: React.MutableRefObject<any>;
}

export default function Navigation({ lenisRef }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const scrollTo = useCallback((target: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.2 });
    }
    setMenuOpen(false);
  }, [lenisRef]);

  const links = [
    { label: 'Legends', target: '#legends' },
    { label: 'Traders', target: '#traders' },
    { label: 'Athletes', target: '#sports' },
    { label: 'Cricket', target: '#cricket' },
    { label: 'Science', target: '#scientists' },
    { label: 'Stories', target: '#blog' },
    { label: 'About', target: '#about' },
    { label: 'Submit', target: '#submit' },
  ];

  return (
    <nav className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between border-b border-brand-border bg-brand-nav-bg backdrop-blur-[10px] dark:bg-brand-nav-bg-dark dark:border-brand-border-dark h-16 px-5 md:px-10">
      <a
        href="/"
        className="font-inter text-[13px] font-medium tracking-widest uppercase text-brand-dark dark:text-brand-text-dark no-underline transition-colors duration-200 hover:text-brand-accent shrink-0"
      >
        LUMINARY
      </a>

      {isMobile ? (
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center border-none bg-transparent p-1 text-brand-dark dark:text-brand-text-dark cursor-pointer"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              className="border-none bg-transparent p-0 font-inter text-[13px] tracking-wide text-brand-dark dark:text-brand-text-dark cursor-pointer transition-colors duration-200 hover:text-brand-accent whitespace-nowrap"
            >
              {link.label}
            </button>
          ))}
          <DarkModeToggle />
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {isMobile && menuOpen && (
        <div className="absolute inset-x-0 top-16 z-[99] flex flex-col gap-4 border-b border-brand-border bg-brand-nav-bg/[0.98] backdrop-blur-[10px] px-5 pt-4 pb-6 dark:bg-brand-nav-bg-dark dark:border-brand-border-dark">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.target)}
              className="border-none bg-transparent p-0 pb-2 font-inter text-[15px] tracking-wide text-brand-dark dark:text-brand-text-dark cursor-pointer text-left transition-colors duration-200 hover:text-brand-accent"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
