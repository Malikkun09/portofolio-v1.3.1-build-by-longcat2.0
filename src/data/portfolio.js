// ─────────────────────────────────────────────────────────────
// PORTFOLIO V3 — DATA LAYER
// Source of truth: /home/malikfajare/PKL-Crud-Laravel
//   resources/js/Pages/Portfolio/data/portfolio.jsx
//   resources/js/Pages/Portfolio/sections/Contact.jsx
//   resources/js/Pages/Portfolio/sections/MainPortfolio.jsx
//   README.md + git remote (repo inventaris)
// Jangan menambahkan data fiktif — semuanya berasal dari folder sumber.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Malik Fajar',
  firstName: 'Malik',
  headline: 'Student | SMK Informatika Fithrah Insani Kelas 12',
  studyProgram: 'PPLG (Pengembangan Perangkat Lunak dan Game)',
  role: 'Developer · UI/UX · Cyber Security Enthusiast',
  intro:
    'Siswa SMK Informatika Fithrah Insani jurusan PPLG yang fokus pada pembuatan website, desain antarmuka, dan eksplorasi tools modern untuk pengembangan aplikasi.',
  photo: '/assets/Malik.webp',
}

export const about = {
  paragraphs: [
    'Halo, perkenalkan nama saya Malik Fajar. Saya adalah seorang siswa SMK Informatika Fithrah Insani yang berada di jurusan PPLG. Saya punya minat besar di bidang coding, UI/UX design, pengembangan web, dan terutama di bidang Cyber Security.',
    'Saat ini saya sedang terus belajar untuk meningkatkan kemampuan saya di dunia teknologi, khususnya pada pembuatan website, desain antarmuka, dan eksplorasi tools modern untuk pengembangan aplikasi. Saya juga bercita-cita untuk melanjutkan pendidikan ke perguruan tinggi negeri atau swasta.',
    'Melalui biodata dan portofolio ini, saya ingin mendokumentasikan perjalanan belajar saya, hasil karya yang sudah dibuat, dan proses berkembang saya sebagai pelajar yang ingin siap menghadapi dunia kerja maupun pendidikan yang lebih tinggi.',
  ],
  focusList: [
    'Web Development',
    'UI/UX Design',
    'Frontend Styling',
    'Cyber Security Enthusiast',
  ],
}

export const skills = [
  { name: 'Web Development', tag: 'core' },
  { name: 'UI/UX Design', tag: 'design' },
  { name: 'Frontend Styling', tag: 'frontend' },
  { name: 'Basic Backend Development', tag: 'backend' },
  { name: 'Problem Solving', tag: 'soft' },
  { name: 'Creative Thinking', tag: 'soft' },
]

// Stack teknologi yang benar-benar dipakai di project (dari source code
// PKL-Crud-Laravel: Laravel 13, PHP 8.3, Blade, AdminLTE 3, Inertia, React,
// MySQL, Tailwind; portfolio lain memakai framework web modern & Python/CV).
export const stack = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Laravel', 'PHP',
  'MySQL', 'Tailwind CSS', 'Inertia', 'Blade', 'Python', 'Git', 'Linux',
]

export const marqueeItems = [
  'WEB DEVELOPMENT',
  'UI / UX DESIGN',
  'CYBER SECURITY',
  'CREATIVE CODING',
]

