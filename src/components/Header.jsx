import { useState } from 'react'

/* ── Icon helpers ──────────────────────────────────── */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="7" cy="7" r="5"/>
    <line x1="11" y1="11" x2="14.5" y2="14.5"/>
  </svg>
)
const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <path d="M9 1.5a5.5 5.5 0 00-5.5 5.5v3L2 12h14l-1.5-2V7A5.5 5.5 0 009 1.5z"/>
    <path d="M7 12v.5a2 2 0 004 0V12"/>
  </svg>
)
const ChatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <path d="M16 2H2a1 1 0 00-1 1v9a1 1 0 001 1h3.5l3.5 2.5 3.5-2.5H16a1 1 0 001-1V3a1 1 0 00-1-1z"/>
    <line x1="5" y1="7" x2="13" y2="7"/>
    <line x1="5" y1="10" x2="10" y2="10"/>
  </svg>
)
const GiftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <rect x="2" y="7" width="14" height="10" rx="1"/>
    <path d="M1 7h16v-2a1 1 0 00-1-1H2a1 1 0 00-1 1v2z"/>
    <line x1="9" y1="5" x2="9" y2="17"/>
    <path d="M9 5c0-2 3-4 3-1.5S9 5 9 5z"/>
    <path d="M9 5c0-2-3-4-3-1.5S9 5 9 5z"/>
  </svg>
)
const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <circle cx="9" cy="9" r="3"/>
    <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.2 3.2l1.4 1.4M13.4 13.4l1.4 1.4M3.2 14.8l1.4-1.4M13.4 4.6l1.4-1.4"/>
  </svg>
)

/* ── Badge wrapper ─────────────────────────────────── */
function IconBtn({ children, badgeColor = null, badgeText = '' }) {
  return (
    <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
      {children}
      {badgeColor && (
        <span
          className={`absolute top-1 right-1 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center ${badgeColor}`}
          style={{ fontSize: '9px' }}
        >
          {badgeText}
        </span>
      )}
    </button>
  )
}

export default function Header() {
  const [search, setSearch] = useState('')

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center gap-4 px-6 shrink-0">

      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search here..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:bg-white transition-all placeholder:text-gray-400"
        />
      </div>

      <div className="flex-1" />

      {/* Icon buttons */}
      <div className="flex items-center gap-1">
        <IconBtn badgeColor="bg-blue-500" badgeText="2"><BellIcon /></IconBtn>
        <IconBtn badgeColor="bg-green-500" badgeText="3"><ChatIcon /></IconBtn>
        <IconBtn badgeColor="bg-orange-500" badgeText="1"><GiftIcon /></IconBtn>
        <IconBtn><SettingsIcon /></IconBtn>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-gray-200" />

      {/* User */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-xs text-gray-500 font-medium">Hello,</p>
          <p className="text-sm font-bold text-gray-800 leading-tight">Baihaqi</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm overflow-hidden">
          <img
            src="https://generationiron.com/wp-content/uploads/2021/08/header-22-1024x543.jpg"
            alt="Baihaqi"
            className="w-full h-full object-cover"
            onError={e => { e.target.style.display = 'none' }}
          />
          S
        </div>
      </div>
    </header>
  )
}