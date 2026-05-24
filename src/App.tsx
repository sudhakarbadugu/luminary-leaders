import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import CompareFloatingBar from './components/CompareFloatingBar';
import OfflineBanner from './components/OfflineBanner';
import ScrollToTopButton from './components/ScrollToTopButton';

const LeaderPage = lazy(() => import('./pages/LeaderPage'));
const TraderPage = lazy(() => import('./pages/TraderPage'));
const SportsPersonPage = lazy(() => import('./pages/SportsPersonPage'));
const CricketPage = lazy(() => import('./pages/CricketPage'));
const ScientistPage = lazy(() => import('./pages/ScientistPage'));
const BlogListPage = lazy(() => import('./pages/BlogListPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-bg dark:bg-brand-bg-dark">
      <div className="w-8 h-8 rounded-full border-2 border-brand-border border-t-brand-accent animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
      <CompareFloatingBar />
      <ScrollToTopButton />
      <OfflineBanner />
    </>
  );
}
