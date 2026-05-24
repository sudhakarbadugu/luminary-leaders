import { Printer } from 'lucide-react';

export default function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      title="Print this page"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: '50%',
        border: 'none',
        background: 'rgba(40,43,47,0.7)',
        backdropFilter: 'blur(4px)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(40,43,47,0.9)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(40,43,47,0.7)';
      }}
    >
      <Printer size={16} color="#fff" />
    </button>
  );
}
