/**
 * FrameworkList.jsx
 * iOS 26-style glassmorphism · hover interactions · animated tags
 * No extra dependencies needed — pure React + CSS-in-JS
 */

import { useState } from "react";
import frameworkData from "./framework.json";

/* ─── CSS ─────────────────────────────────────────────────────────── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

:root {
  --bg-from:   #0a0f1e;
  --bg-to:     #0d1829;
  --glass-bg:  rgba(255, 255, 255, 0.06);
  --glass-hover: rgba(255, 255, 255, 0.11);
  --glass-border: rgba(255, 255, 255, 0.14);
  --glass-border-hover: rgba(255, 255, 255, 0.28);
  --blur:      20px;
  --text:      rgba(255, 255, 255, 0.92);
  --muted:     rgba(255, 255, 255, 0.48);
  --accent:    #5eb5f5;
  --accent2:   #a78bfa;
  --green:     #34d399;
  --amber:     #fbbf24;
  --pink:      #f472b6;
  --radius:    20px;
}

.fl-root {
  font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
  background: linear-gradient(135deg, var(--bg-from) 0%, var(--bg-to) 100%);
  min-height: 100vh;
  padding: 3rem 1.5rem 4rem;
  position: relative;
  overflow: hidden;
}

/* Ambient orbs */
.fl-root::before {
  content: '';
  position: fixed;
  top: -200px; left: -150px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(94,181,245,0.12) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  animation: drift1 12s ease-in-out infinite alternate;
}
.fl-root::after {
  content: '';
  position: fixed;
  bottom: -200px; right: -150px;
  width: 700px; height: 700px;
  background: radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  animation: drift2 15s ease-in-out infinite alternate;
}
@keyframes drift1 { from { transform: translate(0,0) scale(1); } to { transform: translate(60px,40px) scale(1.1); } }
@keyframes drift2 { from { transform: translate(0,0) scale(1); } to { transform: translate(-50px,-30px) scale(1.08); } }

.fl-inner {
  position: relative; z-index: 1;
  max-width: 760px; margin: 0 auto;
}

/* Header */
.fl-header { text-align: center; margin-bottom: 3rem; }
.fl-eyebrow {
  font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 0.75rem;
  opacity: 0; animation: fadeUp 0.6s ease 0.1s forwards;
}
.fl-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem); font-weight: 300;
  color: var(--text); line-height: 1.15; margin-bottom: 0.75rem;
  opacity: 0; animation: fadeUp 0.6s ease 0.2s forwards;
}
.fl-title strong { font-weight: 600; }
.fl-subtitle {
  font-size: 0.9rem; color: var(--muted);
  opacity: 0; animation: fadeUp 0.6s ease 0.3s forwards;
}

/* Search bar */
.fl-search-wrap {
  margin-bottom: 2rem;
  opacity: 0; animation: fadeUp 0.6s ease 0.4s forwards;
}
.fl-search {
  width: 100%;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 14px;
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  padding: 0.85rem 1.25rem 0.85rem 3rem;
  color: var(--text);
  font-size: 0.9rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  outline: none;
  transition: border 0.25s, background 0.25s, box-shadow 0.25s;
}
.fl-search:focus {
  border-color: var(--glass-border-hover);
  background: var(--glass-hover);
  box-shadow: 0 0 0 3px rgba(94,181,245,0.12);
}
.fl-search::placeholder { color: var(--muted); }
.fl-search-icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  font-size: 15px; color: var(--muted); pointer-events: none;
}
.fl-search-container { position: relative; }

