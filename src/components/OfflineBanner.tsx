import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { isOnline, addConnectivityListeners } from '../utils/pwa';

export default function OfflineBanner() {
  const [online, setOnline] = useState(isOnline);

  useEffect(() => {
    const cleanup = addConnectivityListeners(
      () => setOnline(true),
      () => setOnline(false)
    );
    return cleanup;
  }, []);

  if (online) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: '#282b2f',
        color: '#f1f1ee',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      <WifiOff size={14} color="#ffcc00" />
      <span>You are offline. Saved profiles are available for reading.</span>
    </div>
  );
}
