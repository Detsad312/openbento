import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Search, FileText, ArrowRight, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DocEntry {
  slug: string;
  title: string;
  section?: string;
  Component: React.ComponentType;
}

interface DocsSearchProps {
  docs: DocEntry[];
  onNavigate: (slug: string) => void;
}

const DocsSearch: React.FC<DocsSearchProps> = ({ docs, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter docs based on query
  const filteredDocs = query.trim()
    ? docs.filter(
        (doc) =>
          doc.title.toLowerCase().includes(query.toLowerCase()) ||
          doc.section?.toLowerCase().includes(query.toLowerCase())
      )
    : docs.slice(0, 8); // Show first 8 docs when no query

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      // Escape to close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSelect = useCallback(
    (slug: string) => {
      setIsOpen(false);
      onNavigate(slug);
    },
    [onNavigate]
  );

  // Handle navigation within results
  const handleKeyNavigation = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredDocs.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && filteredDocs[selectedIndex]) {
        e.preventDefault();
        handleSelect(filteredDocs[selectedIndex].slug);
      }
    },
    [filteredDocs, selectedIndex, handleSelect]
  );

  // Scroll selected item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const selected = list.querySelector(`[data-index="${selectedIndex}"]`);
    if (selected) {
      selected.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const isMac =
    typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  // Modal content rendered via portal
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-xl"
            >
              <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                  <Search size={20} className="text-gray-400 flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyNavigation}
                    placeholder="Search documentation..."
                    className="flex-1 text-base outline-none placeholder:text-gray-400 bg-transparent"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-2 py-1 text-xs font-mono bg-gray-100 rounded text-gray-500 hover:bg-gray-200 transition-colors"
                  >
                    ESC
                  </button>
                </div>

                {/* Results */}
                <div ref={listRef} className="max-h-[50vh] sm:max-h-80 overflow-y-auto py-2">
                  {filteredDocs.length > 0 ? (
                    <ul>
                      {filteredDocs.map((doc, index) => (
                        <li key={doc.slug} data-index={index}>
                          <button
                            onClick={() => handleSelect(doc.slug)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`
                            w-full flex items-center gap-3 px-4 py-3 sm:py-2.5 text-left transition-colors
                            ${index === selectedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'}
                          `}
                          >
                            <FileText
                              size={18}
                              className={`flex-shrink-0 ${index === selectedIndex ? 'text-gray-700' : 'text-gray-400'}`}
                            />
                            <div className="flex-1 min-w-0">
                              <div
                                className={`font-medium truncate ${index === selectedIndex ? 'text-gray-900' : 'text-gray-700'}`}
                              >
                                {doc.title}
                              </div>
                              {doc.section && (
                                <div className="text-xs text-gray-400 truncate">{doc.section}</div>
                              )}
                            </div>
                            {index === selectedIndex && (
                              <ArrowRight
                                size={16}
                                className="text-gray-400 flex-shrink-0 hidden sm:block"
                              />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500">
                      No results found for "{query}"
                    </div>
                  )}
                </div>

                {/* Footer - hidden on mobile */}
                <div className="hidden sm:flex px-4 py-2 border-t border-gray-100 bg-gray-50 items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200">↓</kbd>
                    <span>to navigate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-200">↵</kbd>
                    <span>to select</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <Search size={16} />
        <span className="hidden md:inline">Search...</span>
        <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-mono bg-white rounded border border-gray-200 text-gray-400">
          {isMac ? <Command size={10} /> : 'Ctrl'}
          <span>K</span>
        </kbd>
      </button>

      {/* Render modal via portal to body */}
      {typeof document !== 'undefined' && ReactDOM.createPortal(modalContent, document.body)}
    </>
  );
};

export default DocsSearch;
