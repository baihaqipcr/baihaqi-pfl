// BiodataDiri.jsx
// Komponen utama portofolio identitas diri
// Terdiri darZi 7 child component + custom.css

import { useState, useRef } from 'react';
import './App.css';

// ─────────────────────────────────────────────
// CHILD COMPONENT 1: HeroProfile
// Menampilkan nama, jabatan, foto/avatar (bisa diupload)
// ─────────────────────────────────────────────
const HeroProfile = ({ nama, jabatan, bio, inisial }) => {
  const [foto, setFoto] = useState(null);
  const inputRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFoto(url);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setFoto(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="hero-section">
      <div className="hero-text">
        <p className="hero-label">Portofolio Profesional</p>
        <h1 className="hero-name">
          {nama.split(' ').map((kata, i) =>
            i === nama.split(' ').length - 1
              ? <em key={i}> {kata}</em>
              : <span key={i}>{kata} </span>
          )}
        </h1>
        <p className="hero-title">— {jabatan} —</p>
        <p className="hero-bio">{bio}</p>
      </div>

      <div className="hero-avatar">
        {/* Input file tersembunyi */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="avatar-upload-input"
          id="avatar-upload"
          onChange={handleUpload}
        />

        <div className="avatar-frame">
          {/* Tampilkan foto jika sudah diupload, jika tidak tampilkan inisial */}
          {foto
            ? <img src={foto} alt="Foto Profil" className="avatar-photo" />
            : <span>{inisial}</span>
          }

          {/* Overlay klik untuk upload */}
          <label
            htmlFor="avatar-upload"
            className="avatar-overlay"
            title="Klik untuk ganti foto"
          >
            <span className="avatar-overlay-icon">📷</span>
            <span className="avatar-overlay-text">
              {foto ? 'Ganti Foto' : 'Upload Foto'}
            </span>
          </label>
        </div>

        {/* Tombol hapus foto (muncul saat hover jika ada foto) */}
        {foto && (
          <button
            className="avatar-remove-btn"
            onClick={handleRemove}
            title="Hapus foto"
          >
            ✕
          </button>
        )}

        <span className="avatar-corner tl" />
        <span className="avatar-corner tr" />
        <span className="avatar-corner bl" />
        <span className="avatar-corner br" />
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// CHILD COMPONENT 2: InfoPribadi
// Menampilkan data diri (TTL, lokasi, status, dll.)
// ─────────────────────────────────────────────
const InfoPribadi = ({ data }) => {
  return (
    <section className="info-pribadi-section">
      <p className="section-title">Informasi Pribadi</p>
      <div className="info-grid">
        {data.map((item, i) => (
          <div className="info-card" key={i}>
            <span className="info-icon">{item.ikon}</span>
            <p className="info-label">{item.label}</p>
            <p className="info-value">{item.nilai}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// CHILD COMPONENT 3: Keahlian
// Menampilkan skill/kemampuan teknis & non-teknis
// ─────────────────────────────────────────────
const Keahlian = ({ kategori }) => {
  return (
    <section className="skills-section">
      <p className="section-title">Keahlian & Kompetensi</p>
      <div className="skills-grid">
        {kategori.map((kat, i) => (
          <div className="skill-category" key={i}>
            <p className="skill-category-name">{kat.nama}</p>
            <div className="skill-tags">
              {kat.skills.map((s, j) => (
                <span className="skill-tag" key={j}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// CHILD COMPONENT 4: PengalamanKerja
// Menampilkan riwayat pekerjaan / karier
// ─────────────────────────────────────────────
const PengalamanKerja = ({ pengalaman }) => {
  return (
    <section className="experience-section">
      <p className="section-title">Pengalaman Kerja</p>
      <div className="experience-list">
        {pengalaman.map((item, i) => (
          <div className="experience-item" key={i}>
            <span className="exp-period">{item.periode}</span>
            <div className="exp-content">
              <p className="exp-role">{item.jabatan}</p>
              <p className="exp-company">{item.perusahaan}</p>
              <p className="exp-desc">{item.deskripsi}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// CHILD COMPONENT 5: RiwayatPendidikan
// Menampilkan pendidikan formal
// ─────────────────────────────────────────────
const RiwayatPendidikan = ({ pendidikan }) => {
  return (
    <section className="education-section">
      <p className="section-title">Riwayat Pendidikan</p>
      <div>
        {pendidikan.map((item, i) => (
          <div className="education-card" key={i}>
            <span className="edu-year">{item.tahun}</span>
            <div className="edu-detail">
              <p className="edu-degree">{item.gelar}</p>
              <p className="edu-institution">{item.institusi}</p>
              <p className="edu-note">{item.catatan}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// CHILD COMPONENT 6: Minat
// Menampilkan hobi dan minat pribadi
// ─────────────────────────────────────────────
const Minat = ({ minat }) => {
  return (
    <section className="interests-section">
      <p className="section-title">Minat & Hobi</p>
      <div className="interests-list">
        {minat.map((item, i) => (
          <span className="interest-chip" key={i}>{item}</span>
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// CHILD COMPONENT 7: KontakSosial
// Menampilkan tautan kontak & media sosial
// ─────────────────────────────────────────────
const KontakSosial = ({ kontak }) => {
  return (
    <section className="contact-section">
      <p className="section-title">Kontak & Tautan</p>
      <div className="contact-grid">
        {kontak.map((item, i) => (
          <a
            className="contact-link"
            href={item.href}
            key={i}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-icon">{item.ikon}</span>
            {item.label}
          </a>
        ))}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// MAIN COMPONENT: BiodataDiri
// Menyatukan semua child components
// ─────────────────────────────────────────────
const BiodataDiri = () => {

  const profil = {
    nama: 'Muhammad Baihaqi Haikal',
    jabatan: 'Junior UI/UX Designer',
    bio: 'Membangun antarmuka yang bermakna dan sistem yang andal. Percaya bahwa kode yang baik adalah puisi yang berjalan.',
    inisial: 'HQ',
  };

  const infoPribadi = [
    { ikon: '📅', label: 'Tanggal Lahir', nilai: '28 Mei 2007' },
    { ikon: '📍', label: 'Domisili', nilai: 'Pekanbaru, Riau' },
    { ikon: '🎓', label: 'Pendidikan', nilai: 'D4 Sistem Informasi' },
    { ikon: '💼', label: 'Status', nilai: 'Tersedia untuk Hire' },
    { ikon: '🌐', label: 'Bahasa', nilai: 'Indonesia, Inggris' },
    { ikon: '⭐', label: 'Pengalaman', nilai: '-' },
  ];

  const keahlian = [
    { nama: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { nama: 'Backend', skills: ['Node.js', 'Laravel'] },
    { nama: 'Tools & DevOps', skills: ['Git', 'Figma', 'Linux'] },
    { nama: 'Soft Skills', skills: ['Problem Solving', 'Komunikasi', 'Teamwork', 'Manajemen Waktu'] },
  ];

  const pengalaman = [
    {
      periode: '2023 — Kini',
      jabatan: 'Direktur Umum PT. Riau Digital Network',
      perusahaan: 'PT. Riau Digital Network',
      deskripsi: 'Memimpin perusahaan dalam menjalankan dan mengembangkan perusahaan di bidang digital networking.',
    },
  ];

  const pendidikan = [
    {
      tahun: '2021 - 2024',
      gelar: 'SMA IPA',
      institusi: 'SMA IT Insan Cendekia Payakumbuh',
      catatan: 'Medali Perunggu Karya Cerpen yang diselenggarakan oleh Tulis.me tingkat Nasional 2023',
    },
  ];

  const minat = ['☕ Kopi & Kuliner', '📸 Fotografi', '📚 Membaca', '🏃 Gym', '🎮 Game Indie'];

  const kontak = [
    { ikon: '✉️', label: 'baihaqi24si@mahasiswa.pcr.ac.id', href: 'mailto:baihaqi24si@mahasiswa.pcr.ac.id' },
    { ikon: '📱', label: '+62 822-5149-8204', href: 'tel:+6282251498204' },
    { ikon: '💼', label: 'LinkedIn', href: 'https://linkedin.com' },
    { ikon: '🐙', label: 'GitHub', href: 'https://github.com/baihaqipcr' },
    { ikon: '🌐', label: 'baihaqipcr.dev', href: '#' },
    { ikon: '📝', label: 'Medium Blog', href: '#' },
  ];

  return (
    <div className="portfolio-wrapper">
      <HeroProfile nama={profil.nama} jabatan={profil.jabatan} bio={profil.bio} inisial={profil.inisial} />
      <InfoPribadi data={infoPribadi} />
      <Keahlian kategori={keahlian} />
      <PengalamanKerja pengalaman={pengalaman} />
      <RiwayatPendidikan pendidikan={pendidikan} />
      <Minat minat={minat} />
      <KontakSosial kontak={kontak} />
      <footer className="portfolio-footer">
        <span>© {new Date().getFullYear()} Muhammad Baihaqi Haikal</span>
        <span>Dibuat dengan React · custom.css</span>
      </footer>
    </div>
  );
};

export default BiodataDiri;