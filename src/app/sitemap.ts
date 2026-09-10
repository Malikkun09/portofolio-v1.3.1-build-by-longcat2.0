import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = projects.map((project) => ({
    url: `https://malikfajar.me/work/${project.id}`,
    lastModified: new Date('2026-09-10'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: 'https://malikfajar.me',
      lastModified: new Date('2026-09-10'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectEntries,
  ];
}
