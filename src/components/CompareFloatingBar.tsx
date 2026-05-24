import { useState, useEffect } from 'react';
import { getCompareItems, clearCompare, type CompareItem } from '../utils/compare';
import CompareModal from './CompareModal';
import { GitCompare, X, Users } from 'lucide-react';

export default function CompareFloatingBar() {
  const [items, setItems] = useState<CompareItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(getCompareItems());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (items.length === 0) return null;

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-4 max-w-[90vw] rounded-xl bg-brand-dark px-5 py-3 shadow-2xl dark:bg-brand-float-bg-dark">
        <Users size={16} className="text-brand-accent shrink-0" />
        <div className="flex gap-2 max-w-[300px] overflow-auto">
          {items.map(item => (
            <span key={`${item.category}-${item.id}`} className="whitespace-nowrap rounded-full bg-white/10 px-2.5 py-0.5 font-inter text-[11px] text-brand-inverse dark:text-brand-text-dark">{item.name}</span>
          ))}
        </div>
        <button
          onClick={() => setModalOpen(true)}
          disabled={items.length < 2}
          className="flex items-center gap-1.5 shrink-0 rounded-full border-none px-4 py-1.5 font-inter text-xs font-semibold transition-colors bg-brand-accent text-brand-dark disabled:bg-white/10 disabled:text-brand-muted disabled:cursor-not-allowed"
        >
          <GitCompare size={14} /> Compare
        </button>
        <button
          onClick={() => { clearCompare(); setItems([]); }}
          className="shrink-0 border-none bg-transparent p-1 text-brand-muted cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>
      {modalOpen && <CompareModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
