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
      className="fixed inset-x-0 top-0 z-[9999] flex items-center justify-center gap-2.5 bg-brand-dark text-brand-inverse px-5 py-2.5 font-inter text-[13px] font-medium"
    >
      <WifiOff size={14} color="#ffcc00" />
      <span>You are offline. Saved profiles are available for reading.</span>
    </div>
  );
}
