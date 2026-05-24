import { useState, useCallback } from 'react';
import { Share2, Link2, Check, Twitter, Facebook } from 'lucide-react';

interface Props {
  url?: string;
  title?: string;
  quote?: string;
}

export default function ShareButton({ url, title, quote }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = title || 'The Luminary Archive';
  const shareText = quote ? `"${quote}" — ${shareTitle}` : shareTitle;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = shareUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [shareUrl]);

  const shareTwitter = () => {
    const text = encodeURIComponent(shareText);
    const url = encodeURIComponent(shareUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'width=600,height=400');
  };

  const shareFacebook = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
  };

  if (typeof navigator !== 'undefined' && navigator.share) {
    return (
      <button
        onClick={async () => {
          try {
            await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
          } catch {
            // User cancelled
          }
        }}
        title="Share"
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
      >
        <Share2 size={16} color="#fff" />
      </button>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        title="Share"
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
      >
        <Share2 size={16} color="#fff" />
      </button>

      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 149 }} onClick={() => setOpen(false)} />
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              zIndex: 150,
              background: '#fff',
              borderRadius: 12,
              padding: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: 160,
            }}
          >
            <ShareOption onClick={shareTwitter} icon={<Twitter size={14} />} label="Twitter / X" />
            <ShareOption onClick={shareFacebook} icon={<Facebook size={14} />} label="Facebook" />
            <div style={{ height: 1, background: '#e5e5e0', margin: '4px 0' }} />
            <ShareOption
              onClick={handleCopy}
              icon={copied ? <Check size={14} color="#2e7d32" /> : <Link2 size={14} />}
              label={copied ? 'Copied!' : 'Copy link'}
            />
          </div>
        </>
      )}
    </div>
  );
}

function ShareOption({ onClick, icon, label }: { onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 12px',
        borderRadius: 8,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        color: '#282b2f',
        transition: 'background 0.2s',
        width: '100%',
        textAlign: 'left',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#f1f1ee'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
    >
      {icon}
      {label}
    </button>
  );
}
