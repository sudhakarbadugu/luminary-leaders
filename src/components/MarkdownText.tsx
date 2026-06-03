import type { ReactNode } from 'react';

interface MarkdownTextProps {
  text?: string;
}

function normalizeText(text: string) {
  return text
    .replace(/\r\n/g, '\n')
    .replace(/\s+(?=\*\*[^*]+:\*\*)/g, '\n')
    .trim();
}

function renderMarkdownText(text?: string): ReactNode {
  if (!text) return null;

  const normalized = normalizeText(text);
  const parts = normalized.split(/(\*\*[^*]+\*\*|\n)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part === '\n') return <br key={`br-${index}`} />;

    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return <span key={index}>{part}</span>;
  });
}

export default function MarkdownText({ text }: MarkdownTextProps) {
  return <>{renderMarkdownText(text)}</>;
}
