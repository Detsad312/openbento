import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Menu, X } from 'lucide-react';
import { docsManifest, docsSections, getDocBySlug, getIndexDoc } from '../../docs/manifest';
import DocsSidebar from './DocsSidebar';
import DocsSearch from './DocsSearch';
import './docsStyles.css';

// Disable browser scroll restoration for docs navigation
if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Get current doc slug from URL
function getDocSlug(): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const pathname = window.location.pathname;
  const withoutBase = base && pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  const route = (withoutBase || '/').replace(/\/$/, '') || '/';

  // Extract slug from /doc or /doc/section/page
  const match = route.match(/^\/doc(?:\/(.*))?$/);
  if (match) {
    return match[1] || 'index';
  }
  return 'index';
}

const DocsPage: React.FC = () => {
  const slug = getDocSlug();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentDoc = useMemo(() => {
    return getDocBySlug(slug) || getIndexDoc();
  }, [slug]);

  const navigateToDoc = (newSlug: string) => {
    const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    const path = newSlug === 'index' ? '/doc' : `/doc/${newSlug}`;
    window.history.pushState({}, '', base + path);
    window.scrollTo(0, 0);
    setSidebarOpen(false);
    window.location.reload();
  };

  // Find prev/next docs
  const navigation = useMemo(() => {
    const currentIndex = docsManifest.findIndex((d) => d.slug === slug);
    const prev = currentIndex > 0 ? docsManifest[currentIndex - 1] : null;
    const next = currentIndex < docsManifest.length - 1 ? docsManifest[currentIndex + 1] : null;
    return { prev, next };
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center">
          {/* Logo section - aligned with sidebar */}
          <div className="w-64 flex-shrink-0 px-4 py-3 hidden lg:flex items-center gap-3">
            <a
              href={import.meta.env.BASE_URL || '/'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                B
              </div>
              <span className="font-semibold text-gray-900">OpenBento</span>
            </a>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600">Docs</span>
          </div>

          {/* Mobile header */}
          <div className="lg:hidden flex items-center gap-3 px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <a
              href={import.meta.env.BASE_URL || '/'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                B
              </div>
              <span className="font-semibold text-gray-900">Docs</span>
            </a>
          </div>

          {/* Right section - search and github */}
          <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3 px-4 lg:px-8 py-3">
            <DocsSearch docs={docsManifest} onNavigate={navigateToDoc} />
            <a
              href="https://github.com/yoanbernabeu/openbento"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
            >
              <Github size={16} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed left-0 top-0 bottom-0 w-64 z-50 lg:hidden"
            >
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
              <DocsSidebar
                sections={docsSections}
                indexDoc={getIndexDoc()}
                allDocs={docsManifest}
                currentSlug={slug}
                onNavigate={navigateToDoc}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <DocsSidebar
          sections={docsSections}
          indexDoc={getIndexDoc()}
          allDocs={docsManifest}
          currentSlug={slug}
          onNavigate={navigateToDoc}
        />
      </div>

      {/* Content */}
      <main className="pt-16 lg:ml-64">
        <motion.article
          key={slug}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
        >
          <div className="docs-content prose prose-gray max-w-none">
            {currentDoc ? (
              <currentDoc.Component />
            ) : (
              <div className="text-center py-20">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Page not found</h1>
                <p className="text-gray-500">The documentation page "{slug}" doesn't exist.</p>
                <button
                  onClick={() => navigateToDoc('index')}
                  className="mt-6 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition-colors"
                >
                  Go to Documentation Home
                </button>
              </div>
            )}
          </div>

          {/* Previous/Next Navigation */}
          {currentDoc && (
            <nav className="mt-12 lg:mt-16 pt-6 lg:pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                {navigation.prev ? (
                  <button
                    onClick={() => navigateToDoc(navigation.prev!.slug)}
                    className="flex flex-col items-start text-left group"
                  >
                    <span className="text-sm text-gray-500">Previous</span>
                    <span className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                      ← {navigation.prev.title}
                    </span>
                  </button>
                ) : (
                  <div />
                )}
                {navigation.next ? (
                  <button
                    onClick={() => navigateToDoc(navigation.next!.slug)}
                    className="flex flex-col items-end text-right group sm:ml-auto"
                  >
                    <span className="text-sm text-gray-500">Next</span>
                    <span className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                      {navigation.next.title} →
                    </span>
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </nav>
          )}
        </motion.article>
      </main>
    </div>
  );
};

export default DocsPage;
