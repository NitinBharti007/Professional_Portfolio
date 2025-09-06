import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { experiences } from '@/data/personalInfo';
import { Briefcase, MapPin, Calendar, Code } from 'lucide-react';

const Experience = () => {
  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background Pattern - Different from Skills Section */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-indigo-50/40 dark:from-blue-900/8 dark:via-transparent dark:to-indigo-900/8"></div>
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-bl from-blue-100/25 to-transparent dark:from-blue-800/12 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-indigo-100/25 to-transparent dark:from-indigo-800/12 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Matching About Section Style */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-full mb-4 sm:mb-6">
              <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
              <span className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">Professional Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-white to-emerald-400 dark:from-gray-100 dark:to-emerald-400 bg-clip-text text-transparent">
                Career Journey
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Building experience through hands-on development and real-world projects
            </p>
          </div>

          {/* Experience Timeline - Fully Responsive */}
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line - Hidden on mobile, visible on desktop */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-emerald-200 dark:bg-emerald-800 hidden md:block"></div>
            
            <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative">
                  {/* Timeline Dot - Hidden on mobile, visible on desktop */}
                  <div className="absolute left-4 md:left-6 w-3 h-3 md:w-4 md:h-4 bg-emerald-600 dark:bg-emerald-500 rounded-full border-2 md:border-4 border-white dark:border-gray-900 shadow-lg hidden md:block z-10"></div>
                  
                  {/* Experience Card */}
                  <div className="md:ml-12 lg:ml-16">
                    <div className="group relative">
                      {/* Card Glow Effect - Only on desktop */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500 hidden md:block"></div>
                      
                      <div className="relative bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700">
                        {/* Header - Responsive Layout */}
                        <div className="mb-4 sm:mb-6">
                          <div className="flex items-center space-x-3 sm:space-x-4 mb-3">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                              <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 leading-tight">{exp.position}</h3>
                              <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm sm:text-base md:text-lg">{exp.company}</p>
                            </div>
                          </div>
                          
                          {/* Duration and Location - Better Mobile Layout */}
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                            <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              <span className="font-medium">{exp.duration}</span>
                            </div>
                            {exp.location && (
                              <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                <span>{exp.location}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">{exp.description}</p>

                        {/* Achievements Grid - Responsive */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                          {exp.achievements.slice(0, 4).map((achievement, idx) => (
                            <div key={idx} className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{achievement}</span>
                            </div>
                          ))}
                        </div>

                        {/* Technologies - Responsive */}
                        <div>
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center">
                            <Code className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-emerald-600 dark:text-emerald-400" />
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {exp.technologies.map((tech) => (
                              <span key={tech} className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm rounded-full font-medium border border-emerald-200 dark:border-emerald-700">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
