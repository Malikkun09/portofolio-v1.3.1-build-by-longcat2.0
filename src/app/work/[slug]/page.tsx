import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNextProject, getProject, projects } from '@/data/projects';
import { CaseStudy } from '@/components/projects/CaseStudy';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project' };
  return {
    title: project.title,
    description: project.short,
    alternates: { canonical: `/work/${project.id}` },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(project.id);

  return <CaseStudy project={project} next={next} />;
}
