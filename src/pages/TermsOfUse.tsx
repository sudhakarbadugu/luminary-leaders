import { useNavigate } from 'react-router';
import { ArrowLeft, FileText, BookOpen, AlertCircle, Copyright, Scale } from 'lucide-react';

export default function TermsOfUse() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#f1f1ee', minHeight: '100vh' }}>
      <div style={{ background: '#282b2f', padding: '80px 40px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 13, marginBottom: 32, padding: 0 }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ffcc00'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}><ArrowLeft size={16} /> Back to Home</button>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: '#f1f1ee', lineHeight: 1.15, marginBottom: 12 }}>Terms of Use & Disclaimer</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#968671' }}>Last updated: May 24, 2026</p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '80px 40px' }}>

        <Section icon={<FileText size={16} />} title="Acceptance of Terms">
          <p>By accessing and using The Luminary Archive, you accept and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree with any part of these terms, please discontinue use of this platform immediately.</p>
        </Section>

        <Section icon={<BookOpen size={16} />} title="Educational Purpose Only">
          <p>The Luminary Archive is a free, non-commercial educational resource. All content is provided for <strong>informational and inspirational purposes only</strong>. Nothing on this platform constitutes professional, legal, financial, medical, or academic advice.</p>
        </Section>

        <Section icon={<AlertCircle size={16} />} title="No Warranties">
          <p>This platform is provided on an <strong>"as is" and "as available"</strong> basis without any warranties of any kind, either express or implied. We expressly disclaim all warranties including but not limited to:</p>
          <ul>
            <li>Accuracy, completeness, or timeliness of any biographical content</li>
            <li>Fitness for a particular purpose</li>
            <li>Non-infringement of third-party rights</li>
            <li>Reliability of external links or references</li>
          </ul>
          <p>While we make reasonable efforts to verify the accuracy of all published content, we cannot and do not guarantee that every detail, date, statistic, or statement is entirely accurate or current.</p>
        </Section>

        <Section icon={<Copyright size={16} />} title="Content Sources & Attribution">
          <p>Biographical information is compiled from publicly available sources including Wikipedia, news archives, published biographies, official records, and other open-source materials. All direct quotes are attributed to their original sources to the best of our knowledge.</p>
          <p>Portrait images are either AI-generated illustrations (for visual representation) or sourced from public domain collections. AI-generated images are clearly distinguished from authentic photographs.</p>
        </Section>

        <Section icon={<Scale size={16} />} title="Limitation of Liability">
          <p>To the maximum extent permitted by applicable law, The Luminary Archive and its creators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from:</p>
          <ul>
            <li>Your use of or inability to use this platform</li>
            <li>Any content you read or rely upon</li>
            <li>Any errors, inaccuracies, or omissions in the content</li>
            <li>Any action taken based on information from this platform</li>
            <li>Any unauthorized access to or alteration of your local data</li>
          </ul>
        </Section>

        <Section icon={<FileText size={16} />} title="User Conduct">
          <p>You agree to use this platform only for lawful purposes. Prohibited activities include:</p>
          <ul>
            <li>Using content for commercial purposes without permission</li>
            <li>Systematic scraping or automated data extraction</li>
            <li>Attempting to interfere with the platform's functionality</li>
            <li>Using the platform to distribute malware or harmful code</li>
          </ul>
        </Section>

        <Section icon={<Copyright size={16} />} title="Copyright & Fair Use">
          <p>The editorial compilation, organization, and presentation of content on The Luminary Archive represents original creative work. Underlying facts, historical events, and public information are not subject to copyright.</p>
          <p>Short quotations and factual summaries used for educational purposes fall under fair use doctrine. If you are a rights holder and believe any content infringes upon your copyright, please contact us for prompt review and resolution.</p>
        </Section>

        <Section icon={<FileText size={16} />} title="Modifications">
          <p>We reserve the right to modify these Terms of Use at any time. Changes will be posted on this page with an updated date. Your continued use of the platform after changes constitutes acceptance of the modified terms.</p>
        </Section>

        <Section icon={<Scale size={16} />} title="Governing Law">
          <p>These Terms of Use shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.</p>
        </Section>

        <div style={{ marginTop: 60, padding: '24px 28px', background: 'rgba(255,204,0,0.08)', borderRadius: 12, border: '1px solid rgba(255,204,0,0.2)' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.7, color: '#282b2f', margin: 0, textAlign: 'center' }}>
            <strong>The Luminary Archive is a free educational resource.</strong> We are not affiliated with any of the individuals profiled, their estates, families, or representatives. All trademarks, registered names, and logos mentioned belong to their respective owners.
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ color: '#ffcc00' }}>{icon}</span>
        <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600, color: '#282b2f', margin: 0 }}>{title}</h2>
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.8, color: '#282b2f' }}>
        {children}
      </div>
    </div>
  );
}
