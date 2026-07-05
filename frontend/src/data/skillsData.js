import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaNodeJs,
  FaJava,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaCode,
  FaDatabase,
  FaDesktop,
  FaCubes,
  FaNetworkWired,
  FaCuttlefish,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiExpress,
  SiSpringboot,
  SiMongodb,
  SiMysql,
  SiPostman,
  SiCplusplus,
  SiPandas,
  SiNumpy,
} from "react-icons/si";

const skillsData = [
  {
  id: 1,
  category: "Frontend",
  skills: [
    {
      id: 1,
      name: "React.js",
      icon: FaReact,
      rating: 4.9,
      level: "Advanced",

      description:
        "Build modern, scalable Single Page Applications using reusable React components and a modular architecture.",

      experience: "2+ Years",

      technologies: [
        "Hooks",
        "Context API",
        "React Router",
        "Axios",
        "Component Architecture",
        "Responsive UI",
      ],

      projects: [
        "Portfolio Website",
        "Student Performance Predictor",
        "E-Commerce Website",
      ],
    },

    {
      id: 2,
      name: "JavaScript",
      icon: FaJs,
      rating: 4.6,
      level: "Advanced",

      description:
        "Develop interactive web applications using modern JavaScript (ES6+) with asynchronous programming and DOM manipulation.",

      experience: "2+ Years",

      technologies: [
        "ES6+",
        "DOM",
        "Promises",
        "Async / Await",
        "Fetch API",
        "Event Handling",
      ],

      projects: [
        "Portfolio Website",
        "E-Commerce Website",
        "Student Performance Predictor",
      ],
    },

    {
      id: 3,
      name: "HTML5",
      icon: FaHtml5,
      rating: 4.8,
      level: "Expert",

      description:
        "Create semantic, accessible and SEO-friendly web pages using modern HTML5 standards.",

      experience: "3+ Years",

      technologies: [
        "Semantic HTML",
        "Forms",
        "Accessibility",
        "SEO",
        "Audio & Video",
        "Tables",
      ],

      projects: [
        "Portfolio Website",
        "Landing Pages",
        "Student Portal",
      ],
    },

    {
      id: 4,
      name: "CSS3",
      icon: FaCss3Alt,
      rating: 4.7,
      level: "Advanced",

      description:
        "Design responsive, modern user interfaces using Flexbox, Grid, animations and custom styling.",

      experience: "3+ Years",

      technologies: [
        "Flexbox",
        "Grid",
        "Animations",
        "Transitions",
        "Responsive Design",
        "Media Queries",
      ],

      projects: [
        "Portfolio Website",
        "E-Commerce Website",
        "Responsive Landing Pages",
      ],
    },

    {
      id: 5,
      name: "Tailwind CSS",
      icon: SiTailwindcss,
      rating: 4.7,
      level: "Advanced",

      description:
        "Build modern responsive interfaces rapidly using utility-first Tailwind CSS and reusable design systems.",

      experience: "1+ Year",

      technologies: [
        "Utility Classes",
        "Responsive Layout",
        "Dark Mode",
        "Flexbox",
        "Grid",
        "Custom Components",
      ],

      projects: [
        "Portfolio Website",
        "Student Performance Predictor",
        "Dashboard UI",
      ],
    },
  ],
},
];

export default skillsData;