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
} from "react-icons/si";
import { FaJava, FaCss3Alt } from "react-icons/fa";
import { HiChip } from "react-icons/hi";

export const skillCategories = [
  {
    number: "01",
    label: "FRONTEND",
    summary: "React · JavaScript · HTML · CSS",
    skills: [
      { name: "React", icon: SiReact },
      { name: "JavaScript", icon: SiJavascript },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: FaCss3Alt },
      { name: "Vite", icon: SiVite },
    ],
  },
  {
    number: "02",
    label: "PROGRAMMING",
    summary: "Python · C++ · Java · PHP",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "C++", icon: SiCplusplus },
      { name: "Java", icon: FaJava },
      { name: "PHP", icon: SiPhp },
    ],
  },
  {
    number: "03",
    label: "ROBOTICS",
    summary: "Arduino · IR Sensors · Embedded",
    skills: [
      { name: "Arduino IDE", icon: HiChip },
      { name: "C/C++", icon: SiCplusplus },
      { name: "IR Sensors", icon: null },
      { name: "Motor Drivers", icon: null },
      { name: "Embedded Systems", icon: null },
    ],
  },
  {
    number: "04",
    label: "TOOLS",
    summary: "Git · GitHub · MySQL",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "MySQL", icon: SiMysql },
    ],
  },
];