/* Filter chips */
.fl-filters {
  display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 2rem;
  opacity: 0; animation: fadeUp 0.6s ease 0.5s forwards;
}
.fl-chip {
  padding: 5px 14px; border-radius: 100px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  backdrop-filter: blur(var(--blur));
  color: var(--muted); font-size: 12px; font-weight: 500;
  cursor: pointer; transition: all 0.2s; white-space: nowrap;
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.fl-chip:hover { border-color: var(--glass-border-hover); color: var(--text); }
.fl-chip.active { background: rgba(94,181,245,0.15); border-color: rgba(94,181,245,0.5); color: var(--accent); }

/* Count */
.fl-count {
  font-size: 11px; color: var(--muted); margin-bottom: 1.25rem; letter-spacing: 0.04em;
}

/* Grid */
.fl-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
}

/* Card */
.fl-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  backdrop-filter: blur(var(--blur));
  -webkit-backdrop-filter: blur(var(--blur));
  padding: 1.5rem;
  cursor: pointer;
  position: relative; overflow: hidden;
  transition: transform 0.3s cubic-bezier(.22,1,.36,1),
              border-color 0.25s,
              background 0.25s,
              box-shadow 0.3s;
  opacity: 0;
  animation: fadeUp 0.5s ease forwards;
}
.fl-card:hover {
  transform: translateY(-6px) scale(1.01);
  border-color: var(--glass-border-hover);
  background: var(--glass-hover);
  box-shadow: 0 24px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.07);
}
.fl-card.expanded {
  border-color: rgba(94,181,245,0.35);
  background: rgba(94,181,245,0.07);
}

/* Shimmer on hover */
.fl-card::before {
  content: '';
  position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
  transition: left 0.5s;
  pointer-events: none;
}
.fl-card:hover::before { left: 100%; }

/* Accent line top */
.fl-card-accent {
  position: absolute; top: 0; left: 1.5rem; right: 1.5rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  opacity: 0; transition: opacity 0.3s;
}
.fl-card:hover .fl-card-accent { opacity: 1; }

/* Card header */
.fl-card-header {
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 12px;
  margin-bottom: 0.75rem;
}
.fl-card-left { display: flex; align-items: center; gap: 12px; }

.fl-icon {
  width: 44px; height: 44px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; flex-shrink: 0;
  border: 1px solid rgba(255,255,255,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}
.fl-card:hover .fl-icon { transform: rotate(-4deg) scale(1.1); box-shadow: 0 8px 20px rgba(0,0,0,0.3); }

.fl-name {
  font-size: 1rem; font-weight: 600; color: var(--text);
  line-height: 1.2; margin-bottom: 2px;
}
.fl-version {
  font-size: 10px; color: var(--muted);
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 100px; padding: 1px 7px;
  display: inline-block;
}
.fl-stars {
  font-size: 11px; color: var(--amber);
  display: flex; align-items: center; gap: 3px;
  white-space: nowrap;
}

.fl-desc {
  font-size: 0.85rem; color: var(--muted); line-height: 1.65;
  margin-bottom: 1rem;
}

/* Tags */
.fl-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1rem; }
.fl-tag {
  font-size: 11px; padding: 3px 10px; border-radius: 100px;
  border: 1px solid;
  font-weight: 500; letter-spacing: 0.02em;
  transition: transform 0.15s, box-shadow 0.15s;
}
.fl-tag:hover { transform: scale(1.07); }

/* Footer row */
.fl-card-footer {
  display: flex; align-items: center; justify-content: space-between;
  border-top: 1px solid rgba(255,255,255,0.07);
  padding-top: 0.85rem; margin-top: 0.25rem;
}
.fl-meta { display: flex; gap: 14px; }
.fl-meta-item { font-size: 11px; color: var(--muted); display: flex; align-items: center; gap: 4px; }
.fl-expand-btn {
  font-size: 11px; color: var(--accent); font-weight: 500;
  background: rgba(94,181,245,0.1); border: 1px solid rgba(94,181,245,0.2);
  border-radius: 100px; padding: 3px 12px; cursor: pointer;
  transition: all 0.2s; font-family: 'Plus Jakarta Sans', sans-serif;
}
.fl-expand-btn:hover { background: rgba(94,181,245,0.2); }

