// Import types reference (JavaScript doesn't enforce types)
// import { PersonalInfo, Skill, Experience, Project, Education } from '@/types';

export const personalInfo = {
  name: "Nitin Bharti",
  title: "Software Developer",
  email: "dev.nitin63@gmail.com",
  phone: "+91-6394358223",
  location: "Agra, Uttar Pradesh",
  portfolio: "nitinbharti.in",
  github: "https://github.com/NitinBharti007",
  summary: "I am a Software Developer specializing in MERN stack and no-code platforms. Building business-focused web applications and internal tools that solve real operational challenges. Passionate about creating impactful solutions for startups and fast-paced environments."
};

export const skills = [
  // Languages
  { name: "HTML", category: "language", level: "expert" },
  { name: "CSS", category: "language", level: "expert" },
  { name: "JavaScript", category: "language", level: "advanced" },
  { name: "C++", category: "language", level: "intermediate" },
  { name: "SQL", category: "language", level: "intermediate" },
  
  // Frameworks
  { name: "React.js", category: "framework", level: "expert" },
  { name: "Tailwind CSS", category: "framework", level: "expert" },
  { name: "Bootstrap", category: "framework", level: "advanced" },
  { name: "Express.js", category: "framework", level: "advanced" },
  { name: "Node.js", category: "framework", level: "advanced" },
  
  // Libraries
  { name: "Material UI", category: "library", level: "advanced" },
  { name: "Redux", category: "library", level: "intermediate" },
  
  // Databases
  { name: "MongoDB", category: "database", level: "intermediate" },
  { name: "Supabase", category: "database", level: "intermediate" },
  { name: "Airtable", category: "database", level: "advanced" },
  
  // No-Code Tools & Automation
  { name: "Make", category: "other", level: "intermediate" },
  { name: "Softr", category: "other", level: "intermediate" },
  
  // Tools
  { name: "Visual Studio Code", category: "tool", level: "expert" },
  { name: "Git", category: "tool", level: "advanced" },
  { name: "GitHub", category: "tool", level: "advanced" },
  { name: "Vite", category: "tool", level: "advanced" },
  { name: "Hostinger", category: "tool", level: "intermediate" }
];

export const experiences = [
  {
    id: "ventures-grow",
    company: "Ventures Grow",
    position: "Full Stack Developer Intern",
    duration: "Oct 2024 - Mar 2025",
    location: "Remote",
    description: "Developed and optimized responsive web applications using modern technologies",
    achievements: [
      "Developed and optimized responsive web applications using React.js, Tailwind CSS, JavaScript, HTML, and CSS, ensuring seamless user experiences",
      "Improved application load times, optimized code structure, and ensured cross-browser compatibility",
      "Deployed and managed websites on live production servers",
      "Used Git and GitHub for structured version control, efficient team collaboration, and maintaining a clean codebase"
    ],
    technologies: ["React.js", "Tailwind CSS", "JavaScript", "HTML", "CSS", "Git", "GitHub"]
  },
  {
    id: "salesqueen",
    company: "Salesqueen Software Solutions",
    position: "Front End Developer Internship",
    duration: "July 2024 - Sep 2024",
    location: "Remote",
    description: "Built mobile-responsive and user-friendly web interfaces",
    achievements: [
      "Built mobile-responsive and user-friendly web interfaces using HTML, CSS, JavaScript, and Bootstrap",
      "Collaborated with design teams to implement UI/UX features, enhancing overall user experience",
      "Improved web performance by refining code structure and optimizing asset loading times",
      "Participated in thorough code reviews and debugging sessions, ensuring high-quality and error-free deliverables"
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "UI/UX"]
  }
];

export const projects = [
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    description: "A responsive portfolio website showcasing my skills and projects",
    longDescription: "Engineered a responsive website with smooth-scrolling navigation and a dynamic, component-based architecture using React.js and Vite. Implemented essential sections like Hero, Skills, Portfolio, Services, Education, and Contact using React Router DOM. Followed modern UI/UX principles and utilized React 18.3, ESLint, and Vite for efficient development and code quality assurance. Ensured cross-browser compatibility and maintainable, scalable codebase using modular React components.",
    technologies: ["React.js", "Vite", "React Router DOM", "ESLint", "CSS"],
    features: [
      "Responsive design with smooth-scrolling navigation",
      "Component-based architecture",
      "Modern UI/UX principles",
      "Cross-browser compatibility",
      "Modular and scalable codebase"
    ],
    githubUrl: "https://github.com/NitinBharti007",
    liveUrl: "https://nitinbharti.in",
    category: "portfolio"
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce platform with payment integration",
    longDescription: "Developed a responsive e-commerce platform with 100% client-side rendering, user authentication, product management, shopping cart, order tracking, Stripe payment gateway, admin dashboard, Redux Toolkit for state management, Axios for API calls, mobile-first UI with Tailwind CSS, and continuous deployment.",
    technologies: ["MERN Stack", "Redux", "Stripe", "Tailwind CSS"],
    features: [
      "User authentication and authorization",
      "Product management system",
      "Shopping cart functionality",
      "Order tracking",
      "Stripe payment integration",
      "Admin dashboard",
      "Redux state management",
      "Mobile-first responsive design"
    ],
    category: "ecommerce"
  },
  {
    id: "food-delivery-app",
    title: "Food Delivery App",
    description: "Responsive food delivery platform with modern UI/UX",
    longDescription: "Engineered a responsive food delivery platform with modern UI/UX principles, component-based architecture, dynamic menu management, cross-device compatibility, and interactive navigation.",
    technologies: ["React.js", "CSS3", "React Router DOM"],
    features: [
      "Modern UI/UX design",
      "Component-based architecture",
      "Dynamic menu management",
      "Cross-device compatibility",
      "Interactive navigation"
    ],
    category: "webapp"
  }
];

export const education = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    institution: "Your University Name",
    duration: "2021 - 2025",
    location: "Noida, India"
  }
];
