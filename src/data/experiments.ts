export interface Experiment {
  id: string;
  title: string;
  category: string;
  status: 'Active' | 'Exploring' | 'Learning' | 'Ongoing';
  tags: string[];
  description: string;
  video?: string;
  poster?: string;
}

export const experiments: Experiment[] = [
  {
    id: 'yolo-world',
    title: 'YOLO-World Object Detection & Tracking',
    category: 'Computer Vision',
    status: 'Active',
    tags: ['YOLO-World', 'ByteTrack', 'Python', 'Google Colab', 'OpenCV'],
    description:
      'Pipeline di Google Colab: video rekaman jalan diproses YOLO-World (deteksi berbasis prompt teks), dilacak ByteTrack supaya tiap objek punya ID tetap, lalu dihasilkan video beranotasi dan log deteksi.',
    video: '/assets/videos/demo-01.mp4',
    poster: '/assets/videos/demo-01.jpg',
  },
  {
    id: 'ai-portfolio',
    title: 'AI-Assisted Portfolio Development',
    category: 'Web',
    status: 'Ongoing',
    tags: ['AI', 'Claude', 'Web'],
    description:
      'Eksperimen membangun website portfolio bersama model dari Anthropic. Rekaman proses, bukan klaim bahwa seluruh karya dibuat otomatis.',
    video: '/assets/videos/demo-02.mp4',
    poster: '/assets/videos/demo-02.jpg',
  },
  {
    id: 'local-ai',
    title: 'Local AI',
    category: 'AI',
    status: 'Exploring',
    tags: ['LLM', 'Ollama', 'Local Inference'],
    description: 'Eksplorasi inference lokal — menjalankan model di mesin sendiri, tanpa mengirim semua ke cloud.',
  },
  {
    id: 'unreal',
    title: 'Unreal Engine',
    category: 'Game',
    status: 'Learning',
    tags: ['Unreal Engine', '3D', 'Blueprints'],
    description: 'Masih belajar. Ketertarikan pada lingkungan 3D, blueprints, dan kemungkinan interaktif di luar web.',
  },
  {
    id: 'motion-ui',
    title: 'UI / Motion',
    category: 'Motion',
    status: 'Ongoing',
    tags: ['GSAP', 'CSS', 'Interaction'],
    description: 'Percobaan pacing, clip, transisi, dan hierarki gerak. Situs ini adalah salah satu tempat ujinya.',
  },
];
