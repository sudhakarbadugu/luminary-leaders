import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import OfflineBanner from './OfflineBanner';

vi.mock('../utils/pwa', () => ({
  isOnline: true,
  addConnectivityListeners: () => () => {},
}));

describe('OfflineBanner', () => {
  it('renders nothing when online', () => {
    render(<OfflineBanner />);
    expect(screen.queryByText(/offline/i)).not.toBeInTheDocument();
  });
});
