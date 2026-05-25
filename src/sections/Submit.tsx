import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FormErrors {
  name?: string;
  email?: string;
  nominee?: string;
  reason?: string;
  general?: string;
}

const ILLEGAL_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /<\/?[a-z][\s\S]*?>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /DROP\s+TABLE|DELETE\s+FROM|INSERT\s+INTO|SELECT\s+.*\s+FROM|UNION\s+SELECT|--|;--/gi,
  /\\x00|\\0|%00|\0/g,
  /\{\{.*?\}\}|\$\{.*?\}/g,
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[a-zA-Z\s\-'\.]+$/;

function sanitizeInput(value: string): string {
  return value.replace(/[<>\"'%;()&+]/g, '');
}

function validateField(key: string, value: string): string | undefined {
  const trimmed = value.trim();

  if (!trimmed) return 'This field is required.';

  for (const pattern of ILLEGAL_PATTERNS) {
    if (pattern.test(trimmed)) {
      return 'Invalid characters detected.';
    }
  }

  switch (key) {
    case 'name':
      if (trimmed.length < 2) return 'Name must be at least 2 characters.';
      if (trimmed.length > 100) return 'Name must be under 100 characters.';
      if (!NAME_REGEX.test(trimmed)) return 'Name can only contain letters, spaces, hyphens, and apostrophes.';
      break;
    case 'email':
      if (trimmed.length > 254) return 'Email is too long.';
      if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address.';
      break;
    case 'nominee':
      if (trimmed.length < 2) return 'Nominee name must be at least 2 characters.';
      if (trimmed.length > 100) return 'Nominee name must be under 100 characters.';
      if (!NAME_REGEX.test(trimmed)) return 'Name can only contain letters, spaces, hyphens, and apostrophes.';
      break;
    case 'reason':
      if (trimmed.length < 10) return 'Message must be at least 10 characters.';
      if (trimmed.length > 1000) return 'Message must be under 1000 characters.';
      break;
  }

  return undefined;
}

export default function Submit() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', nominee: '', reason: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.2,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (key: keyof typeof formData, value: string) => {
    const sanitized = key === 'email' ? value.trim() : sanitizeInput(value);
    setFormData(prev => ({ ...prev, [key]: sanitized }));
    if (errors[key]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof typeof formData>).forEach(key => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('https://fwdastx0oj.execute-api.ap-south-1.amazonaws.com/production/nominate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '1vFnkDsFsu7CbassjiTyN5WmqDXPbbnV6KGfeq9H',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          nomineeName: formData.nominee.trim(),
          message: formData.reason.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit nomination. Please try again.');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', nominee: '', reason: '' });
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputBaseStyle: React.CSSProperties = {
    width: '100%',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    background: 'transparent',
    padding: '14px 0',
    fontFamily: "'Inter', sans-serif",
    fontSize: 15,
    color: '#282b2f',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const renderField = (
    key: keyof typeof formData,
    placeholder: string,
    type: 'text' | 'email' = 'text',
    isTextarea = false
  ) => {
    const hasError = !!errors[key];
    const fieldStyle: React.CSSProperties = {
      ...inputBaseStyle,
      borderBottom: hasError ? '1px solid #ef4444' : '1px solid #282b2f',
      marginBottom: hasError ? 4 : 24,
    };

    const inputProps = {
      type: isTextarea ? undefined : type,
      placeholder,
      value: formData[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(key, e.target.value),
      style: isTextarea ? { ...fieldStyle, resize: 'vertical', minHeight: 100 } as React.CSSProperties : fieldStyle,
      required: false,
    };

    return (
      <div key={key}>
        {isTextarea ? (
          <textarea {...inputProps} />
        ) : (
          <input {...inputProps} />
        )}
        {hasError && (
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#ef4444', marginBottom: 16 }}>
            {errors[key]}
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="submit"
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#f1f1ee',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: 48,
        }}
      >
        <div ref={formRef} style={{ opacity: 0 }}>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: 2,
              color: '#968671',
            }}
          >
            CONTRIBUTE
          </div>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 400,
              color: '#282b2f',
              marginTop: 16,
              marginBottom: 40,
            }}
          >
            Nominate a Legend
          </h2>
          {submitted ? (
            <div
              style={{
                padding: 40,
                background: 'rgba(255,204,0,0.1)',
                borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 500, color: '#282b2f' }}>
                Thank you for your nomination!
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#968671', marginTop: 8 }}>
                We will review it against our methodology.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {renderField('name', 'Your Name')}
              {renderField('email', 'Your Email', 'email')}
              {renderField('nominee', 'Nominee Name')}
              {renderField('reason', 'Why should this person be included?', 'text', true)}
              {formData.reason && (
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    color: formData.reason.length > 1000 ? '#ef4444' : '#968671',
                    textAlign: 'right',
                    marginTop: -16,
                    marginBottom: 16,
                  }}
                >
                  {formData.reason.length} / 1000
                </div>
              )}
              {errors.general && (
                <div
                  style={{
                    padding: '12px 16px',
                    background: 'rgba(239,68,68,0.1)',
                    borderRadius: 8,
                    marginBottom: 16,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: '#ef4444',
                  }}
                >
                  {errors.general}
                </div>
              )}
              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: submitting ? '#6b7280' : '#282b2f',
                  color: '#f1f1ee',
                  borderRadius: 99,
                  padding: '16px 48px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  border: 'none',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  marginTop: 32,
                }}
                onMouseEnter={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.background = '#ffcc00';
                    e.currentTarget.style.color = '#282b2f';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.background = '#282b2f';
                    e.currentTarget.style.color = '#f1f1ee';
                  }
                }}
              >
                {submitting ? 'Submitting...' : 'Submit Nomination'}
              </button>
            </form>
          )}
        </div>
        <div ref={infoRef} style={{ opacity: 0 }}>
          <h3
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 18,
              fontWeight: 500,
              color: '#282b2f',
            }}
          >
            Who Belongs Here?
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: '#968671',
              lineHeight: 1.7,
              marginTop: 16,
            }}
          >
            We welcome nominations for technology leaders -- living or historical -- whose work has fundamentally shaped how we live, work, and connect. Innovators, founders, researchers, engineers, investors, and advocates all have a place in this archive.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: '#968671',
              lineHeight: 1.7,
              marginTop: 16,
            }}
          >
            Each nomination is reviewed against our four criteria: Impact, Innovation, Resilience, and Inspiration.
          </p>
        </div>
      </div>
    </section>
  );
}
