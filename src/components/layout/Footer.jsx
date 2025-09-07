import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { personalInfo } from '@/data/personalInfo';
import { Github, Linkedin, Mail, Heart, Code, ExternalLink, Coffee, Rocket } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', url: `${personalInfo.github}`, icon: Github },
    { name: 'LinkedIn', url: `${personalInfo.linkedin}`, icon: Linkedin },
    { name: 'Email', url: `mailto:${personalInfo.email}`, icon: Mail },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-white dark:bg-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-cyan-50/30 dark:from-emerald-900/5 dark:to-cyan-900/5"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-emerald-400/10 rounded-full blur-2xl"></div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto py-6 sm:py-8 md:py-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-6 sm:mb-8 lg:mb-12">
            {/* Brand Section */}
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NB</span>
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Nitin Bharti</h3>
                  <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-medium">Software Developer</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                Creating exceptional digital experiences with modern web technologies.
              </p>
              <div className="flex justify-center sm:justify-start space-x-3">
                {socialLinks.map((link) => {
                  const IconComponent = link.icon;
                  const isMailto = typeof link.url === 'string' && link.url.startsWith('mailto:');
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target={isMailto ? undefined : '_blank'}
                      rel={isMailto ? undefined : 'noopener noreferrer'}
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                    >
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Quick Links</h3>
              <ul className="space-y-1 sm:space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <span 
                      onClick={() => {
                        const element = document.getElementById(link.href.replace('#', ''));
                        if (element) {
                          const headerHeight = window.innerWidth < 768 ? 30 : 5;
                          const elementPosition = element.offsetTop - headerHeight;
                          window.scrollTo({
                            top: elementPosition,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className="text-white text-xs sm:text-sm hover:text-emerald-400 transition-colors duration-300 relative group cursor-pointer"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

             {/* Get In Touch */}
             <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
               <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Get In Touch</h3>
               <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
                 Have a project in mind? Let's discuss how we can work together.
               </p>
               <button
                 onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                 className="group relative inline-flex items-center px-4 sm:px-6 py-1.5 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 rounded-lg sm:rounded-xl transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-emerald-500/20"
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                 <Rocket className="w-4 h-4 mr-2 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                 <span className="relative z-10 group-hover:translate-x-0.5 transition-transform duration-300">Start a Project</span>
               </button>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6 lg:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  &copy; {currentYear} Nitin Bharti. All rights reserved.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Built with React, TypeScript & Tailwind CSS
                </p>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                <span>Made with</span>
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 animate-pulse" />
                <span>and lots of</span>
                <Coffee className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 animate-bounce" />
                <span>in India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
