export interface LabItem {
  id: string;
  title: string;
  status: string;
  tags: string[];
}

export const labItems: LabItem[] = [
  {
    id: '001',
    title: 'LOCAL AI',
    status: 'EXPLORING',
    tags: ['LLM', 'Ollama', 'Local Inference'],
  },
  {
    id: '002',
    title: 'COMPUTER VISION',
    status: 'ACTIVE',
    tags: ['YOLO', 'OpenCV', 'Detection'],
  },
  {
    id: '003',
    title: 'UNREAL ENGINE',
    status: 'LEARNING',
    tags: ['Game Dev', '3D', 'Blueprints'],
  },
  {
    id: '004',
    title: 'UI / MOTION EXPERIMENTS',
    status: 'ONGOING',
    tags: ['GSAP', 'Framer Motion', 'CSS'],
  },
];
