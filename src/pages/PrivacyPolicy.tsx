import { useNavigate } from 'react-router';
import { ArrowLeft, Shield, FileText, Database, AlertTriangle, ExternalLink } from 'lucide-react';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ background: "#f1f1ee", minHeight: "100vh" }}>
      {/* Header */}
      <div className="dark-hero" style={{ background: "#282b2f", padding: 'clamp(60px, 8vw, 80px) clamp(20px, 4vw, 40px) clamp(40px, 5vw, 60px)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: 13, marginBottom: 32, padding: 0 }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ffcc00'; }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}><ArrowLeft size={16} /> Back to Home</button>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: '#f1f1ee', lineHeight: 1.15, marginBottom: 12 }}>Privacy Policy</h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: '#968671' }}>Last updated: May 24, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(40px, 6vw, 80px) clamp(20px, 4vw, 40px)' }}>

        {/* Important Notice Box */}
        <div style={{ background: 'rgba(255,204,0,0.08)', border: '1px solid rgba(255,204,0,0.2)', borderRadius: 12, padding: '24px 28px', marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <AlertTriangle size={18} style={{ color: '#ffcc00' }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: '#282b2f' }}>Important Disclaimer</span>
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.7, color: '#282b2f', margin: 0 }}>
            The Luminary Archive is an <strong>educational and informational platform only</strong>. All biographical content is compiled from publicly available sources across the internet, including Wikipedia, official biographies, news archives, and other open-source publications. While we strive for accuracy, we cannot guarantee that all information presented is complete, current, or entirely accurate. Readers are encouraged to verify facts independently.
          </p>
        </div>

        <Section icon={<Shield size={16} />} title="No Personal Data Collection">
          <p>The Luminary Archive does not collect, store, or process any personally identifiable information from visitors. We do not require account creation, login credentials, or any form of user registration to access the content on this platform.</p>
        </Section>

        <Section icon={<Database size={16} />} title="Local Storage">
          <p>We use your browser's localStorage feature solely to enhance your experience:</p>
          <ul>
            <li><strong>Bookmarks</strong> — profiles you choose to save are stored locally on your device only</li>
            <li><strong>Comparison selections</strong> — your chosen comparison profiles are stored locally</li>
            <li><strong>Dark mode preference</strong> — your theme choice is remembered across visits</li>
          </ul>
          <p>This data never leaves your browser. We do not have access to it, cannot read it, and it is not transmitted to any server. Clearing your browser data will remove these preferences.</p>
        </Section>

        <Section icon={<FileText size={16} />} title="Third-Party Content">
          <p>All biographical profiles, images, and quoted materials are sourced from publicly available information, including but not limited to:</p>
          <ul>
            <li>Wikipedia and Wikimedia Commons</li>
            <li>Official biographies and autobiographies</li>
            <li>News articles and journalistic publications</li>
            <li>Academic and historical archives</li>
            <li>AI-generated portrait illustrations (clearly marked)</li>
          </ul>
          <p>All quotes attributed to individuals are sourced from published interviews, speeches, books, and verified public statements. Every effort has been made to ensure proper attribution.</p>
        </Section>

        <Section icon={<AlertTriangle size={16} />} title="Accuracy Disclaimer">
          <p>While we make every reasonable effort to ensure the accuracy of the information presented:</p>
          <ul>
            <li>Dates, statistics, and achievements may vary across sources</li>
            <li>Net worth figures are estimates based on publicly available data</li>
            <li>Historical accounts may reflect different interpretations</li>
            <li>Information may become outdated as events unfold</li>
          </ul>
          <p><strong>This platform is provided for educational and inspirational purposes only.</strong> The content should not be considered authoritative for legal, financial, academic, or professional purposes. Always verify critical information through primary sources.</p>
        </Section>

        <Section icon={<ExternalLink size={16} />} title="External Links">
          <p>This website may contain links to external websites for further reading and reference. The Luminary Archive is not responsible for the content, privacy practices, or accuracy of information on third-party websites. Visiting external links is at your own discretion.</p>
        </Section>

        <Section icon={<Shield size={16} />} title="No Cookies or Tracking">
          <p>We do not use cookies, web beacons, analytics scripts, or any form of user tracking. We do not know who visits our site, how many visitors we receive, or what pages are viewed. Your browsing activity on this platform is completely private.</p>
        </Section>

        <Section icon={<FileText size={16} />} title="Intellectual Property">
          <p>The compilation, organization, and editorial presentation of biographical content on this platform represent original creative work. However, the underlying facts, quotes, and historical information remain in the public domain or belong to their respective original sources.</p>
          <p>AI-generated portrait images are created for illustrative purposes and do not claim to be authentic photographs. Wherever real photographs are used, they are sourced from public domain or fair-use-eligible collections.</p>
        </Section>

        <Section icon={<Shield size={16} />} title="Fair Use & Educational Purpose">
          <p>The use of quotations, historical facts, and biographical information on this platform falls under the doctrine of fair use for educational, non-commercial purposes. This platform does not generate revenue, display advertisements, or sell any products or services.</p>
        </Section>

        <Section icon={<FileText size={16} />} title="Changes to This Policy">
          <p>We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated revision date. Continued use of the platform after changes constitutes acceptance of the revised policy.</p>
        </Section>

        <Section icon={<Shield size={16} />} title="Contact">
          <p>For questions, concerns, corrections, or requests regarding this privacy policy or any content on this platform, please reach out through our submission form on the main page.</p>
        </Section>

        {/* Bottom disclaimer */}
        <div className="card-bg" style={{ marginTop: 60, padding: "24px 28px", background: "#fff", borderRadius: 12, border: '1px solid #e5e5e0' }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.7, color: '#968671', margin: 0, textAlign: 'center' }}>
            By using The Luminary Archive, you acknowledge that the content is provided <strong>"as is"</strong> for informational and educational purposes, and you agree to verify any critical information through independent primary sources.
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
