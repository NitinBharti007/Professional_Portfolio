import { personalInfo } from "@/data/personalInfo";
import { smoothScrollTo } from "@/utils/smoothScroll";
import {
  Download,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Phone,
  Code,
  Database,
  Server,
  FileText,
} from "lucide-react";
import { useState, useEffect } from "react";

const TypewriterText = ({ texts, speed = 100, delay = 2000 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting && currentIndex < currentText.length) {
          // Typing phase
          setDisplayText((prev) => prev + currentText[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        } else if (!isDeleting && currentIndex === currentText.length) {
          // Wait before starting to delete
          setTimeout(() => setIsDeleting(true), delay);
        } else if (isDeleting && currentIndex > 0) {
          // Deleting phase
          setDisplayText((prev) => prev.slice(0, -1));
          setCurrentIndex((prev) => prev - 1);
        } else if (isDeleting && currentIndex === 0) {
          // Reset for next text
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      },
      isDeleting ? speed / 2 : speed
    ); // Faster deletion

    return () => clearTimeout(timeout);
  }, [currentIndex, texts, textIndex, speed, isDeleting, delay]);

  return (
    <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-gradient">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden pt-20 sm:pt-20 md:pt-24 lg:pt-0"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>

      <div className="w-[calc(100%-0.5rem)] sm:w-[calc(100%-1rem)] max-w-8xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-2 sm:space-y-4 md:space-y-6 lg:space-y-8 text-center md:text-center lg:text-left order-2 lg:order-1 mt-12 sm:mt-0 md:mt-16 lg:mt-0">
            <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
              {/* Greeting */}
              <div className="inline-flex items-center px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-full">
                <span className="text-emerald-400 text-xs sm:text-sm font-medium">
                  👋 Welcome to my portfolio
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight text-white">
                <div className="block sm:inline">Hi, I'm</div>
                <div className="block sm:inline sm:ml-2">
                  <TypewriterText
                    texts={[
                      personalInfo.name,
                      "a Vibe Coder.",
                      "a Code Artist.",
                    ]}
                    speed={150}
                    delay={2500}
                  />
                </div>
              </h1>

              {/* Subtitle */}
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-gray-300 font-medium">
                {personalInfo.title}
              </h2>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {personalInfo.summary}
            </p>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 md:gap-4 text-xs sm:text-sm text-gray-400 justify-center md:justify-center lg:justify-start">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                <span className="truncate">{personalInfo.location}</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                <span className="truncate">{personalInfo.phone}</span>
              </div>
            </div>

            {/* Social Links - Mobile First */}
            <div className="flex gap-3 sm:gap-4 md:gap-5 justify-center lg:justify-start order-1 sm:order-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-3.5 md:p-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-300 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/nitinbharti1163/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 sm:p-3.5 md:p-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-300 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              </a>
              <button 
                className="p-3 sm:p-3.5 md:p-4 rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-xl"
                style={{ 
                  backgroundColor: 'rgba(55, 65, 81, 0.8)', 
                  border: '1px solid rgba(75, 85, 99, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '1rem'
                }}
              >
                <Download className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-all duration-300" />
              </button>
            </div>

            {/* CTA Buttons - Mobile Second */}
            <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start order-2 sm:order-1">
              <button
                className="group relative flex items-center justify-center px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-500/25"
                onClick={() => smoothScrollTo("projects")}
              >
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  View My Work
                </span>
              </button>
              <button
                className="group relative flex items-center justify-center px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white rounded-xl transition-all duration-300"
                onClick={() => smoothScrollTo("contact")}
                style={{ 
                  backgroundColor: 'rgba(55, 65, 81, 0.8)', 
                  border: '1px solid rgba(75, 85, 99, 0.6)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1.5 sm:mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Get In Touch
                </span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8 pt-4 sm:pt-6 md:pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  1+
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  15+
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Projects Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  12+
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  Technologies
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex justify-center lg:justify-center mt-6 sm:mt-8 lg:mt-0 order-1 lg:order-2">
            <div className="relative">
              {/* Main Photo Circle */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
                {/* Photo with enhanced styling */}
                <div className="w-full h-full rounded-full overflow-hidden border-2 sm:border-4 border-emerald-500/30 shadow-2xl shadow-emerald-500/20">
                  <img
                    src="/photo.jpg"
                    alt="Nitin Bharti - Software Developer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Animated ring around photo */}
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400/50 animate-spin-slow"></div>
                <div className="absolute inset-1 sm:inset-2 rounded-full border border-cyan-400/30 animate-pulse"></div>
              </div>

              {/* Floating Tech Icons - 3x3 Grid Layout */}

              {/* Top Row - 3 Icons */}
              <div className="absolute -top-16 sm:-top-20 md:-top-24 left-1/2 transform -translate-x-1/2 flex gap-4 sm:gap-6 md:gap-8">
                {/* React - Top Left */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/40 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/30 animate-float">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg">
                    <img
                      src="/react.png"
                      alt="React"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* HTML - Top Center */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-400/40 rounded-xl flex items-center justify-center shadow-xl shadow-orange-500/30 animate-float-delayed">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg">
                    <img
                      src="/HTML.png"
                      alt="HTML"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Node.js - Top Right */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/40 rounded-xl flex items-center justify-center shadow-xl shadow-green-500/30 animate-float-delayed">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg">
                    <img
                      src="/node-logo.png"
                      alt="Node.js"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Left Side - 3 Icons */}
              <div className="absolute -left-16 sm:-left-20 md:-left-24 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 sm:gap-4 md:gap-6">
                {/* JavaScript - Left Top */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/40 rounded-xl flex items-center justify-center shadow-xl shadow-yellow-500/30 animate-float">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg">
                    <img
                      src="/javascript.png"
                      alt="JavaScript"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* MongoDB - Left Center */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm border border-green-400/40 rounded-xl flex items-center justify-center shadow-xl shadow-green-500/30 animate-float">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg">
                    <img
                      src="/mongodb.png"
                      alt="MongoDB"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Airtable - Left Bottom */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/40 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/30 animate-float-delayed">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg">
                    <img
                      src="/Airtable.png"
                      alt="Airtable"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side - 3 Icons */}
              <div className="absolute -right-16 sm:-right-20 md:-right-24 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 sm:gap-4 md:gap-6">
                {/* Redux - Right Top */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/40 rounded-xl flex items-center justify-center shadow-xl shadow-purple-500/30 animate-float">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg">
                    <img
                      src="/Redux.png"
                      alt="Redux"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* API - Right Center */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/40 rounded-xl flex items-center justify-center shadow-xl shadow-cyan-500/30 animate-float-delayed">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg">
                    <img
                      src="/API.png"
                      alt="API"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Make - Right Bottom */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-sm border border-pink-400/40 rounded-xl flex items-center justify-center shadow-xl shadow-pink-500/30 animate-float">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg">
                    <img
                      src="/Make.png"
                      alt="Make"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Row - 3 Icons */}
              <div className="absolute -bottom-16 sm:-bottom-20 md:-bottom-24 left-1/2 transform -translate-x-1/2 flex gap-4 sm:gap-6 md:gap-8">
                {/* Supabase - Bottom Left */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm border border-emerald-400/40 rounded-xl flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-float">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg">
                    <img
                      src="/supabase.png"
                      alt="Supabase"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Softr - Bottom Center */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-400/40 rounded-xl flex items-center justify-center shadow-xl shadow-indigo-500/30 animate-float-delayed">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg">
                    <img
                      src="/Softr.png"
                      alt="Softr"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* C++ - Bottom Right */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm border border-blue-400/40 rounded-xl flex items-center justify-center shadow-xl shadow-blue-500/30 animate-float">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg flex items-center justify-center p-1 shadow-lg">
                    <img
                      src="/cpp.png"
                      alt="C++"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
