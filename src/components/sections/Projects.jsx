import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/personalInfo';
import { FolderOpen, ExternalLink, Github, Star, Code, Zap, Users, Target } from 'lucide-react';

const Projects = () => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'portfolio': return 'bg-blue-500';
      case 'ecommerce': return 'bg-green-500';
      case 'webapp': return 'bg-purple-500';
      case 'mobile': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'portfolio': return '👨‍💻';
      case 'ecommerce': return '🛒';
      case 'webapp': return '🌐';
      case 'mobile': return '📱';
      default: return '💻';
    }
  };

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern - Matching Other Sections */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-cyan-50/30 dark:from-emerald-900/5 dark:via-transparent dark:to-cyan-900/5"></div>
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-bl from-emerald-100/20 to-transparent dark:from-emerald-800/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-cyan-100/20 to-transparent dark:from-cyan-800/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Matching Other Sections */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-full mb-4 sm:mb-6">
              <FolderOpen className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
              <span className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">Featured Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-white to-emerald-400 dark:from-gray-100 dark:to-emerald-400 bg-clip-text text-transparent">
              My Recent Work
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              A showcase of my latest projects and the technologies I've used to build them
            </p>
          </div>

           {/* Projects Grid - Enhanced Styling */}
           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project) => (
               <div key={project.id} className="group relative h-full">
                 {/* Card Glow Effect */}
                 <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                 
                 <div className="relative bg-white dark:bg-gray-800 h-full flex flex-col p-4 sm:p-5 lg:p-6 xl:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 overflow-hidden">
                  {/* Project Header */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-12 lg:h-12 xl:w-14 xl:h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg lg:text-lg xl:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm lg:text-sm xl:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                          {project.description}
                        </p>
                  </div>
                </div>

                    {/* Category Badge */}
                    <div className="flex justify-start">
                      <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${getCategoryColor(project.category)} text-white`}>
                      {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center">
                      <Code className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-emerald-600 dark:text-emerald-400" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 lg:gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-2 py-1 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1.5 bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-full font-medium border border-emerald-200 dark:border-emerald-700">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full font-medium border border-gray-200 dark:border-gray-600">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-4">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                      Key Features
                    </h4>
                    <div className="space-y-1">
                      {project.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2 p-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                          <div className="w-1 h-1 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span className="text-xs text-gray-600 dark:text-gray-300 leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                   {/* Action Buttons - Always at bottom */}
                   <div className="flex gap-2 sm:gap-3 mt-auto pt-3 sm:pt-4">
                     <a
                       href={project.githubUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="group/btn relative flex-1 flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 lg:py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 border border-gray-600 hover:border-gray-500 rounded-lg transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl"
                     >
                       <Github className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 lg:mr-2 text-white group-hover/btn:scale-110 transition-transform duration-300" />
                       <span className="text-white group-hover/btn:translate-x-0.5 transition-transform duration-300">Code</span>
                     </a>
                     <a
                       href={project.liveUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="group/btn relative flex-1 flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 lg:py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 overflow-hidden"
                     >
                       <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                       <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 lg:mr-2 text-white relative z-10 group-hover/btn:scale-110 transition-transform duration-300" />
                       <span className="text-white relative z-10 group-hover/btn:translate-x-0.5 transition-transform duration-300">Live Demo</span>
                     </a>
                   </div>
                </div>
                  </div>
            ))}
          </div>

          {/* View More Projects - Simple */}
          <div className="text-center mt-8 sm:mt-12">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">Explore More Projects</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              Check out my complete portfolio on GitHub.
            </p>
            <a
              href="https://github.com/NitinBharti007"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-white relative z-10 group-hover:translate-x-0.5 transition-transform duration-300">View All Projects</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
