import React, { useState } from 'react';
import { Home, ChevronDown } from 'lucide-react';

interface DocEntry {
  slug: string;
  title: string;
  section?: string;
  Component: React.ComponentType;
}

interface DocSection {
  id: string;
  title: string;
  icon: string;
  docs: DocEntry[];
}

interface DocsSidebarProps {
  sections: DocSection[];
  indexDoc?: DocEntry;
  allDocs: DocEntry[];
  currentSlug: string;
  onNavigate: (slug: string) => void;
}

const DocsSidebar: React.FC<DocsSidebarProps> = ({
  sections,
  indexDoc,
  allDocs,
  currentSlug,
  onNavigate,
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(() => {
    // Expand section containing current doc by default
    const currentDoc = allDocs.find((d) => d.slug === currentSlug);
    if (currentDoc?.section) {
      return new Set([currentDoc.section]);
    }
    // Expand all sections by default
    return new Set(sections.map((s) => s.id));
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto pt-16 z-30">
      <div className="p-4">
        {/* Navigation */}
        <nav>
          {/* Home / Index */}
          {indexDoc && (
            <div className="mb-4">
              <button
                onClick={() => onNavigate('index')}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                  ${
                    currentSlug === 'index'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }
                `}
              >
                <Home
                  size={16}
                  className={currentSlug === 'index' ? 'text-white' : 'text-gray-400'}
                />
                {indexDoc.title}
              </button>
            </div>
          )}

          {/* Sections */}
          {sections.map((section) => {
            const isExpanded = expandedSections.has(section.id);
            const hasActiveDoc = section.docs.some((doc) => doc.slug === currentSlug);

            return (
              <div key={section.id} className="mb-2">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`
                    w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-all
                    ${hasActiveDoc ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}
                  `}
                >
                  <span className="flex items-center gap-2">
                    <span>{section.icon}</span>
                    {section.title}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Section Items */}
                {isExpanded && (
                  <ul className="mt-1 ml-3 border-l border-gray-200 space-y-1">
                    {section.docs.map((doc) => {
                      const isActive = doc.slug === currentSlug;

                      return (
                        <li key={doc.slug}>
                          <button
                            onClick={() => onNavigate(doc.slug)}
                            className={`
                              w-full flex items-center gap-2 pl-4 pr-3 py-1.5 text-sm transition-all
                              ${
                                isActive
                                  ? 'text-gray-900 font-medium border-l-2 border-gray-900 -ml-[1px]'
                                  : 'text-gray-500 hover:text-gray-900 border-l-2 border-transparent -ml-[1px] hover:border-gray-300'
                              }
                            `}
                          >
                            {doc.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400 px-3">Built with OpenBento</p>
        </div>
      </div>
    </aside>
  );
};

export default DocsSidebar;