export const projects = [
  {
    id: 'inventaris',
    index: '01',
    title: 'Sistem Inventaris Barang',
    kind: 'PKL Project — Laravel',
    short:
      'Aplikasi CRUD manajemen inventaris (barang, kategori, pegawai, transaksi stok) dengan kontrol akses berbasis role.',
    description:
      'Backend Laravel 13 / PHP 8.3 dengan Blade + AdminLTE 3 dan database MySQL. Empat level akses (Super Admin, Admin, Staff Gudang, Viewer), ledger transaksi stok masuk/keluar, activity log, serta audit keamanan adversarial bersama Claude Code: perbaikan injection, auth/sesi, integritas transaksi stok, dan 46 test regresi hijau.',
    tech: ['Laravel', 'PHP 8.3', 'MySQL', 'Blade', 'AdminLTE 3', 'Inertia'],
    status: 'Live — production',
    links: [
      { label: 'GitHub Repo', href: 'https://github.com/Malikkun09/pkl-crud-laravel-2' },
    ],
    image: null,
    video: null,
  },
  {
    id: 'portfolio',
    index: '02',
    title: 'Portfolio Website',
    kind: 'Personal Website',
    short:
      'Website pribadi untuk menampilkan identitas, skill, dan hasil karya yang pernah saya buat dengan tampilan yang modern dan menarik.',
    description:
      'Rumah digital utama saya di domain malikfajar.me — identitas, skill, karya, dan eksperimen visual dikemas dalam tampilan modern.',
    tech: ['JavaScript', 'React', 'CSS'],
    status: 'Live',
    links: [{ label: 'Open Website', href: 'https://malikfajar.me' }],
    image: '/assets/projects/Projek-portofolio.webp',
    video: '/assets/videos/demo-02.mp4',
    poster: '/assets/videos/demo-02.jpg',
    videoNote: 'Build Web With AI — demo rekaman',
  },
  {
    id: 'skillmatch',
    index: '03',
    title: 'SkillMatch / KerjaIn',
    kind: 'Web Platform',
    short:
      'Platform web untuk membantu siswa SMK mencari peluang kerja, magang, dan mengelola informasi karier dengan lebih mudah.',
    description:
      'Dibuat untuk menjembatani siswa SMK dengan peluang kerja dan magang: pencarian peluang, profil keahlian, dan informasi karier dalam satu platform.',
    tech: ['JavaScript', 'React', 'CSS'],
    status: 'Live',
    links: [{ label: 'Open Website', href: 'https://skillmatch.malikfajar.me' }],
    image: '/assets/projects/project-skillmatch.webp',
    video: null,
  },
  {
    id: 'courtline',
    index: '04',
    title: 'Courtline Website',
    kind: 'Visual Experiment',
    short:
      'Eksperimen website dengan elemen animasi, interaksi visual, dan tampilan modern menggunakan framework modern.',
    description:
      'Playground animasi dan interaksi visual — eksplorasi motion, transisi, dan komposisi tampilan modern di web.',
    tech: ['JavaScript', 'React', 'Animation'],
    status: 'Live',
    links: [{ label: 'Open Website', href: 'https://courtline.malikfajar.me' }],
    image: '/assets/projects/project-court.webp',
    video: null,
  },
  {
    id: 'jkn-bpjs',
    index: '05',
    title: 'JKN BPJS Hackathon',
    kind: 'Hackathon App',
    short:
      'Aplikasi yang dirancang untuk membantu pengguna JKN BPJS mengakses layanan kesehatan dengan antarmuka modern dan mudah digunakan.',
    description:
      'Proyek hackathon: menyatukan akses layanan kesehatan JKN BPJS lewat antarmuka yang bersih, cepat, dan mudah dipakai siapa saja.',
    tech: ['JavaScript', 'UI/UX', 'CSS'],
    status: 'Live',
    links: [{ label: 'Open Website', href: 'https://jkn-bpjs-projek.malikfajar.my.id' }],
    image: '/assets/projects/jkn-bpjs-projek.webp',
    video: null,
  },
  {
    id: 'eduverse',
    index: '06',
    title: 'EduVerse Website',
    kind: 'Education Platform',
    short:
      'Website edukasi untuk memudahkan pengguna mengakses materi pembelajaran melalui tampilan brutalist yang modern dan fungsional.',
    description:
      'Platform materi belajar dengan gaya brutalist-modern: konten edukasi yang mudah diakses tanpa mengorbankan karakter visual.',
    tech: ['JavaScript', 'React', 'CSS'],
    status: 'Live',
    links: [{ label: 'Open Website', href: 'https://eduverse.malikfajar.my.id' }],
    image: '/assets/projects/project-eduverse.webp',
    video: null,
  },
]

