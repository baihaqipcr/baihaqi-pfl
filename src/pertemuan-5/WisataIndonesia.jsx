/**
 * WisataIndonesia.jsx
 * ─────────────────────────────────────────────
 * Komponen utama Pertemuan 5
 * • Data: 20 destinasi wisata Indonesia
 * • Guest View: Card grid yang menarik
 * • Admin View: Tabel lengkap dengan kolom detail
 * • Search: nama, lokasi, deskripsi
 * • Filter 1: Kategori (Pantai / Alam / Sejarah / Bahari / Budaya / Satwa)
 * • Filter 2: Status (Semua / Buka / Tutup)
 * • Responsive: mobile → tablet → desktop
 * ─────────────────────────────────────────────
 */

import { useState, useMemo } from "react"
import GuestView from "./GuestView"
import AdminView from "./AdminView"
import destinations from "./destinations.json"

const CATEGORIES = ["Semua", "Pantai", "Alam", "Sejarah", "Bahari", "Budaya", "Satwa"]
const STATUS_OPTIONS = [
  { value: "semua", label: "Semua Status" },
  { value: "buka",  label: "Sedang Buka"  },
  { value: "tutup", label: "Sedang Tutup" },
]

/* ── SearchBar ─────────────────────────────────────────────────── */
function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1 min-w-0">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Cari nama, lokasi, atau deskripsi..."
        className="w-full bg-gray-900 border border-gray-700 rounded-xl
                   pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600
                   focus:outline-none focus:border-emerald-500 focus:ring-1
                   focus:ring-emerald-500/30 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600
                     hover:text-white transition-colors"
        >✕</button>
      )}
    </div>
  )
}

/* ── FilterSelect ──────────────────────────────────────────────── */
function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1 min-w-[140px]">
      <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-1">
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2.5 text-sm
                   text-white focus:outline-none focus:border-emerald-500
                   focus:ring-1 focus:ring-emerald-500/30 transition-all cursor-pointer"
      >
        {options.map(o => (
          <option key={o.value ?? o} value={o.value ?? o}>
            {o.label ?? o}
          </option>
        ))}
      </select>
    </div>
  )
}

/* ── ViewToggle ────────────────────────────────────────────────── */
function ViewToggle({ view, onChange }) {
  return (
    <div className="flex bg-gray-900 border border-gray-800 rounded-xl p-1 gap-1">
      <button
        onClick={() => onChange("guest")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold
                    transition-all ${view === "guest"
                      ? "bg-emerald-600 text-white shadow"
                      : "text-gray-500 hover:text-gray-300"}`}
      >
        <span>👥</span>
        <span className="hidden sm:inline">Guest</span>
      </button>
      <button
        onClick={() => onChange("admin")}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold
                    transition-all ${view === "admin"
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-500 hover:text-gray-300"}`}
      >
        <span>🛡️</span>
        <span className="hidden sm:inline">Admin</span>
      </button>
    </div>
  )
}

/* ── ActiveFilterBadge ─────────────────────────────────────────── */
function ActiveFilterBadge({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30
                     text-emerald-400 text-xs px-2.5 py-0.5 rounded-full">
      {label}
      <button onClick={onRemove} className="hover:text-white transition-colors">✕</button>
    </span>
  )
}

/* ── Main Component ────────────────────────────────────────────── */
export default function WisataIndonesia() {
  const [view,     setView]     = useState("guest")
  const [search,   setSearch]   = useState("")
  const [category, setCategory] = useState("Semua")
  const [status,   setStatus]   = useState("semua")

  /* Filter logic */
  const filtered = useMemo(() => {
    return destinations.filter(d => {
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.address.city.toLowerCase().includes(q) ||
        d.address.province.toLowerCase().includes(q)

      const matchCategory = category === "Semua" || d.category === category
      const matchStatus =
        status === "semua" ||
        (status === "buka"  && d.isOpen) ||
        (status === "tutup" && !d.isOpen)

      return matchSearch && matchCategory && matchStatus
    })
  }, [search, category, status])

  const hasActiveFilters = category !== "Semua" || status !== "semua" || search

  function clearAll() {
    setSearch("")
    setCategory("Semua")
    setStatus("semua")
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ── Header ── */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

          {/* Top row: Logo + View Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>🗺️</span>
                <span>Wisata <span className="text-emerald-400">Indonesia</span></span>
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Pertemuan 5 · 20 Destinasi Wisata Nusantara
              </p>
            </div>
            <ViewToggle view={view} onChange={setView} />
          </div>

          {/* Mode indicator */}
          <div className={`text-xs font-semibold mb-4 px-3 py-1.5 rounded-lg inline-flex
                           items-center gap-2 border ${
            view === "guest"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-blue-500/10 border-blue-500/30 text-blue-400"
          }`}>
            <span>{view === "guest" ? "👥" : "🛡️"}</span>
            <span>Mode: {view === "guest" ? "Guest — Tampilan Publik" : "Admin — Panel Manajemen"}</span>
          </div>

          {/* ── Search + Filters ── */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">

            {/* Search */}
            <SearchBar value={search} onChange={setSearch} />

            {/* Filter 1: Kategori */}
            <FilterSelect
              label="Filter Kategori"
              value={category}
              onChange={setCategory}
              options={CATEGORIES.map(c => ({ value: c, label: c }))}
            />

            {/* Filter 2: Status */}
            <FilterSelect
              label="Filter Status"
              value={status}
              onChange={setStatus}
              options={STATUS_OPTIONS}
            />

            {/* Clear all */}
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="text-xs text-gray-500 hover:text-red-400 transition-colors
                           whitespace-nowrap pb-2.5 pt-5 sm:pt-0"
              >
                Reset Filter
              </button>
            )}
          </div>

          {/* Active filter badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-xs text-gray-600">Filter aktif:</span>
              {search && (
                <ActiveFilterBadge label={`"${search}"`} onRemove={() => setSearch("")} />
              )}
              {category !== "Semua" && (
                <ActiveFilterBadge label={category} onRemove={() => setCategory("Semua")} />
              )}
              {status !== "semua" && (
                <ActiveFilterBadge
                  label={STATUS_OPTIONS.find(s=>s.value===status)?.label}
                  onRemove={() => setStatus("semua")}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {view === "guest"
          ? <GuestView data={filtered} />
          : <AdminView data={filtered} />
        }
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-800 mt-8 py-6 text-center text-xs text-gray-700">
        <p>Pertemuan 5 · React + Tailwind CSS · Wisata Indonesia Dataset</p>
        <p className="mt-1">Responsive Design Demo — Mobile · Tablet · Desktop</p>
      </footer>

    </div>
  )
}