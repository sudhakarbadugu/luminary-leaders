import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Pause, Square, Volume2 } from 'lucide-react';

interface Props {
  text: string;
  title?: string;
}

export default function AudioNarration({ text, title }: Props) {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setSupported(false);
    }
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = useCallback(() => {
    if (!window.speechSynthesis) return;

    if (paused && utteranceRef.current) {
      window.speechSynthesis.resume();
      setPaused(false);
      setSpeaking(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find a good English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google UK English Male'))
      || voices.find(v => v.name.includes('Google US English'))
      || voices.find(v => v.name.includes('Samantha'))
      || voices.find(v => v.lang.startsWith('en') && v.name.includes('Male'))
      || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      setSpeaking(false);
      setPaused(false);
      utteranceRef.current = null;
    };

    utterance.onerror = () => {
      setSpeaking(false);
      setPaused(false);
      utteranceRef.current = null;
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
    setPaused(false);
  }, [text, paused]);

  const pause = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.pause();
      setPaused(true);
      setSpeaking(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
    setPaused(false);
    utteranceRef.current = null;
  }, []);

  if (!supported) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 20px',
        background: 'rgba(255,204,0,0.08)',
        borderRadius: 99,
        border: '1px solid rgba(255,204,0,0.2)',
        marginBottom: 32,
      }}
    >
      <Volume2 size={16} style={{ color: '#ffcc00', flexShrink: 0 }} />
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          fontWeight: 500,
          color: '#968671',
          flexShrink: 0,
        }}
      >
        Listen
      </span>

      <div style={{ display: 'flex', gap: 6 }}>
        {!speaking ? (
          <button
            onClick={speak}
            title={paused ? 'Resume' : 'Play narration'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: '50%',
              border: 'none',
              background: '#ffcc00',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Play size={14} color="#282b2f" fill="#282b2f" />
          </button>
        ) : (
          <button
            onClick={pause}
            title="Pause"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: '50%',
              border: 'none',
              background: '#ffcc00',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Pause size={14} color="#282b2f" fill="#282b2f" />
          </button>
        )}

        {(speaking || paused) && (
          <button
            onClick={stop}
            title="Stop"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: '50%',
              border: '1px solid #e5e5e0',
              background: 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <Square size={12} color="#968671" fill="#968671" />
          </button>
        )}
      </div>

      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          color: '#968671',
          opacity: 0.7,
        }}
      >
        {speaking ? 'Playing...' : paused ? 'Paused' : title || 'Narrate this biography'}
      </span>
    </div>
  );
}
