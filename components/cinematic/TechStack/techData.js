export const technologies = [
  {
    name: "React",
    category: "Frontend",
    icon: "⚛",
    color: "#61DAFB"
  },
  {
    name: "Next.js",
    category: "Framework",
    icon: "▲",
    color: "#000000"
  },
  {
    name: "JavaScript",
    category: "Language",
    icon: "JS",
    color: "#F7DF1E"
  },
  {
    name: "TypeScript",
    category: "Language",
    icon: "TS",
    color: "#3178C6"
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    icon: "🎨",
    color: "#06B6D4"
  },
  {
    name: "Java",
    category: "Language",
    icon: "☕",
    color: "#007396"
  },
  {
    name: "Spring Boot",
    category: "Backend",
    icon: "🍃",
    color: "#6DB33F"
  },
  {
    name: "Python",
    category: "Language",
    icon: "🐍",
    color: "#3776AB"
  },
  {
    name: "FastAPI",
    category: "Backend",
    icon: "⚡",
    color: "#009688"
  },
  {
    name: "MySQL",
    category: "Database",
    icon: "🐘",
    color: "#4479A1"
  },
  {
    name: "PostgreSQL",
    category: "Database",
    icon: "🐘",
    color: "#336791"
  },
  {
    name: "MongoDB",
    category: "Database",
    icon: "🍃",
    color: "#47A248"
  },
  {
    name: "Redis",
    category: "Database",
    icon: "◈",
    color: "#DC382D"
  },
  {
    name: "Docker",
    category: "DevOps",
    icon: "🐳",
    color: "#2496ED"
  },
  {
    name: "AWS",
    category: "Cloud",
    icon: "☁",
    color: "#FF9900"
  },
  {
    name: "Git",
    category: "Version Control",
    icon: "⑂",
    color: "#F05032"
  },
  {
    name: "GitHub",
    category: "Development",
    icon: "🐙",
    color: "#181717"
  },
  {
    name: "Kafka",
    category: "Streaming",
    icon: "◇",
    color: "#231F20"
  },
  {
    name: "C++",
    category: "Language",
    icon: "C++",
    color: "#00599C"
  },
  {
    name: "Figma",
    category: "Design",
    icon: "🎨",
    color: "#F24E1E"
  }
];

export const orbits = [
  {
    id: 1,
    name: "Frontend",
    technologies: ["React", "Next.js", "TypeScript", "JavaScript"],
    radius: 4.0,
    speed: 18,
    tilt: 0.15,
    direction: 1,
    spacing: 3.0 // increased angular spacing for horizontal spread
  },
  {
    id: 2,
    name: "Backend",
    technologies: ["Java", "Spring Boot", "Python", "FastAPI"],
    radius: 5.5,
    speed: 25,
    tilt: -0.25,
    direction: -1,
    spacing: 3.0
  },
  {
    id: 3,
    name: "Databases",
    technologies: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
    radius: 7.0,
    speed: 32,
    tilt: 0.35,
    direction: 1,
    spacing: 3.0
  },
  {
    id: 4,
    name: "Infrastructure",
    technologies: ["Docker", "AWS", "Kafka"],
    radius: 8.5,
    speed: 22,
    tilt: -0.15,
    direction: -1,
    spacing: 4.0 // wider spacing for fewer items
  },
  {
    id: 5,
    name: "Development",
    technologies: ["Git", "GitHub", "C++", "Figma", "Tailwind CSS"],
    radius: 10.0,
    speed: 38,
    tilt: 0.1,
    direction: 1,
    spacing: 2.5 // increased spacing for more items
  }
];
