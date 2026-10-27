import { projects } from './projects';

export const searchDatabase = [
  // ── 01. PROJECTS
  ...projects.map(p => ({
    id: `project-${p.id}`,
    type: 'project',
    category: 'Projects',
    title: p.title,
    displayUrl: `deekhita.dev/projects/${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    snippet: p.summary,
    problem: p.problem,
    solution: p.solution,
    tags: p.tags,
    status: p.status,
    github: p.github,
    screens: p.screens,
    rawProject: p,
  })),

  // ── 02. SKILLS (Languages, Frontend, Core Engine, Tools)
  {
    id: 'skill-cpp',
    type: 'skill',
    category: 'Skills',
    title: 'C++ Programming & Problem Solving',
    displayUrl: 'deekhita.dev/skills/cpp',
    snippet: 'High-performance algorithm solving and software systems. Used in solving 70+ LeetCode algorithmic problems and efficient memory management.',
    tags: ['C++', 'STL', 'Algorithms', 'DSA'],
    details: {
      domain: 'Languages',
      level: 'Advanced',
      usedIn: ['70+ LeetCode Problems', 'System Algorithms & Problem Solving'],
    }
  },
  {
    id: 'skill-python',
    type: 'skill',
    category: 'Skills',
    title: 'Python Scripting & Automation',
    displayUrl: 'deekhita.dev/skills/python',
    snippet: 'Rapid prototyping, data structures testing, and script automation for algorithmic verification and problem breakdown.',
    tags: ['Python', 'Automation', 'DSA', 'Logic Verification'],
    details: {
      domain: 'Languages',
      level: 'Proficient',
      usedIn: ['Problem Solving', 'Data Scripts'],
    }
  },
  {
    id: 'skill-javascript',
    type: 'skill',
    category: 'Skills',
    title: 'JavaScript (ES6+) & Web Architecture',
    displayUrl: 'deekhita.dev/skills/javascript',
    snippet: 'Asynchronous event loop, promises, DOM manipulation, functional paradigms, and modern frontend engine logic.',
    tags: ['JavaScript', 'ES6+', 'Async/Await', 'DOM'],
    details: {
      domain: 'Languages',
      level: 'Advanced',
      usedIn: ['Blood Management System', 'Period Tracker', 'Gadget Genie'],
    }
  },
  {
    id: 'skill-react',
    type: 'skill',
    category: 'Skills',
    title: 'React 18 & Component Systems',
    displayUrl: 'deekhita.dev/skills/react',
    snippet: 'Component hierarchy design, concurrent transitions, custom hooks, context management, and clean decoupled client state.',
    tags: ['React 18', 'Hooks', 'Vite', 'Frontend Architecture'],
    details: {
      domain: 'Frontend',
      level: 'Advanced',
      usedIn: ['Blood Management System', 'Portfolio Experience'],
    }
  },
  {
    id: 'skill-vite',
    type: 'skill',
    category: 'Skills',
    title: 'Vite Next Generation Frontend Tooling',
    displayUrl: 'deekhita.dev/skills/vite',
    snippet: 'Sub-second dev server hot module reloading (HMR) and optimized Rollup asset bundle configurations.',
    tags: ['Vite', 'Build Tool', 'Bundler', 'HMR'],
    details: {
      domain: 'Frontend',
      level: 'Proficient',
      usedIn: ['Blood Management System', 'Portfolio Web'],
    }
  },
  {
    id: 'skill-tailwind',
    type: 'skill',
    category: 'Skills',
    title: 'Tailwind CSS & Design Tokens',
    displayUrl: 'deekhita.dev/skills/tailwind',
    snippet: 'Responsive design systems, design token customization, high-fidelity UI states, and utility-first layout management.',
    tags: ['Tailwind CSS', 'UI Design', 'CSS3', 'Responsive'],
    details: {
      domain: 'Frontend',
      level: 'Advanced',
      usedIn: ['Blood Management System', 'Portfolio Web'],
    }
  },
  {
    id: 'skill-dsa',
    type: 'skill',
    category: 'Skills',
    title: 'Data Structures & Algorithms (70+ Solved)',
    displayUrl: 'deekhita.dev/skills/dsa',
    snippet: 'Trees, Graphs (BFS/DFS), Dynamic Programming, Binary Search, Sliding Window, Monotonic Queues. 70+ problems solved on LeetCode.',
    tags: ['DSA', 'LeetCode', 'Trees', 'Graphs', 'DP', 'Time Complexity'],
    details: {
      domain: 'Core Engine',
      level: 'Advanced (70+ Solved: 42 Easy, 29 Med)',
      usedIn: ['LeetCode profile: @Deekhita', 'Algorithmic Optimization'],
    }
  },
  {
    id: 'skill-dbms',
    type: 'skill',
    category: 'Skills',
    title: 'DBMS & Relational Data Engineering (MySQL)',
    displayUrl: 'deekhita.dev/skills/dbms',
    snippet: 'Database normalization up to 3NF, ACID transaction guarantees, indexed foreign keys, and performant SQL queries.',
    tags: ['MySQL', 'InnoDB', 'RDBMS', 'SQL', 'ACID', '3NF'],
    details: {
      domain: 'Core Engine',
      level: 'Proficient',
      usedIn: ['Blood Management System', 'Period Tracker', 'Gadget Genie'],
    }
  },
  {
    id: 'skill-git',
    type: 'skill',
    category: 'Skills',
    title: 'Git & GitHub Collaboration',
    displayUrl: 'deekhita.dev/skills/git',
    snippet: 'Distributed version control, atomic commits, branch workflows, pull requests, issue tracking, and 284+ contributions.',
    tags: ['Git', 'GitHub', 'CI/CD', 'Version Control'],
    details: {
      domain: 'Tools',
      level: 'Advanced (284+ contributions)',
      usedIn: ['GitHub: @Deekhita-11', 'All Repositories'],
    }
  },
  {
    id: 'skill-java',
    type: 'skill',
    category: 'Skills',
    title: 'Java Programming & OOP Architecture',
    displayUrl: 'deekhita.dev/skills/java',
    snippet: 'Object-oriented application architecture, class hierarchies, multithreading, and algorithmic problem solving.',
    tags: ['Java', 'OOP', 'JVM', 'Backend', 'Software Design'],
    details: {
      domain: 'Languages',
      level: 'Proficient',
      usedIn: ['Core CS Curriculum', 'Object-Oriented Applications'],
    }
  },
  {
    id: 'skill-rest',
    type: 'skill',
    category: 'Skills',
    title: 'REST APIs & Web Services',
    displayUrl: 'deekhita.dev/skills/rest-api',
    snippet: 'Designing scalable stateless REST endpoints, JSON schemas, HTTP status protocols, and client-server integrations.',
    tags: ['REST API', 'HTTP', 'JSON', 'Endpoints', 'Web Services'],
    details: {
      domain: 'Backend',
      level: 'Advanced',
      usedIn: ['Blood Management System', 'Full-Stack Apps'],
    }
  },
  {
    id: 'skill-linux',
    type: 'skill',
    category: 'Skills',
    title: 'Linux / Bash & CLI Tooling',
    displayUrl: 'deekhita.dev/skills/linux',
    snippet: 'Command line utilities, shell scripting, environment configuration, process management, and Git workflows in UNIX environments.',
    tags: ['Linux', 'Bash', 'Shell', 'UNIX', 'CLI'],
    details: {
      domain: 'Tools',
      level: 'Proficient',
      usedIn: ['Workstation Environments', 'Automation Scripts'],
    }
  },

  // ── 03. ABOUT & EXPERIENCE
  {
    id: 'about-xim',
    type: 'about',
    category: 'About',
    title: 'Deekhita Bohidar — B.Tech CSE @ XIM University',
    displayUrl: 'deekhita.dev/about/education',
    snippet: '3rd Year Computer Science and Engineering undergraduate at XIM University, Bhubaneswar with an 8.68 / 10.0 CGPA.',
    tags: ['XIM University', 'B.Tech CSE', 'CGPA 8.68', 'Education'],
    details: {
      degree: 'B.Tech Computer Science and Engineering',
      period: '2024 — 2028',
      score: 'CGPA: 8.68 / 10.0',
    }
  },
  {
    id: 'exp-robogenix',
    type: 'experience',
    category: 'Experience',
    title: 'RobogeniX Coordinator (Robotics & IoT Club)',
    displayUrl: 'deekhita.dev/experience/robogenix',
    snippet: 'Coordinator driving student technical initiatives, development workshops, and algorithmic bootcamps.',
    tags: ['Leadership', 'RobogeniX', 'Technical Club', 'Workshops'],
    details: {
      role: 'Coordinator & Secretary',
      club: 'RobogeniX Club',
      focus: 'Technical events, student workshops',
    }
  },
  {
    id: 'exp-drdo',
    type: 'experience',
    category: 'Experience',
    title: 'ICORT 2025 DRDO — 2nd Position Exhibition Award',
    displayUrl: 'deekhita.dev/experience/drdo-icort',
    snippet: 'Awarded 2nd position at Student Project Exhibition, 4th International Conference on Range Technology (ITR-DRDO Chandipur).',
    tags: ['DRDO', 'ICORT 2025', '2nd Prize', 'Award', 'Engineering'],
    details: {
      conference: 'ICORT 2025 — ITR-DRDO Chandipur',
      rank: '2nd Position',
      project: 'Engineering Prototype',
    }
  },
  {
    id: 'exp-ieee',
    type: 'experience',
    category: 'Experience',
    title: 'IEEE Student Branch — Treasurer',
    displayUrl: 'deekhita.dev/experience/ieee',
    snippet: 'Treasurer managing finances, event allocations, and student symposiums across IEEE WIE and IEEE Computer Society chapters.',
    tags: ['IEEE', 'Treasurer', 'Leadership', 'Management'],
    details: {
      organization: 'IEEE Student Branch',
      role: 'Treasurer',
    }
  },

  // ── 04. CONTACT & PROFILES
  {
    id: 'contact-channels',
    type: 'contact',
    category: 'Contact',
    title: 'Contact Deekhita Bohidar — GitHub, LeetCode, Email',
    displayUrl: 'deekhita.dev/contact',
    snippet: 'Connect with Deekhita Bohidar for software engineering, frontend development, algorithmic discussions, or hardware projects.',
    tags: ['Email', 'GitHub', 'LeetCode', 'LinkedIn', 'Contact'],
    details: {
      email: 'deekhitabohidar@gmail.com',
      github: 'https://github.com/Deekhita-11/Deekhita-11',
      leetcode: 'https://leetcode.com/u/Deekhita/',
      location: 'Bhubaneswar, India',
    }
  }
];

export const searchShortcuts = [
  { id: 'projects', label: 'Projects', query: 'projects', iconColor: '#4285F4', letter: 'P' },
  { id: 'skills', label: 'Skills', query: 'skills', iconColor: '#EA4335', letter: 'S' },
  { id: 'about', label: 'About', query: 'about', iconColor: '#FBBC04', letter: 'A' },
  { id: 'experience', label: 'Experience', query: 'experience', iconColor: '#34A853', letter: 'E' },
  { id: 'contact', label: 'Contact', query: 'contact', iconColor: '#A142F4', letter: 'C' },
  { id: 'resume', label: 'Resume', url: '/resume.pdf', iconColor: '#FA7B17', letter: '📄' },
];
