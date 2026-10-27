import {
  SiCplusplus,
  SiJavascript,
  SiPhp,
  SiPython,
  SiHtml5,
  SiReact,
  SiVite,
  SiMysql,
  SiGit,
  SiGithub,
  SiLinux,
  SiTailwindcss,
} from "react-icons/si";
import { FaJava, FaCss3Alt } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { VscCode } from "react-icons/vsc";

export const skillCategories = [
  {
    number: "01",
    label: "LANGUAGES & FOUNDATIONS",
    summary: "C++ · Java · Python · JavaScript · PHP",
    skills: [
      { name: "C++", icon: SiCplusplus },
      { name: "Java", icon: FaJava },
      { name: "Python", icon: SiPython },
      { name: "JavaScript", icon: SiJavascript },
      { name: "PHP", icon: SiPhp },
    ],
  },
  {
    number: "02",
    label: "FRONTEND ARCHITECTURE",
    summary: "React 18 · Vite · Tailwind CSS · HTML5 · CSS3",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Vite", icon: SiVite },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
    ],
  },
  {
    number: "03",
    label: "CORE CS, DATA & TOOLS",
    summary: "REST APIs · MySQL · Git & GitHub · Linux · VS Code",
    skills: [
      { name: "REST APIs", icon: TbApi },
      { name: "MySQL", icon: SiMysql },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Linux / Bash", icon: SiLinux },
      { name: "VS Code", icon: VscCode },
    ],
  },
];

