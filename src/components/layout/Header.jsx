import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { smoothScrollTo } from '@/utils/smoothScroll';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Menu, X, User, Download, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    smoothScrollTo(sectionId);
    setIsMenuOpen(false);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Nitin_Bharti.pdf';
    link.download = 'Nitin_Bharti.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out rounded-full border w-[calc(100%-1rem)] max-w-8xl ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-xl border-border/50' 
        : 'bg-background/0 backdrop-blur-0 border-transparent'
    }`}>
              <div className="px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-14">
            {/* Logo - Left */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 group cursor-pointer">
              <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                <span className="text-white font-bold text-xs sm:text-sm lg:text-lg">NB</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm lg:text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                  Nitin Bharti
                </span>
                <span className="text-xs text-muted-foreground leading-tight block group-hover:text-muted-foreground/80 transition-colors duration-300">
                  Software Developer
                </span>
              </div>
            </div>
            
            {/* Navigation - Center */}
            <nav className="hidden xl:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2 -ml-8">
              {navigationItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href.replace('#', ''));
                  }}
                  className="relative text-base font-normal text-white/80 hover:text-white transition-colors duration-200 cursor-pointer no-underline hover:no-underline focus:no-underline active:no-underline visited:no-underline group"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* CTA Buttons - Right */}
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0 ml-auto">
              {/* Desktop CTA Buttons */}
              <div className="hidden xl:flex items-center space-x-4">
                <button 
                  onClick={handleDownloadCV}
                  className="group relative flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 transition-all duration-300 cursor-pointer border border-gray-600 hover:border-gray-500 rounded-xl shadow-lg hover:shadow-xl"
                >
                  <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-300">Download CV</span>
                </button>
                <button 
                  className="group relative flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500/90 to-cyan-500/90 hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-xl"
                  onClick={() => scrollToSection('contact')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Mail className="w-4 h-4 mr-2 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-300">Get In Touch</span>
                </button>
              </div>

              {/* Mobile/Tablet menu button */}
              <button
                className="xl:hidden p-2 text-white hover:text-white rounded-lg transition-all duration-300 cursor-pointer ml-1"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
              >
                {isMenuOpen ? (
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </button>
            </div>
          </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="xl:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 z-[60] shadow-xl shadow-gray-500/20 dark:shadow-black/40 animate-in slide-in-from-top-2 duration-300">
            <div className="p-3">
              {/* Navigation Links */}
              <div className="space-y-1 mb-4">
                {navigationItems.map((item) => (
                  <button 
                    key={item.name}
                    onClick={() => scrollToSection(item.href.replace('#', ''))}
                    className="group relative flex items-center w-full px-4 py-3 text-base font-medium text-gray-700 dark:text-white/90 hover:text-gray-900 dark:hover:text-white transition-all duration-300 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <span className="relative group-hover:translate-x-2 transition-transform duration-300">{item.name}</span>
                    <span className="absolute -bottom-1 left-4 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300 group-hover:w-[calc(100%-2rem)]"></span>
                  </button>
                ))}
              </div>
              
              {/* CTA Buttons */}
              <div className="flex space-x-2">
                <button 
                  onClick={handleDownloadCV}
                  className="group relative flex-1 flex items-center justify-center px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 border border-gray-600 hover:border-gray-500 rounded-lg transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl"
                >
                  <Download className="w-3 h-3 mr-1.5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Download CV</span>
                </button>
                
                <button 
                  className="group relative flex-1 flex items-center justify-center px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 overflow-hidden"
                  onClick={() => scrollToSection('contact')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Mail className="w-3 h-3 mr-1.5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">Get In Touch</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
