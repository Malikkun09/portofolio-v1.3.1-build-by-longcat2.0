export interface Project {
  id: string;
  title: string;
  image: string;
  category: string;
  year: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: '01',
    title: 'SkillMatch',
    image: '/assets/projects/project-skillmatch.webp',
    category: 'WEB / PRODUCT / DEVELOPMENT',
    year: '2026',
    description: 'Skill-based matching platform',
  },
  {
    id: '02',
    title: 'Portfolio Website',
    image: '/assets/projects/Projek-portofolio.webp',
    category: 'WEB / DESIGN / DEVELOPMENT',
    year: '2026',
    description: 'Personal portfolio design & development',
  },
  {
    id: '03',
    title: 'Courtline',
    image: '/assets/projects/project-court.webp',
    category: 'WEB / APPLICATION / DEVELOPMENT',
    year: '2026',
    description: 'Court booking application',
  },
  {
    id: '04',
    title: 'JKN Mobile',
    image: '/assets/projects/jkn-bpjs-projek.webp',
    category: 'MOBILE / UI / DEVELOPMENT',
    year: '2026',
    description: 'Healthcare mobile application',
  },
  {
    id: '05',
    title: 'Eduverse',
    image: '/assets/projects/project-eduverse.webp',
    category: 'WEB / EDUCATION / DEVELOPMENT',
    year: '2026',
    description: 'Educational platform',
  },
];
