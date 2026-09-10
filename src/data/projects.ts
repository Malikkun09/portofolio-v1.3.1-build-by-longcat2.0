export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  kind: string;
  year: string;
  short: string;
  description: string;
  purpose?: string;
  approach?: string;
  result?: string;
  technologies: string[];
  image: string | null;
  video: string | null;
  poster: string | null;
  videoNote?: string;
  status: string;
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: 'inventaris',
    index: '01',
    title: 'Sistem Inventaris Barang',
    kind: 'PKL — Laravel',
    year: '2026',
    short:
      'Aplikasi CRUD manajemen inventaris (barang, kategori, pegawai, transaksi stok) dengan kontrol akses berbasis role.',
    description:
      'Backend Laravel 13 / PHP 8.3 dengan Blade + AdminLTE 3 dan database MySQL. Empat level akses (Super Admin, Admin, Staff Gudang, Viewer), ledger transaksi stok masuk/keluar, activity log, serta audit keamanan adversarial: perbaikan injection, auth/sesi, integritas transaksi stok, dan 46 test regresi.',
    purpose:
      'Sistem inventaris untuk kebutuhan PKL: mencatat barang, kategori, pegawai, dan pergerakan stok dengan akses yang terpisah per peran.',
    approach:
      'Dibangun dengan Laravel 13, Blade, AdminLTE 3, dan MySQL. Role-based access, stock ledger, activity log, lalu diuji lewat audit keamanan dan regresi.',
    result: 'Deployed ke shared hosting. 46 test regresi hijau. Kode ada di GitHub.',
    technologies: ['Laravel', 'PHP 8.3', 'MySQL', 'Blade', 'AdminLTE 3', 'Inertia'],
    image: null,
    video: null,
    poster: null,
    status: 'Live',
    links: [
      {
        label: 'Source',
        href: 'https://github.com/Malikkun09/pkl-crud-laravel-2',
      },
    ],
  },
  {
    id: 'portfolio',
    index: '02',
    title: 'Portfolio Website',
    kind: 'Personal Website',
    year: '2026',
    short:
      'Website pribadi untuk menampilkan identitas, skill, dan hasil karya dengan tampilan yang modern.',
    description:
      'Rumah digital di domain malikfajar.me — identitas, skill, karya, dan eksperimen visual dikemas dalam satu pengalaman.',
    purpose: 'Menyimpan dan menampilkan identitas, karya, dan eksperimen di satu alamat.',
    technologies: ['JavaScript', 'React', 'CSS'],
    image: '/assets/projects/Projek-portofolio.webp',
    video: '/assets/videos/demo-02.mp4',
    poster: '/assets/videos/demo-02.jpg',
    videoNote: 'Build web with AI — rekaman proses',
    status: 'Live',
    links: [{ label: 'Open', href: 'https://malikfajar.me' }],
  },
  {
    id: 'skillmatch',
    index: '03',
    title: 'SkillMatch / KerjaIn',
    kind: 'Web Platform',
    year: '2026',
    short:
      'Platform web untuk membantu siswa SMK mencari peluang kerja, magang, dan mengelola informasi karier.',
    description:
      'Dibuat untuk menjembatani siswa SMK dengan peluang kerja dan magang: pencarian peluang, profil keahlian, dan informasi karier dalam satu platform. Capstone Coding Camp 2026 (DBS Foundation) dengan nama proyek Kerjain: Bridge Your Skills, tema Future-Ready Work & Economy.',
    purpose:
      'Menjembatani siswa SMK dengan peluang kerja dan magang lewat satu tempat untuk profil keahlian dan informasi karier.',
    technologies: ['JavaScript', 'React', 'CSS'],
    image: '/assets/projects/project-skillmatch.webp',
    video: null,
    poster: null,
    status: 'Live',
    links: [{ label: 'Open', href: 'https://skillmatch.malikfajar.me' }],
  },
  {
    id: 'courtline',
    index: '04',
    title: 'Courtline',
    kind: 'Visual Experiment',
    year: '2026',
    short:
      'Eksperimen website dengan elemen animasi, interaksi visual, dan tampilan modern.',
    description:
      'Playground animasi dan interaksi visual — eksplorasi motion, transisi, dan komposisi tampilan modern di web.',
    purpose: 'Menguji motion, transisi, dan komposisi visual di website.',
    technologies: ['JavaScript', 'React', 'Animation'],
    image: '/assets/projects/project-court.webp',
    video: null,
    poster: null,
    status: 'Live',
    links: [{ label: 'Open', href: 'https://courtline.malikfajar.me' }],
  },
  {
    id: 'jkn-bpjs',
    index: '05',
    title: 'JKN BPJS',
    kind: 'Hackathon App',
    year: '2026',
    short:
      'Aplikasi untuk membantu pengguna JKN BPJS mengakses layanan kesehatan dengan antarmuka yang lebih mudah dipakai.',
    description:
      'Proyek hackathon: menyatukan akses layanan kesehatan JKN BPJS lewat antarmuka yang bersih, cepat, dan mudah dipakai.',
    purpose: 'Memudahkan akses layanan kesehatan JKN BPJS dari satu antarmuka.',
    technologies: ['JavaScript', 'UI/UX', 'CSS'],
    image: '/assets/projects/jkn-bpjs-projek.webp',
    video: null,
    poster: null,
    status: 'Live',
    links: [{ label: 'Open', href: 'https://jkn-bpjs-projek.malikfajar.my.id' }],
  },
  {
    id: 'eduverse',
    index: '06',
    title: 'EduVerse',
    kind: 'Education Platform',
    year: '2026',
    short:
      'Website edukasi untuk mengakses materi pembelajaran melalui tampilan brutalist yang modern dan fungsional.',
    description:
      'Platform materi belajar dengan gaya brutalist-modern: konten edukasi yang mudah diakses tanpa mengorbankan karakter visual.',
    purpose: 'Menyediakan materi belajar yang mudah diakses, dengan karakter visual yang jelas.',
    technologies: ['JavaScript', 'React', 'CSS'],
    image: '/assets/projects/project-eduverse.webp',
    video: null,
    poster: null,
    status: 'Live',
    links: [{ label: 'Open', href: 'https://eduverse.malikfajar.my.id' }],
  },
];

export const getProject = (id: string) => projects.find((project) => project.id === id);

export const getNextProject = (id: string) => {
  const index = projects.findIndex((project) => project.id === id);
  if (index === -1) return projects[0];
  return projects[(index + 1) % projects.length];
};
