export const profile = {
  displayName: 'Malik Fajar',
  fullName: 'Muhammad Malik Fajar El Syarif',
  school: 'SMK Informatika Fithrah Insani',
  studyProgram: 'PPLG (Pengembangan Perangkat Lunak dan Game)',
  location: 'Cimahi, Indonesia',
  photo: '/assets/Malik.webp',
  intro:
    'Siswa SMK Informatika Fithrah Insani jurusan PPLG yang fokus pada pembuatan website, desain antarmuka, dan eksplorasi tools modern untuk pengembangan aplikasi.',
  about: [
    'Halo, saya Malik. Saya siswa SMK Informatika Fithrah Insani, jurusan PPLG. Saya belajar dengan membangun: website, antarmuka, sistem, dan eksperimen visual.',
    'Minat saya ada di software development, UI/UX, AI, dan cyber security. Saya masih di jalur belajar — lewat PKL, hackathon, course, dan percobaan yang saya dokumentasikan di sini.',
    'Portofolio ini adalah rumah digital saya: catatan karya, eksperimen, dan proses. Bukan klaim senioritas. Hanya kerja yang sudah ada, disusun supaya bisa dijelajahi.',
  ],
  focus: ['Web Development', 'UI/UX', 'AI', 'Cyber Security', 'Creative Coding'],
  siteUrl: 'https://malikfajar.me',
} as const;

export const socials = [
  {
    label: 'GitHub',
    sub: '@Malikkun09',
    href: 'https://github.com/Malikkun09',
  },
  {
    label: 'GitHub',
    sub: '@MalikSMK09',
    href: 'https://github.com/MalikSMK09',
  },
  {
    label: 'LinkedIn',
    sub: 'Muhammad Malik Fajar El Syarif',
    href: 'https://www.linkedin.com/in/muhammad-malik-fajar-el-syarif-05773a392',
  },
  {
    label: 'Instagram',
    sub: '@malikajasih',
    href: 'https://instagram.com/malikajasih',
  },
  {
    label: 'Dev.to',
    sub: '@malikkun09',
    href: 'https://dev.to/malikkun09',
  },
  {
    label: 'Stack Overflow',
    sub: 'muhammad-malik-fajar',
    href: 'https://stackoverflow.com/users/32502400/muhammad-malik-fajar',
  },
] as const;

export const contact = {
  whatsappDisplay: '+62 889-1983-723',
  whatsappHref: 'https://wa.me/628891983723',
  note: 'Terima kasih sudah mengunjungi portfolio saya.',
} as const;

export const domains = [
  { domain: 'malikfajar.me', note: 'Portfolio', href: 'https://malikfajar.me' },
  { domain: 'malikfajar.my.id', note: 'Domain pertama', href: 'https://www.malikfajar.my.id' },
  { domain: 'malikfajar.tech', note: 'PKL', href: 'https://malikfajar.tech' },
  { domain: 'malikfajar.app', note: 'PKL', href: 'https://malikfajar.app' },
  { domain: 'kussz.dpdns.org', note: 'Testing', href: 'https://kussz.dpdns.org' },
  { domain: 'malikdev.dpdns.org', note: 'PKL', href: 'https://malikdev.dpdns.org' },
] as const;

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
] as const;

export const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Experiments', href: '/#experiments' },
  { label: 'Certificates', href: '/#certificates' },
  { label: 'Contact', href: '/#contact' },
] as const;
