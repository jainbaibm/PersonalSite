import { Route, Routes } from 'react-router';
import { ThemeProvider } from './components/theme';
import { SiteLayout } from './layouts/SiteLayout';
import { AboutPage } from './pages/AboutPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { ArticlePage } from './pages/ArticlePage';
import { BlogPage } from './pages/BlogPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { LabEntryPage } from './pages/LabEntryPage';
import { LabPage } from './pages/LabPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ResumePage } from './pages/ResumePage';

export function App() {
  return (
    <ThemeProvider>
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="architecture" element={<ArchitecturePage />} />
        <Route path="case-studies" element={<CaseStudiesPage />} />
        <Route path="case-studies/:slug" element={<CaseStudyPage />} />
        <Route path="architecture-lab" element={<LabPage />} />
        <Route path="architecture-lab/:slug" element={<LabEntryPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<ArticlePage />} />
        <Route path="certifications" element={<CertificationsPage />} />
        <Route path="resume" element={<ResumePage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
    </ThemeProvider>
  );
}
