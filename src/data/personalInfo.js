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
  linkedin: "https://www.linkedin.com/in/nitinbharti1163/",
  resume: "./Nitin_Bharti.pdf",
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
  { name: "Supabase", category: "database", level: "advanced" },
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
    id: "bluespace-studio",
    company: "Bluespace Studio",
    position: "Software Developer",
    duration: "May 2025 - Present",
    location: "Agra, Uttar Pradesh",
    description: "Software Developer with hands-on experience in building business-focused web applications and internal tools using both full stack technologies and no-code/low-code platforms",
    achievements: [
      "Developed an AI-powered school management system using React.js, Tailwind CSS, Supabase, and OpenAI integration for intelligent automation",
      "Building business-focused web applications and internal tools using MERN stack (MongoDB, Express.js, React.js, Node.js)",
      "Utilizing no-code/low-code platforms like Supabase, Airtable, and Softr for rapid development and automation",
      "Working on real-world projects that solve operational challenges, improve workflows, and deliver scalable solutions for businesses",
      "Combining technical development with practical outcomes through custom dashboards, order management systems, and automated internal tools",
      "Contributing across the tech stack in fast-paced startup environments with small teams for quick iteration and impactful product development"
    ],
    technologies: ["MERN Stack", "MongoDB", "Express.js", "React.js", "Node.js", "Supabase", "Airtable", "Softr", "OpenAI", "Tailwind CSS", "JavaScript", "Git", "GitHub"]
  },
  {
    id: "ventures-grow",
    company: "Ventures Grow",
    position: "Full Stack Developer Intern",
    duration: "Oct 2024 - Apr 2025",
    location: "Noida, Uttar Pradesh",
    description: "Developed multiple full-stack web applications using MERN stack and modern UI/UX principles",
    achievements: [
      "Created multiple projects using MERN stack (MongoDB, Express.js, React.js, Node.js) for end-to-end web application development",
      "Designed and implemented modern UI/UX interfaces using React.js, Tailwind CSS, and custom CSS for enhanced user experiences",
      "Built responsive web applications with seamless frontend-backend integration and real-time data management",
      "Developed RESTful APIs using Express.js and Node.js for efficient data handling and server-side logic",
      "Implemented database design and management using MongoDB for scalable data storage and retrieval",
      "Improved application performance through code optimization, load time reduction, and cross-browser compatibility",
      "Deployed and managed multiple projects on live production servers with continuous monitoring",
      "Used Git and GitHub for structured version control, efficient team collaboration, and maintaining clean, scalable codebases"
    ],
    technologies: ["MERN Stack", "MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS", "JavaScript", "HTML", "CSS", "UI/UX", "Git", "GitHub"]
  },
  {
    id: "salesqueen",
    company: "Salesqueen Software Solutions",
    position: "Front End Developer Intern",
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
    id: "mindaku-ai",
    title: "Mindaku.AI",
    description: "Next-gen AI-powered educational platform for personalized learning",
    longDescription: "Mindaku.AI is a next-gen AI-powered educational platform focused on delivering personalized learning and reducing teacher workload, while enhancing student outcomes. It likely combines a modern tech stack: a responsive JavaScript-based frontend, scalable AI-driven backend services, cloud infrastructure, and secure data handling.",
    technologies: ["React.js", "Supabase", "Tailwind CSS", "OpenAI", "Vercel"],
    features: [
      "AI-powered personalized learning experiences",
      "Teacher workload reduction through automation",
      "Enhanced student outcomes and engagement"
    ],
    githubUrl: "https://github.com/NitinBharti007",
    liveUrl: "https://mindaku2u.com/",
    category: "webapp"
  },
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
    githubUrl: "https://github.com/NitinBharti007/My_React_Portfolio.git",
    liveUrl: "https://nitinbharti.in",
    category: "portfolio"
  },
  {
    id: "quicko-ecommerce",
    title: "Quicko E-commerce",
    description: "Fast delivery e-commerce platform with modern UI",
    longDescription: "Quicko is a modern, fast delivery e-commerce web app focused on user-friendly browsing and lightning-fast access to products. Built with React and Tailwind CSS, it features a clean UI, responsive design, and efficient product showcasing—ideal for businesses aiming to highlight fast-moving goods with style and speed.",
    technologies: ["MongoDB", "React.js", "Node.js", "Express.js", "Tailwind CSS", "Redux"],
    features: [
      "Lightning-fast product browsing and search",
      "Modern, clean UI with Tailwind CSS",
      "Responsive design for all devices",
      "Efficient product showcasing system",
      "Fast delivery focus and optimization",
      "User-friendly navigation and browsing",
      "Redux state management for performance",
      "MERN stack architecture for scalability"
    ],
    githubUrl: "https://github.com/NitinBharti007/Quicko_App.git",
    liveUrl: "https://quicko.vercel.app/",
    category: "ecommerce"
  }
];

export const education = [
  {
    degree: "Bachelor of Technology (B.Tech) in Information Technology",
    institution: "UIET CSJM University, Kanpur",
    duration: "Nov 2020 - Jun 2024",
    location: "Kanpur, Uttar Pradesh",
    details:
      "Graduated with strong foundations in software engineering, data structures & algorithms, object-oriented design, operating systems, DBMS, and modern web technologies. Led and contributed to practical projects, developed problem‑solving skills, and honed an industry‑oriented mindset through continuous learning and hands‑on development.",
  },
  {
    degree: "Intermediate (PCM)",
    institution: "Government Inter College, Basti",
    duration: "Jun 2020",
    location: "Basti, Uttar Pradesh",
    details:
      "Completed higher secondary with a focus on Physics, Chemistry, and Mathematics, building strong analytical reasoning and quantitative problem‑solving skills that translated well into computer science and software development.",
  },
  {
    degree: "High School",
    institution: "R.K. Educational Academy, Tema Rahmat, Sant Kabir Nagar",
    duration: "Apr 2018",
    location: "Sant Kabir Nagar, Uttar Pradesh",
    details:
      "Completed secondary education with a foundation in core sciences and a creative inclination toward design and drawing, encouraging a balanced approach to technical precision and user‑centric thinking.",
  },
];
