import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { personalInfo } from '@/data/personalInfo';
import { Code, Zap, Users, Target, Lightbulb, Rocket, Briefcase, GraduationCap, MapPin, FolderOpen, Wrench, Heart, BookOpen, Star, Award, TrendingUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const CountUpNumber = ({ target, suffix = "", duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        setCount(prev => {
          const next = prev + increment;
          if (next >= target) {
            clearInterval(timer);
            return target;
          }
          return next;
        });
      }, 16);

      return () => clearInterval(timer);
    }, [isVisible, target, duration]);

    return Math.floor(count) + suffix;
  };

  const skills = [
    { icon: Code, title: "Full-Stack Development", description: "MERN Stack Mastery", color: "from-emerald-500 to-cyan-500" },
    { icon: Zap, title: "No-Code Platforms", description: "Rapid Development", color: "from-cyan-500 to-emerald-500" },
    { icon: Users, title: "Business Solutions", description: "Internal Tools", color: "from-emerald-600 to-cyan-600" },
    { icon: Target, title: "Problem Solving", description: "Creative Solutions", color: "from-cyan-600 to-emerald-600" }
  ];

  const stats = [
    { icon: FolderOpen, number: "15+", label: "Projects", description: "Completed Successfully", color: "bg-emerald-500" },
    { icon: Wrench, number: "12+", label: "Technologies", description: "Mastered & Applied", color: "bg-cyan-500" },
    { icon: Heart, number: "100%", label: "Satisfaction", description: "Client Happy Rate", color: "bg-emerald-600" },
    { icon: BookOpen, number: "24/7", label: "Learning", description: "Continuous Growth", color: "bg-cyan-600" }
  ];

  const experiences = [
    { 
      icon: Briefcase, 
      title: "Software Developer", 
      company: "Bluespace Studio", 
      period: "Current",
      description: "Building scalable business applications and internal tools. Specializing in MERN stack development and no-code platform integrations. Creating automated workflows and custom dashboards that solve real business challenges.",
      color: "from-emerald-500 to-cyan-500"
    },
    { 
      icon: GraduationCap, 
      title: "B.Tech Information Technology", 
      company: "University", 
      period: "Graduated",
      description: "Strong foundation in programming, software development, and information systems. Comprehensive understanding of database management, networking, and system architecture principles.",
      color: "from-blue-500 to-purple-500"
    },
    { 
      icon: MapPin, 
      title: "Location", 
      company: personalInfo.location, 
      period: "Remote Available",
      description: "Open to remote opportunities worldwide. Experienced in distributed team collaboration and remote project management. Available for both full-time and contract positions.",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-bl from-emerald-200/20 to-transparent dark:from-emerald-800/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-cyan-200/20 to-transparent dark:from-cyan-800/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-emerald-100 to-cyan-100 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-full mb-4 sm:mb-6">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
              <span className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">About Me</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
              <span className="bg-gradient-to-r from-white to-emerald-400 dark:from-gray-100 dark:to-emerald-400 bg-clip-text text-transparent">
                Crafting Digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-white to-cyan-400 dark:from-gray-100 dark:to-cyan-400 bg-clip-text text-transparent">
                Experiences
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              {personalInfo.summary}
            </p>
          </div>

          {/* Stats Section */}
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-12 sm:mb-16 md:mb-20">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="group">
                    <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 text-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-12 lg:h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-6 lg:h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {stat.number === "15+" ? <CountUpNumber target={15} suffix="+" /> :
                       stat.number === "12+" ? <CountUpNumber target={12} suffix="+" /> :
                       stat.number === "100%" ? <CountUpNumber target={100} suffix="%" /> :
                       stat.number === "24/7" ? "24/7" : stat.number}
                    </div>
                    <div className="text-xs sm:text-sm md:text-base lg:text-base text-gray-700 dark:text-gray-300 font-semibold mb-1">{stat.label}</div>
                    <div className="text-xs sm:text-xs md:text-sm lg:text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.description}</div>
                  </div>
                </div>
              );
            })}
              </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16 md:mb-20 lg:items-stretch">
            {/* Skills Section */}
            <div className="flex flex-col space-y-6 sm:space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Core Expertise</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Technologies and approaches I excel in</p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-6 flex-1">
                {skills.map((skill, index) => {
                  const IconComponent = skill.icon;
                  return (
                    <div key={index} className="group h-full">
                      <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 text-center h-full flex flex-col justify-between">
                        <div>
                          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                            <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                          <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">{skill.title}</h4>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
                </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Story Section */}
            <div className="flex flex-col space-y-6 sm:space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">My Journey</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">From idea to impact</p>
                    </div>
              <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 p-6 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-emerald-100 dark:border-emerald-800/30 flex-1 flex flex-col justify-center">
                <div className="space-y-4 sm:space-y-6 text-gray-700 dark:text-gray-300">
                  <p className="text-base sm:text-lg leading-relaxed">
                    I believe in the power of technology to solve real-world problems. Whether it's building 
                    custom dashboards for data visualization, creating automated workflows that save hours of 
                    manual work, or developing scalable web applications that grow with businesses.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    My approach combines technical expertise with business understanding, ensuring that every 
                    solution I build not only works flawlessly but also delivers genuine value to users and 
                    organizations. I enjoy working in fast-paced environments where I can iterate quickly and 
                    see immediate impact.
                  </p>
                  <div className="flex items-center space-x-2 pt-2 sm:pt-4">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-300">Always learning, always building</span>
                    </div>
                  </div>
                    </div>
                    </div>
                  </div>

          {/* Experience Timeline */}
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Professional Journey</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Building expertise, one project at a time</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {experiences.map((exp, index) => {
                const IconComponent = exp.icon;
                return (
                  <div key={index} className="group">
                    <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 h-full text-left">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-8 lg:h-8 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="mb-2 sm:mb-3 md:mb-4">
                        <h4 className="text-base sm:text-lg md:text-xl lg:text-xl font-bold text-gray-900 dark:text-white mb-1">{exp.title}</h4>
                        <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-2 text-xs sm:text-sm md:text-base lg:text-base">{exp.company}</p>
                        <span className="inline-block px-2 py-1 sm:px-2 sm:py-1 md:px-3 md:py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-xs md:text-sm rounded-full">
                          {exp.period}
                        </span>
                    </div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-xs md:text-sm lg:text-sm leading-relaxed">{exp.description}</p>
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

export default About;
