export interface VideoItem {
  id: string;
  title: string;
  poster: string;
  video: string;
  tags: string[];
  description: string;
}

export const videos: VideoItem[] = [
  {
    id: '01',
    title: 'YOLO-World Object Detection & Tracking System',
    poster: '/assets/videos/demo-01.jpg',
    video: '/assets/videos/demo-01.mp4',
    tags: [
      'Computer Vision',
      'YOLO-World',
      'ByteTrack',
      'Google Colab',
      'Object Detection',
      'Object Tracking',
    ],
    description: 'Experimental technical showcase',
  },
  {
    id: '02',
    title: 'AI-Assisted Portfolio Development',
    poster: '/assets/videos/demo-02.jpg',
    video: '/assets/videos/demo-02.mp4',
    tags: ['AI', 'Web Development', 'Claude Opus', 'AI-Assisted Development'],
    description: 'Creative technology experiment',
  },
];
