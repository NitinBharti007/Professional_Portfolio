import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { skills } from '@/data/personalInfo';
import { Code, Zap, Database, Wrench, Palette, Globe, Star, Award, TrendingUp } from 'lucide-react';

const Skills = () => {
  const skillCategories = {
    language: { 
      title: 'Programming Languages', 
      icon: Code, 
      color: 'from-emerald-500 to-cyan-500',
      description: 'Core programming languages'
    },
    framework: { 
      title: 'Frameworks & Libraries', 
      icon: Zap, 
      color: 'from-cyan-500 to-emerald-500',
      description: 'Modern development frameworks'
    },
    database: { 
      title: 'Databases & Storage', 
      icon: Database, 
      color: 'from-emerald-600 to-cyan-600',
      description: 'Data management solutions'
    },
    tool: { 
      title: 'Development Tools', 
      icon: Wrench, 
      color: 'from-cyan-600 to-emerald-600',
      description: 'Productivity & development tools'
    },
    design: { 
      title: 'Design & UI/UX', 
      icon: Palette, 
      color: 'from-emerald-500 to-cyan-500',
      description: 'User interface & experiences'
    },
    other: { 
      title: 'No-Code Tools', 
      icon: Globe, 
      color: 'from-cyan-500 to-emerald-500',
      description: 'No-code platforms & automation'
    }
  };

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'expert': return 'bg-emerald-500';
      case 'advanced': return 'bg-cyan-500';
      case 'intermediate': return 'bg-teal-500';
      case 'beginner': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getBadgeColor = (level) => {
    switch (level) {
      case 'expert': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300';
      case 'advanced': return 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300';
      case 'intermediate': return 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300';
      case 'beginner': return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  const getSkillLevelWidth = (level) => {
    switch (level) {
      case 'expert': return 'w-full';
      case 'advanced': return 'w-4/5';
      case 'intermediate': return 'w-3/5';
      case 'beginner': return 'w-2/5';
      default: return 'w-2/5';
    }
  };

  const additionalSkills = [
    { name: 'RESTful APIs', icon: Globe },
    { name: 'UI/UX Design', icon: Palette },
    { name: 'Version Control', icon: Code },
    { name: 'Code Optimization', icon: TrendingUp },
    { name: 'Cross-browser Compatibility', icon: Globe },
    { name: 'Responsive Design', icon: Palette },
    { name: 'Performance Optimization', icon: TrendingUp },
    { name: 'Production Deployment', icon: Wrench }
  ];

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern - Matching About Section */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-cyan-50/30 dark:from-emerald-900/5 dark:via-transparent dark:to-cyan-900/5"></div>
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-bl from-emerald-100/20 to-transparent dark:from-emerald-800/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-cyan-100/20 to-transparent dark:from-cyan-800/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Matching About Section Style */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-full mb-4 sm:mb-6">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
              <span className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">Skills & Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-white to-emerald-400 dark:from-gray-100 dark:to-emerald-400 bg-clip-text text-transparent">
                Technical Mastery
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              A comprehensive showcase of my technical skills and proficiency levels across different technologies
            </p>
          </div>

          {/* Skills Grid - Matching About Section Card Style */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
            {Object.entries(skillCategories).map(([category, info]) => {
              const categorySkills = skills.filter(skill => skill.category === category);
              if (categorySkills.length === 0) return null;
              const IconComponent = info.icon;

              return (
                <div key={category} className="group relative">
                  {/* Card Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl sm:rounded-2xl md:rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                  
                  <div className="relative bg-white dark:bg-gray-800 p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 h-full">
                    {/* Header with Icon - Matching About Section Style */}
                    <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-xl font-bold text-gray-900 dark:text-white mb-1">{info.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{info.description}</p>
                      </div>
                    </div>

                    {/* Skills List */}
                    <div className="space-y-3 sm:space-y-4">
                      {categorySkills.map((skill) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">{skill.name}</span>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeColor(skill.level)}`}>
                              {skill.level}
                            </span>
                          </div>
                           <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                             <div 
                               className={`h-1.5 rounded-full transition-all duration-1000 ${getSkillLevelColor(skill.level)} ${getSkillLevelWidth(skill.level)}`}
                             ></div>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Skills - Fully Responsive */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6">Additional Expertise</h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">Complementary skills that enhance my development capabilities</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {additionalSkills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div key={index} className="group relative">
                    {/* Card Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                    
                    <div className="relative bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 text-center h-full flex flex-col justify-between">
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-12 lg:h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-6 lg:h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h4 className="text-xs sm:text-sm md:text-base lg:text-sm font-semibold text-gray-900 dark:text-white mb-1 leading-tight">{skill.name}</h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
