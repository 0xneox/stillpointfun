export interface Project {
  title: string;
  year: string;
  description: string;
  tags: string[];
  href?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Stillpoint",
    year: "2024-Present",
    description:
      "An open-source contemplative platform for the study of consciousness, philosophical inquiry, and contemplative practice. Built with TanStack Start, React, and Tailwind CSS.",
    tags: ["Open Source", "React", "Contemplative Tech"],
    href: "https://github.com/0xneox/stillpointfun",
  },
  {
    title: "AI Research Tools",
    year: "2022-2024",
    description:
      "Developed tools and infrastructure for AI research, including model evaluation frameworks, data pipelines, and experimentation platforms.",
    tags: ["AI", "Python", "Infrastructure"],
    href: "https://github.com/0xneox",
  },
  {
    title: "Software Architecture",
    year: "2015-2024",
    description:
      "Designed and implemented scalable software systems across multiple domains. Focused on clean architecture, performance optimization, and developer experience.",
    tags: ["Architecture", "Systems", "Performance"],
    href: "https://github.com/0xneox",
  },
  {
    title: "Open Source Contributions",
    year: "2015-Present",
    description:
      "Contributed to various open-source projects including frameworks, libraries, and developer tools. Maintainer of several utilities and extensions.",
    tags: ["Open Source", "Community", "Developer Tools"],
    href: "https://github.com/0xneox",
  },
];
