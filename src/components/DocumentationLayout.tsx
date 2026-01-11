import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface DocumentationLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated: string;
  sections: Array<{
    id: string;
    title: string;
    items?: Array<{ id: string; title: string }>;
  }>;
  currentSection?: string;
}

const DocumentationLayout: React.FC<DocumentationLayoutProps> = ({
  children,
  title,
  lastUpdated,
  sections,
  currentSection = 'privacy', // 'privacy' or 'terms'
}) => {
  const [activeId, setActiveId] = useState('');
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    // Observe all section headings
    document.querySelectorAll('h2[id], h3[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-1 text-sm text-gray-500">Last updated: {lastUpdated}</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left sidebar - Navigation */}
          <aside className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-6 space-y-1">
              <Link 
                to="/privacy-policy" 
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  currentSection === 'privacy' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <ChevronRight className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                Privacy Policy
              </Link>
              <Link 
                to="/terms-and-conditions" 
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  currentSection === 'terms' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <ChevronRight className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                Terms & Conditions
              </Link>
            </nav>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-7">
            <div className="prose prose-blue max-w-none">
              {children}
            </div>
          </main>

          {/* Right sidebar - On this page */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                On this page
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <div key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={`block text-sm ${
                        activeId === section.id
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {section.title}
                    </a>
                    {section.items && (
                      <div className="ml-3 mt-1 space-y-1">
                        {section.items.map((item) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`block text-sm ${
                              activeId === item.id
                                ? 'text-blue-600 font-medium'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DocumentationLayout;