// Video demo asli dari folder sumber (demo-03/04 belum ada filenya — TODO.md P3).
export const videoDemos = [
  {
    title: 'Track Object',
    description: 'Pelacakan objek dengan Python, dijalankan di Google Colab.',
    url: 'https://malikfajar.me',
    video: '/assets/videos/demo-01.mp4',
    poster: '/assets/videos/demo-01.jpg',
  },
  {
    title: 'Build Web With AI',
    description:
      'Membangun Website dengan tema "Neo-Brutalist Editorial / Digital Brutalism" menggunakan Claude Opus 5.',
    url: 'https://skillmatch.malikfajar.me',
    video: '/assets/videos/demo-02.mp4',
    poster: '/assets/videos/demo-02.jpg',
  },
]

export const socials = [
  { label: 'GitHub Utama', sub: '@Malikkun09', href: 'https://github.com/Malikkun09', icon: 'github' },
  { label: 'GitHub Aktif', sub: '@MalikSMK09', href: 'https://github.com/MalikSMK09', icon: 'github' },
  {
    label: 'LinkedIn',
    sub: 'Muhammad Malik Fajar El Syarif',
    href: 'https://www.linkedin.com/in/muhammad-malik-fajar-el-syarif-05773a392',
    icon: 'linkedin',
  },
  { label: 'Instagram', sub: '@malikajasih', href: 'https://instagram.com/malikajasih', icon: 'instagram' },
  { label: 'Dev.to', sub: '@malikkun09', href: 'https://dev.to/malikkun09', icon: 'devto' },
  {
    label: 'Stack Overflow',
    sub: 'muhammad-malik-fajar',
    href: 'https://stackoverflow.com/users/32502400/muhammad-malik-fajar',
    icon: 'stackoverflow',
  },
]

export const domains = [
  { domain: 'malikfajar.my.id', note: 'Domain Pertama', href: 'https://www.malikfajar.my.id' },
  { domain: 'malikfajar.tech', note: 'Domain khusus PKL 1', href: 'https://malikfajar.tech' },
  { domain: 'malikfajar.me', note: 'Domain khusus Portofolio', href: 'https://malikfajar.me' },
  { domain: 'malikfajar.app', note: 'Domain khusus PKL 2', href: 'https://malikfajar.app' },
  { domain: 'kussz.dpdns.org', note: 'Domain Testing', href: 'https://kussz.dpdns.org' },
  { domain: 'malikdev.dpdns.org', note: 'Domain khusus PKL 3', href: 'https://malikdev.dpdns.org' },
]

// Timeline nyata: PKL berjalan saat repo dibuat/dikembangkan (Agustus 2026),
// kelas 12 angkatan 2026 (badge "PPLG '26" di Hero versi sebelumnya).
export const journey = [
  {
    year: '2024',
    title: 'Mulai serius ke web development',
    body: 'Masuk jurusan PPLG di SMK Informatika Fithrah Insani — mulai bangun fondasi HTML, CSS, JavaScript, dan desain antarmuka.',
  },
  {
    year: '2025',
    title: 'Membangun project & domain sendiri',
    body: 'Meluncurkan portfolio pertama di malikfajar.my.id, lalu bereksperimen dengan project web dan domain testing sendiri.',
  },
  {
    year: '2026',
    title: 'PKL — sistem produksi & security audit',
    body: 'Membangun Sistem Inventaris Barang berbasis Laravel untuk PKL: role-based access, stock ledger, deployment shared hosting, plus audit keamanan adversarial dan 46 test regresi.',
  },
]

export const contact = {
  fullName: 'Malik Fajar',
  whatsappDisplay: '+62 889-1983-723',
  whatsappHref: 'https://wa.me/628891983723',
  message: 'Terima kasih sudah mengunjungi portfolio saya.',
}

export const footerStatement = 'Built with curiosity.'
