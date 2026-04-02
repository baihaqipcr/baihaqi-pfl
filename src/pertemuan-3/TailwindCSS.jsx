import { useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #f8f5f0;
    color: #0f0e0d;
    overflow-x: hidden;
  }

  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }

  /* NAVBAR */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.25rem 3rem;
    background: rgba(248,245,240,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(0,0,0,0.08);
    transition: box-shadow 0.3s;
  }
  .navbar.scrolled { box-shadow: 0 4px 32px rgba(0,0,0,0.07); }
  .nav-brand { font-family: 'Playfair Display', serif; font-size: 1.4rem; letter-spacing: -0.02em; color: #0f0e0d; }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a {
    font-size: 0.875rem; font-weight: 500; color: #8a8580;
    text-decoration: none; letter-spacing: 0.04em; text-transform: uppercase;
    transition: color 0.2s; position: relative;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: -3px; left: 0;
    width: 0; height: 1.5px; background: #c8a96e; transition: width 0.3s;
  }
  .nav-links a:hover { color: #0f0e0d; }
  .nav-links a:hover::after { width: 100%; }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: center;
    padding: 8rem 3rem 4rem;
    position: relative; overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 60% at 80% 50%, rgba(200,169,110,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-badge {
    font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: #c8a96e; border: 1px solid #c8a96e; padding: 0.35rem 1rem;
    border-radius: 100px; display: inline-block; margin-bottom: 1.5rem; width: fit-content;
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 7vw, 6rem);
    line-height: 1.05; max-width: 700px; margin-bottom: 1.5rem;
  }
  .hero-title em { font-style: italic; color: #2d5a4a; }
  .hero-subtitle {
    font-size: 1.125rem; color: #8a8580;
    max-width: 480px; line-height: 1.75; margin-bottom: 2.5rem;
  }
  .hero-cta { display: flex; gap: 1rem; }

  /* BUTTONS */
  .btn-primary {
    background: #0f0e0d; color: #fff; padding: 0.9rem 2rem;
    border: none; border-radius: 4px; font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem; font-weight: 500; cursor: pointer;
    transition: background 0.2s, transform 0.15s; letter-spacing: 0.02em;
  }
  .btn-primary:hover { background: #2d5a4a; transform: translateY(-2px); }
  .btn-outline {
    background: transparent; color: #0f0e0d; padding: 0.9rem 2rem;
    border: 1.5px solid #0f0e0d; border-radius: 4px; font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem; font-weight: 500; cursor: pointer;
    transition: all 0.2s; letter-spacing: 0.02em;
  }
  .btn-outline:hover { background: #0f0e0d; color: #fff; transform: translateY(-2px); }

  /* STATS */
  .stats-section {
    padding: 4rem 3rem;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
  }
  .shadow-effects {
    background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px;
    padding: 2.5rem 2rem; text-align: center;
    transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s;
    cursor: default;
  }
  .shadow-effects:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(0,0,0,0.1); }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 3rem; color: #c8a96e; font-weight: 700; }
  .shadow-effects h3 { font-size: 1rem; font-weight: 500; margin-top: 0.5rem; }
  .shadow-effects p { font-size: 0.875rem; color: #8a8580; margin-top: 0.5rem; line-height: 1.6; }

  /* FEATURES */
  .section { padding: 6rem 3rem; }
  .section-label {
    font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: #c8a96e; margin-bottom: 1rem;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem); line-height: 1.15;
    max-width: 520px; margin-bottom: 3.5rem;
  }
  .features-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
  .spacing {
    background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 12px;
    padding: 2rem; position: relative; overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .spacing::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #c8a96e, #2d5a4a);
    transform: scaleX(0); transform-origin: left; transition: transform 0.35s;
  }
  .spacing:hover::before { transform: scaleX(1); }
  .spacing:hover { transform: translateY(-4px); box-shadow: 0 16px 36px rgba(0,0,0,0.08); }
  .spacing-icon {
    width: 44px; height: 44px; border-radius: 10px;
    background: linear-gradient(135deg, rgba(200,169,110,0.15), rgba(45,90,74,0.1));
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.25rem; font-size: 1.25rem;
  }
  .spacing h2 { font-size: 1.05rem; font-weight: 500; margin-bottom: 0.6rem; }
  .spacing p { font-size: 0.9rem; color: #8a8580; line-height: 1.65; }

  /* TESTIMONIAL */
  .testimonial-section { background: #0f0e0d; color: #fff; padding: 6rem 3rem; }
  .typography { max-width: 700px; margin: 0 auto; text-align: center; }
  .quote-mark {
    font-family: 'Playfair Display', serif;
    font-size: 5rem; color: #c8a96e; line-height: 0.5; margin-bottom: 1rem;
  }
  .typography h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.5rem, 3vw, 2.25rem); line-height: 1.5;
    color: #fff; font-weight: 400; font-style: italic; margin-bottom: 1.5rem;
  }
  .typography p { font-size: 0.9rem; color: rgba(255,255,255,0.5); letter-spacing: 0.06em; text-transform: uppercase; }
  .typography-stars { color: #c8a96e; font-size: 1rem; margin-bottom: 1.5rem; letter-spacing: 4px; }

  /* CTA */
  .cta-section { padding: 6rem 3rem; display: flex; flex-direction: column; align-items: center; text-align: center; }
  .border-radius { display: inline-flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 2rem; }
  .border-radius button {
    padding: 0.9rem 2.5rem; border-radius: 6px; font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem; font-weight: 500; cursor: pointer; letter-spacing: 0.03em;
    transition: all 0.25s cubic-bezier(.22,1,.36,1);
  }
  .btn-filled { background: #2d5a4a; color: #fff; border: none; }
  .btn-filled:hover { background: #1a3d31; transform: translateY(-3px) scale(1.02); box-shadow: 0 12px 28px rgba(45,90,74,0.25); }
  .btn-bordered { background: transparent; color: #0f0e0d; border: 1.5px solid #0f0e0d; }
  .btn-bordered:hover { background: #0f0e0d; color: #fff; transform: translateY(-3px); }
  .btn-gold { background: #c8a96e; color: #0f0e0d; border: none; }
  .btn-gold:hover { background: #b8953d; transform: translateY(-3px) scale(1.02); box-shadow: 0 12px 28px rgba(200,169,110,0.35); }

  /* SERVICES */
  .services-section { padding: 2rem 3rem 6rem; }
  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .background-colors {
    border-radius: 12px; padding: 2.5rem 2rem;
    cursor: default; transition: transform 0.3s, box-shadow 0.3s;
  }
  .background-colors:hover { transform: translateY(-6px); box-shadow: 0 20px 44px rgba(0,0,0,0.13); }
  .background-colors.dark { background: #0f0e0d; color: #fff; }
  .background-colors.gold { background: #c8a96e; color: #0f0e0d; }
  .background-colors.green { background: #2d5a4a; color: #fff; }
  .background-colors h3 { font-family: 'Playfair Display', serif; font-size: 1.4rem; margin-bottom: 0.75rem; }
  .background-colors p { font-size: 0.9rem; line-height: 1.65; opacity: 0.8; margin-bottom: 1.5rem; }
  .arrow-link {
    font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase;
    text-decoration: none; display: inline-flex; align-items: center;
    gap: 0.5rem; font-weight: 500; transition: gap 0.2s;
  }
  .background-colors.dark .arrow-link { color: #c8a96e; }
  .background-colors.gold .arrow-link { color: #0f0e0d; }
  .background-colors.green .arrow-link { color: rgba(255,255,255,0.8); }
  .background-colors:hover .arrow-link { gap: 0.9rem; }

  /* FOOTER */
  footer {
    background: #0f0e0d; color: rgba(255,255,255,0.4);
    text-align: center; padding: 2.5rem;
    font-size: 0.8rem; letter-spacing: 0.04em;
  }
  footer span { color: #c8a96e; }

  .divider { height: 1px; background: rgba(0,0,0,0.08); margin: 0 3rem; }

  @media (max-width: 768px) {
    .navbar { padding: 1rem 1.5rem; }
    .hero { padding: 7rem 1.5rem 3rem; }
    .stats-section, .features-grid, .services-grid { grid-template-columns: 1fr; }
    .section, .cta-section, .services-section { padding: 4rem 1.5rem; }
    .testimonial-section { padding: 4rem 1.5rem; }
  }
`;

function useReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function FlexboxGrid() {
  const navRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle("scrolled", window.scrollY > 40);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="nav-brand">Reimagined</div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
}

function ShadowEffects() {
  return (
    <section className="stats-section">
      <div className="shadow-effects reveal">
        <div className="stat-num">12+</div>
        <h3>Tahun Pengalaman</h3>
        <p>Melayani klien dari berbagai industri di seluruh Asia Tenggara.</p>
      </div>
      <div className="shadow-effects reveal reveal-delay-1">
        <div className="stat-num">340</div>
        <h3>Klien Aktif</h3>
        <p>Portofolio klien yang terus berkembang dan dipercaya.</p>
      </div>
      <div className="shadow-effects reveal reveal-delay-2">
        <div className="stat-num">98%</div>
        <h3>Tingkat Kepuasan</h3>
        <p>Komitmen kami pada kualitas tercermin dari setiap proyek.</p>
      </div>
    </section>
  );
}

function Spacing() {
  const features = [
    { icon: "🎯", title: "Strategi Bisnis", desc: "Pendekatan berbasis data untuk mengidentifikasi peluang dan merancang roadmap pertumbuhan yang realistis dan terukur." },
    { icon: "⚡", title: "Transformasi Digital", desc: "Mengintegrasikan teknologi mutakhir ke dalam operasional bisnis Anda untuk efisiensi dan skalabilitas maksimal." },
    { icon: "🌐", title: "Ekspansi Pasar", desc: "Memandu ekspansi ke pasar baru dengan analisis mendalam tentang lanskap kompetitif dan perilaku konsumen." },
    { icon: "💡", title: "Inovasi Produk", desc: "Dari ideasi hingga peluncuran — kami mendukung setiap fase pengembangan produk dengan keahlian dan kreativitas." },
  ];

  return (
    <section className="section">
      <div className="section-label reveal">Keunggulan Kami</div>
      <div className="section-title reveal reveal-delay-1">
        Solusi lengkap untuk bisnis yang ambisius.
      </div>
      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className={`spacing reveal reveal-delay-${i + 1}`}>
            <div className="spacing-icon">{f.icon}</div>
            <h2>{f.title}</h2>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Typography() {
  return (
    <section className="testimonial-section">
      <div className="typography reveal">
        <div className="quote-mark">"</div>
        <div className="typography-stars">★ ★ ★ ★ ★</div>
        <h1>
          Bekerja sama dengan Nexora adalah keputusan terbaik yang pernah kami
          buat. Revenue kami meningkat 3x lipat dalam satu tahun.
        </h1>
        <p>— Arief Budiman, CEO · PT Maju Bersama</p>
      </div>
    </section>
  );
}

function BorderRadius() {
  return (
    <section className="cta-section">
      <div className="section-label reveal">Bergabung Sekarang</div>
      <div
        className="section-title reveal reveal-delay-1"
        style={{ maxWidth: 600, margin: "0 auto 1rem", textAlign: "center" }}
      >
        Siap membawa bisnis Anda ke level berikutnya?
      </div>
      <p
        className="reveal reveal-delay-2"
        style={{ color: "#8a8580", maxWidth: 480, lineHeight: 1.75, marginBottom: "2rem" }}
      >
        Jadwalkan konsultasi gratis dengan tim ahli kami dan temukan strategi
        yang tepat untuk bisnis Anda.
      </p>
      <div className="border-radius reveal reveal-delay-3">
        <button className="btn-filled">Konsultasi Gratis</button>
        <button className="btn-bordered">Lihat Portofolio</button>
        <button className="btn-gold">Download Brochure</button>
      </div>
    </section>
  );
}

function BackgroundColors() {
  const services = [
    {
      theme: "dark",
      title: "Konsultasi Strategi",
      desc: "Analisis mendalam dan rekomendasi strategis yang disesuaikan dengan kebutuhan unik bisnis Anda.",
    },
    {
      theme: "gold",
      title: "Brand Identity",
      desc: "Bangun identitas merek yang kuat, konsisten, dan beresonansi dengan target audiens Anda.",
    },
    {
      theme: "green",
      title: "Growth Hacking",
      desc: "Eksperimen cepat dan berbasis data untuk menemukan channel pertumbuhan paling efektif.",
    },
  ];

  return (
    <section className="services-section">
      <div className="section-label reveal" style={{ marginBottom: "1rem" }}>
        Layanan
      </div>
      <div className="section-title reveal reveal-delay-1">
        Apa yang bisa kami lakukan untuk Anda?
      </div>
      <div className="services-grid">
        {services.map((s, i) => (
          <div
            key={i}
            className={`background-colors ${s.theme} reveal reveal-delay-${i + 1}`}
          >
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <a href="#" className="arrow-link" onClick={(e) => e.preventDefault()}>
              Pelajari lebih →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function TailwindCSS() {
  useReveal();

  return (
    <>
      <style>{styles}</style>

      <FlexboxGrid />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-badge reveal">Strategic Growth Partners</div>
        <h1 className="hero-title reveal reveal-delay-1">
          Build a <em>business</em>
          <br />
          that lasts.
        </h1>
        <p className="hero-subtitle reveal reveal-delay-2">
          Kami membantu perusahaan modern berkembang dengan strategi inovatif,
          desain yang berpusat pada manusia, dan eksekusi yang tanpa kompromi.
        </p>
        <div className="hero-cta reveal reveal-delay-3">
          <button className="btn-primary">Mulai Sekarang</button>
          <button className="btn-outline">Pelajari Lebih</button>
        </div>
      </section>

      <ShadowEffects />
      <div className="divider" />
      <Spacing />
      <Typography />
      <BorderRadius />
      <div className="divider" />
      <BackgroundColors />

      <footer>
        © 2025 <span>Nexora</span> · Built with React · All rights reserved
      </footer>
    </>
  );
}