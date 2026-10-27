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
    label: "FRONTEND",
    summary: "React · JavaScript · Tailwind CSS · Vite",
    skills: [
      { name: "React", icon: SiReact },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
      { name: "Vite", icon: SiVite },
    ],
  },
  {
    number: "02",
    label: "PROGRAMMING",
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
    number: "03",
    label: "BACKEND & DATA",
    summary: "REST APIs · MySQL · Database Design · Relational Systems",
    skills: [
      { name: "REST APIs", icon: TbApi },
      { name: "MySQL", icon: SiMysql },
      { name: "PHP Backend", icon: SiPhp },
      { name: "Relational Modeling", icon: null },
    ],
  },
  {
    number: "04",
    label: "TOOLS & ENVIRONMENT",
    summary: "Git · GitHub · Linux/Bash · VS Code",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Linux / Bash", icon: SiLinux },
      { name: "VS Code", icon: VscCode },
    ],
  },
];

