import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import LeaderPage from './pages/LeaderPage';
import BlogPage from './pages/BlogPage';
import BlogListPage from './pages/BlogListPage';
import TraderPage from './pages/TraderPage';
import SportsPersonPage from './pages/SportsPersonPage';
import CricketPage from './pages/CricketPage';
import ScientistPage from './pages/ScientistPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import CompareFloatingBar from './components/CompareFloatingBar';
import OfflineBanner from './components/OfflineBanner';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/leader/:id" element={<LeaderPage />} />
        <Route path="/trader/:id" element={<TraderPage />} />
        <Route path="/athlete/:id" element={<SportsPersonPage />} />
        <Route path="/cricketer/:id" element={<CricketPage />} />
        <Route path="/scientist/:id" element={<ScientistPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
      </Routes>
      <CompareFloatingBar />
      <OfflineBanner />
    </>
  );
}