/* Expanded detail */
.fl-detail {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.35s cubic-bezier(.22,1,.36,1), opacity 0.3s;
  opacity: 0;
}
.fl-detail.open { max-height: 200px; opacity: 1; }
.fl-detail-inner {
  border-top: 1px solid rgba(255,255,255,0.07);
  margin-top: 0.85rem; padding-top: 0.85rem;
}
.fl-detail-row { display: flex; justify-content: space-between; font-size: 12px; padding: 4px 0; }
.fl-detail-key { color: var(--muted); }
.fl-detail-val { color: var(--text); font-weight: 500; }

/* Empty state */
.fl-empty {
  text-align: center; padding: 4rem 2rem;
  color: var(--muted); font-size: 0.9rem;
}
.fl-empty-icon { font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.4; }

/* Animations */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 500px) {
  .fl-grid { grid-template-columns: 1fr; }
  .fl-root { padding: 2rem 1rem 3rem; }
}
`;

/* ─── Tag color palette (cycles by index) ─────────────────────────── */
const TAG_COLORS = [
  { bg: "rgba(94,181,245,0.12)",  border: "rgba(94,181,245,0.35)",  text: "#5eb5f5" },
  { bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.35)", text: "#a78bfa" },
  { bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.35)",  text: "#34d399" },
  { bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.35)",  text: "#fbbf24" },
  { bg: "rgba(244,114,182,0.12)", border: "rgba(244,114,182,0.35)", text: "#f472b6" },
  { bg: "rgba(251,113,133,0.12)", border: "rgba(251,113,133,0.35)", text: "#fb7185" },
];

/* ─── Icon background per card (cycles) ──────────────────────────── */
const ICON_BG = [
  "rgba(94,181,245,0.18)", "rgba(167,139,250,0.18)", "rgba(52,211,153,0.18)",
  "rgba(251,191,36,0.18)", "rgba(244,114,182,0.18)", "rgba(251,113,133,0.18)",
];

const DEFAULT_ICONS = ["⚡", "🔷", "🌿", "🔥", "🎯", "💎", "🛠️", "🌊", "✨", "🚀"];

/* ─── Reusable: Tag ───────────────────────────────────────────────── */
function Tag({ label, colorIndex }) {
  const c = TAG_COLORS[colorIndex % TAG_COLORS.length];
  return (
    <span
      className="fl-tag"
      style={{ background: c.bg, borderColor: c.border, color: c.text }}
    >
      {label}
    </span>
  );
}

/* ─── Reusable: StarRating ────────────────────────────────────────── */
function StarRating({ rating }) {
  if (!rating) return null;
  const filled = Math.round(rating);
  return (
    <div className="fl-stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ opacity: i <= filled ? 1 : 0.25 }}>★</span>
      ))}
      <span style={{ color: "rgba(255,255,255,0.45)", marginLeft: 2 }}>{rating.toFixed(1)}</span>
    </div>
  );
}

/* ─── Reusable: FrameworkCard ─────────────────────────────────────── */
function FrameworkCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);

  const iconBg  = ICON_BG[index % ICON_BG.length];
  const icon    = item.icon || DEFAULT_ICONS[index % DEFAULT_ICONS.length];
  const delay   = `${0.05 * (index % 8)}s`;

  return (
    <div
      className={`fl-card${expanded ? " expanded" : ""}`}
      style={{ animationDelay: delay }}
    >
      <div className="fl-card-accent" />

      {/* Header */}
      <div className="fl-card-header">
        <div className="fl-card-left">
          <div className="fl-icon" style={{ background: iconBg }}>
            {icon}
          </div>
          <div>
            <div className="fl-name">{item.name}</div>
            {item.version && <span className="fl-version">v{item.version}</span>}
          </div>
        </div>
        {item.rating && <StarRating rating={item.rating} />}
      </div>

      {/* Description */}
      <p className="fl-desc">{item.description}</p>

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="fl-tags">
          {item.tags.map((tag, i) => (
            <Tag key={i} label={tag} colorIndex={i} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="fl-card-footer">
        <div className="fl-meta">
          {item.language && (
            <span className="fl-meta-item">
              <span>💻</span> {item.language}
            </span>
          )}
          {item.license && (
            <span className="fl-meta-item">
              <span>📄</span> {item.license}
            </span>
          )}
          {item.year && (
            <span className="fl-meta-item">
              <span>📅</span> {item.year}
            </span>
          )}
        </div>
        <button
          className="fl-expand-btn"
          onClick={() => setExpanded(e => !e)}
        >
          {expanded ? "Tutup ▲" : "Detail ▾"}
        </button>
      </div>

      {/* Expanded detail */}
      <div className={`fl-detail${expanded ? " open" : ""}`}>
        <div className="fl-detail-inner">
          {item.author && (
            <div className="fl-detail-row">
              <span className="fl-detail-key">Author</span>
              <span className="fl-detail-val">{item.author}</span>
            </div>
          )}
          {item.website && (
            <div className="fl-detail-row">
              <span className="fl-detail-key">Website</span>
              <span className="fl-detail-val" style={{ color: "#5eb5f5" }}>{item.website}</span>
            </div>
          )}
          {item.category && (
            <div className="fl-detail-row">
              <span className="fl-detail-key">Kategori</span>
              <span className="fl-detail-val">{item.category}</span>
            </div>
          )}
          {item.popularity && (
            <div className="fl-detail-row">
              <span className="fl-detail-key">Popularitas</span>
              <span className="fl-detail-val">{item.popularity}</span>
            </div>
          )}
          {!item.author && !item.website && !item.category && !item.popularity && (
            <div className="fl-detail-row">
              <span className="fl-detail-key">ID</span>
              <span className="fl-detail-val">#{item.id}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Reusable: FilterChip ────────────────────────────────────────── */
function FilterChip({ label, active, onClick }) {
  return (
    <button
      className={`fl-chip${active ? " active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

/* ─── Main Component ──────────────────────────────────────────────── */
export default function FrameworkList() {
  const [search, setSearch]       = useState("");
  const [activeFilter, setFilter] = useState("Semua");

  /* Collect all unique tags for filter chips */
  const allTags = ["Semua", ...new Set(
    frameworkData.flatMap(f => f.tags || [])
  )];

  /* Filter logic */
  const filtered = frameworkData.filter(item => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()) ||
      item.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));

    const matchFilter =
      activeFilter === "Semua" || item.tags?.includes(activeFilter);

    return matchSearch && matchFilter;
  });

  return (
    <>
      <style>{STYLES}</style>
      <div className="fl-root">
        <div className="fl-inner">

          {/* Header */}
          <div className="fl-header">
            <div className="fl-eyebrow">Framework Explorer</div>
            <h1 className="fl-title">Pilih <strong>Framework</strong> Kamu</h1>
            <p className="fl-subtitle">
              Jelajahi koleksi framework modern
            </p>
          </div>

          {/* Search */}
          <div className="fl-search-wrap">
            <div className="fl-search-container">
              <span className="fl-search-icon">🔍</span>
              <input
                className="fl-search"
                placeholder="Cari framework, tag, atau deskripsi..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Filter chips */}
          <div className="fl-filters">
            {allTags.slice(0, 10).map(tag => (
              <FilterChip
                key={tag}
                label={tag}
                active={activeFilter === tag}
                onClick={() => setFilter(tag)}
              />
            ))}
          </div>

          {/* Count */}
          <div className="fl-count">
            Menampilkan {filtered.length} dari {frameworkData.length} framework
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="fl-grid">
              {filtered.map((item, i) => (
                <FrameworkCard key={item.id} item={item} index={i} />
              ))}
            </div>
          ) : (
            <div className="fl-empty">
              <div className="fl-empty-icon">🔍</div>
              <p>Tidak ada framework yang cocok dengan pencarian <strong>"{search}"</strong></p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}