import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ScrollToTopButton from './ScrollToTopButton';

describe('ScrollToTopButton', () => {
  beforeEach(() => {
    vi.stubGlobal('scrollY', 0);
  });

  it('renders a button with correct aria-label', () => {
    render(<ScrollToTopButton />);
    const button = screen.getByLabelText('Scroll to top');
    expect(button).toBeInTheDocument();
  });

  it('scrolls to top when clicked', () => {
    const scrollToSpy = vi.fn();
    vi.stubGlobal('scrollTo', scrollToSpy);
    render(<ScrollToTopButton />);
    const button = screen.getByLabelText('Scroll to top');
    fireEvent.click(button);
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('has fixed positioning class', () => {
    render(<ScrollToTopButton />);
    const button = screen.getByLabelText('Scroll to top');
    expect(button.className).toContain('fixed');
  });
});
