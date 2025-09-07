import { education } from '@/data/personalInfo';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-cyan-50/30 dark:from-emerald-900/5 dark:via-transparent dark:to-cyan-900/5"></div>
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-bl from-emerald-100/20 to-transparent dark:from-emerald-800/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-cyan-100/20 to-transparent dark:from-cyan-800/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-full mb-4 sm:mb-6">
              <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
              <span className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">Education</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-5">
              <span className="bg-gradient-to-r from-white to-emerald-400 dark:from-gray-100 dark:to-emerald-400 bg-clip-text text-transparent">
                Academic Timeline
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              A concise timeline of my formal education and milestones
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="relative max-w-6xl mx-auto md:pr-12 lg:pr-16">
            {/* Line - match Experience */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-emerald-200 dark:bg-emerald-800 hidden md:block"></div>

            <ul className="space-y-6 sm:space-y-8 md:space-y-10">
              {education.map((item, idx) => (
                <li key={idx} className="relative">
                  {/* Dot - match Experience */}
                  <div className="absolute left-6 md:left-8 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-emerald-600 dark:bg-emerald-500 rounded-full border-2 md:border-4 border-white dark:border-gray-900 shadow-lg hidden md:block z-10"></div>

                  {/* Card */}
                  <div className="md:ml-12 lg:ml-16 w-full">
                    <div className="group relative w-full">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                      <div className="relative w-full bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700">
                        <div className="mb-3 sm:mb-4">
                          <div className="flex items-center space-x-3 sm:space-x-4 mb-2">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-tight">{item.degree}</h3>
                              <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs sm:text-sm">{item.institution}</p>
                            </div>
                          </div>

                          {/* Duration and Location - match Experience layout */}
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                            <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                              <span className="font-medium">{item.duration}</span>
                            </div>
                            {item.location && (
                              <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                                <span>{item.location}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {item.details && (
                          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            <div className="flex items-start">
                              <BookOpen className="w-4 h-4 mt-0.5 mr-2 text-emerald-500 flex-shrink-0" />
                              <span>{item.details}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
