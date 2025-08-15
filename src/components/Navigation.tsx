import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: new (
          options: {
            pageLanguage: string;
            autoDisplay?: boolean;
          },
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

// CSS to hide all Google Translate UI elements and prevent translation of our selector
const hideGoogleTranslateCSS = `
  .goog-te-banner-frame,
  .goog-te-menu-frame,
  .goog-te-menu-value,
  .goog-te-menu-value span,
  .goog-te-gadget,
  .goog-te-combo,
  .goog-te-banner,
  .goog-te-ftab,
  .goog-te-menu,
  .goog-te-menu2,
  .goog-te-balloon,
  .goog-tooltip,
  .goog-tooltip:hover,
  .goog-text-highlight,
  .goog-te-spinner-pos,
  .skiptranslate {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    height: 0 !important;
    width: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    border: none !important;
    overflow: hidden !important;
  }
  body {
    top: auto !important;
  }
  .no-translate, .language-selector * {
    -webkit-translate: none !important;
    -moz-translate: none !important;
    -ms-translate: none !important;
    -o-translate: none !important;
    translate: none !important;
  }
`;

const LanguageDropdown = ({
  languages,
  changeLanguage,
  currentLanguage
}: {
  languages: { code: string; name: string }[];
  changeLanguage: (code: string) => void;
  currentLanguage: string;
}) => (
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200 no-translate">
    <div className="p-2 border-b border-gray-100">
      <h3 className="font-medium">Select Language</h3>
    </div>
    <div className="max-h-60 overflow-y-auto">
      {languages.length > 0 ? (
        languages.map((lang) => (
          <button 
            key={lang.code} 
            onClick={() => changeLanguage(lang.code)} 
            className={`w-full text-left px-4 py-2 hover:bg-blue-50 flex justify-between items-center ${
              currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            {lang.name}
            {currentLanguage === lang.code && (
              <span className="text-blue-500">✓</span>
            )}
          </button>
        ))
      ) : (
        <p className="p-4 text-sm text-center text-gray-500">Loading languages...</p>
      )}
    </div>
  </div>
);

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [languages, setLanguages] = useState<Array<{code: string, name: string}>>([]);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const location = useLocation();
  const desktopLangRef = useRef<HTMLDivElement>(null);
  const mobileLangRef = useRef<HTMLDivElement>(null);

  // Inject CSS to hide Google Translate UI
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = hideGoogleTranslateCSS;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Book Appointment', path: '/booking' },
    { name: 'Contact', path: '/contact' },
  ];

  const googleTranslateElementInit = useCallback(() => {
    if (window.google?.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false
        },
        "google_translate_element"
      );

      // Add English option manually since Google Translate might not include it
      const englishOption = {
        code: 'en',
        name: 'English'
      };

      const observer = new MutationObserver(() => {
        const select = document.querySelector<HTMLSelectElement>('select.goog-te-combo');
        if (select && select.options.length > 1) {
          const extractedLangs = Array.from(select.options)
            .filter(option => option.value)
            .map(option => ({
              code: option.value,
              name: option.text || option.value
            }));
          
          // Combine English with other languages and remove duplicates
          const allLangs = [englishOption, ...extractedLangs];
          const uniqueLangs = allLangs.filter((lang, index, self) =>
            index === self.findIndex((t) => (
              t.code === lang.code
            ))
          );
          
          setLanguages(uniqueLangs);
          observer.disconnect();
        }
      });

      const translateElement = document.getElementById('google_translate_element');
      if (translateElement) {
        observer.observe(translateElement, {
          childList: true,
          subtree: true,
        });
      } else {
        // If Google Translate element doesn't load, still show English
        setLanguages([englishOption]);
      }
    }
  }, [setLanguages]);

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;

    return () => {
      delete window.googleTranslateElementInit;
      document.body.removeChild(addScript);
    };
  }, [googleTranslateElementInit]);

  const changeLanguage = (langCode: string) => {
    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      setCurrentLanguage(langCode);
    }
    setShowLanguages(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopLangRef.current && !desktopLangRef.current.contains(event.target as Node) &&
        mobileLangRef.current && !mobileLangRef.current.contains(event.target as Node)
      ) {
        setShowLanguages(false);
      }
    };

    if (showLanguages) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguages]);

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo and Branding */}
          <div className="flex items-center ml-0">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/bce15a11-fe78-49dc-8d44-1339cd299a99.png" 
                alt="ProTax by KC & Associates Logo" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="font-heading font-bold text-slate-900 text-xl">ProTax by KC</h1>
                <p className="text-sm text-slate-600">& Associates</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium relative group ${
                  location.pathname === item.path ? 'text-blue-600' : ''
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full ${
                  location.pathname === item.path ? 'w-full' : ''
                }`}></span>
              </Link>
            ))}

            <Link to="/booking">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                Get Started
              </Button>
            </Link>
            
            {/* Language Selector */}
            <div className="relative mr-0 no-translate language-selector" ref={desktopLangRef}>
              <button 
                onClick={() => setShowLanguages(!showLanguages)} 
                className="flex items-center p-2 hover:bg-gray-100 rounded-full -mr-1"
                aria-label="Select language"
              >
                <Globe size={20} />
                <span className="ml-1 text-sm font-medium">
                  {languages.find(l => l.code === currentLanguage)?.code.toUpperCase() || 'EN'}
                </span>
              </button>
              {showLanguages && (
                <LanguageDropdown 
                  languages={languages} 
                  changeLanguage={changeLanguage}
                  currentLanguage={currentLanguage}
                />
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <div className="relative mr-1 no-translate language-selector" ref={mobileLangRef}>
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center p-2"
                aria-label="Select language"
              >
                <Globe size={20} />
                <span className="ml-1 text-sm font-medium">
                  {languages.find(l => l.code === currentLanguage)?.code.toUpperCase() || 'EN'}
                </span>
              </button>
              {showLanguages && (
                <LanguageDropdown 
                  languages={languages} 
                  changeLanguage={changeLanguage}
                  currentLanguage={currentLanguage}
                />
              )}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-blue-600 p-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-6 space-y-1 bg-white border-t border-slate-200">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-4">
                <Link to="/booking" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Hidden Google Translate element */}
      <div id="google_translate_element" className="hidden">Translate</div>
    </nav>
  );
};

export default Navigation;