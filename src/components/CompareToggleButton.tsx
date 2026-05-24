import { useState, useCallback } from 'react';
import { GitCompare } from 'lucide-react';
import { isInCompare, toggleCompare, type CompareItem } from '../utils/compare';

interface Props {
  item: CompareItem;
  style?: React.CSSProperties;
}

export default function CompareToggleButton({ item, style }: Props) {
  const [active, setActive] = useState(() => isInCompare(item.id, item.category));
  const [full, setFull] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const result = toggleCompare(item);
    if (result === false && !isInCompare(item.id, item.category)) {
      setFull(true);
      setTimeout(() => setFull(false), 1500);
    }
    setActive(isInCompare(item.id, item.category));
  }, [item]);

  return (
    <button
      onClick={handleClick}
      title={active ? 'Remove from comparison' : full ? 'Compare list full (max 3)' : 'Add to comparison'}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: 'none',
        background: active ? '#282b2f' : full ? '#b71c1c' : 'rgba(40,43,47,0.7)',
        backdropFilter: 'blur(4px)',
        cursor: active || full ? 'pointer' : 'pointer',
        transition: 'all 0.2s ease',
        ...style,
      }}
    >
      <GitCompare size={16} color={active || full ? '#ffcc00' : '#fff'} />
    </button>
  );
}
