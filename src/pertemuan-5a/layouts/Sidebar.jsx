import { useState } from 'react'

/* ── SVG icon set ─────────────────────────────────────── */
const icons = {
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="1" width="6" height="6" rx="1.5"/>
      <rect x="9" y="1" width="6" height="6" rx="1.5"/>
      <rect x="1" y="9" width="6" height="6" rx="1.5"/>
      <rect x="9" y="9" width="6" height="6" rx="1.5"/>
    </svg>
  ),
  list: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="4" y1="4" x2="13" y2="4"/><line x1="4" y1="8" x2="13" y2="8"/><line x1="4" y1="12" x2="13" y2="12"/>
      <circle cx="2" cy="4" r="0.8" fill="currentColor" stroke="none"/>
      <circle cx="2" cy="8" r="0.8" fill="currentColor" stroke="none"/>
      <circle cx="2" cy="12" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  ),
  doc: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M3 2h7l3 3v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z"/>
      <polyline points="10 2 10 5 13 5"/>
      <line x1="5" y1="8" x2="11" y2="8"/><line x1="5" y1="11" x2="9" y2="11"/>
    </svg>
  ),
  user: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="8" cy="5" r="3"/>
      <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
    </svg>
  ),
  analytics: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <polyline points="1 11 5 6 9 9 15 3"/>
      <line x1="1" y1="15" x2="15" y2="15"/>
    </svg>
  ),
  star: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="8 1.5 10.2 6 15 6.7 11.5 10 12.4 14.8 8 12.4 3.6 14.8 4.5 10 1 6.7 5.8 6"/>
    </svg>
  ),
  food: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="8" cy="8" r="5"/>
      <path d="M8 3v2M8 11v2M3 8h2M11 8h2"/>
    </svg>
  ),
  fork: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M5 2v4a2 2 0 002 2v6M11 2v12M9 2v4"/>
    </svg>
  ),
  users: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="6" cy="5" r="2.5"/>
      <path d="M1 14c0-2.8 2.2-5 5-5s5 2.2 5 5"/>
      <circle cx="12" cy="5" r="2" opacity="0.6"/>
      <path d="M14 13c0-2-1.3-3.7-3-4.4" opacity="0.6"/>
    </svg>
  ),
  calendar: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <rect x="1" y="3" width="14" height="12" rx="2"/>
      <line x1="1" y1="7" x2="15" y2="7"/>
      <line x1="5" y1="1" x2="5" y2="5"/>
      <line x1="11" y1="1" x2="11" y2="5"/>
    </svg>
  ),
  chat: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M14 2H2a1 1 0 00-1 1v8a1 1 0 001 1h3l3 2 3-2h3a1 1 0 001-1V3a1 1 0 00-1-1z"/>
    </svg>
  ),
  wallet: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M1 4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4z"/>
      <path d="M11 8a1 1 0 110 2 1 1 0 010-2z" fill="currentColor" stroke="none"/>
      <line x1="1" y1="7" x2="15" y2="7"/>
    </svg>
  ),
  plus: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="7" y1="2" x2="7" y2="12"/>
      <line x1="2" y1="7" x2="12" y2="7"/>
    </svg>
  ),
}

const navItems = [
  { key: 'dashboard',    label: 'Dashboard',       icon: 'dashboard' },
  { key: 'orderList',    label: 'Order List',       icon: 'list' },
  { key: 'orderDetail',  label: 'Order Detail',     icon: 'doc' },
  { key: 'customer',     label: 'Customer',         icon: 'user' },
  { key: 'analytics',    label: 'Analytics',        icon: 'analytics' },
  { key: 'reviews',      label: 'Reviews',          icon: 'star' },
  { key: 'foods',        label: 'Foods',            icon: 'food' },
  { key: 'foodDetail',   label: 'Food Detail',      icon: 'fork' },
  { key: 'custDetail',   label: 'Customer Detail',  icon: 'users' },
  { key: 'calendar',     label: 'Calendar',         icon: 'calendar' },
  { key: 'chat',         label: 'Chat',             icon: 'chat' },
  { key: 'wallet',       label: 'Wallet',           icon: 'wallet' },
]

export default function Sidebar() {
  const [active, setActive] = useState('dashboard')

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-dark border-r border-gray-3000 shrink-0">

      {/* Logo */}
      <div className="px-6 pt-7 pb-5">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">Sedap</span>
          <span className="w-2 h-2 rounded-full bg-green-500 mb-0.5 self-end inline-block" />
        </div>
        <p className="text-xs text-gray-400 mt-0.5 font-medium">Modern Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pb-4 space-y-0.5 overflow-y-auto">
        {navItems.map(item => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`nav-item w-full text-left ${active === item.key ? 'active' : ''}`}
          >
            <span className="w-4 h-4 shrink-0">{icons[item.icon]}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Promo card */}
      <div className="mx-3 mb-4 bg-green-500 rounded-2xl p-4 text-white relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400 rounded-full opacity-40" />
        <div className="absolute -bottom-6 -left-4 w-16 h-16 bg-green-600 rounded-full opacity-30" />

        <div className="relative z-10">
          {/* Chef hat icon */}
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-white" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M7 16v-2a4 4 0 118 0v2"/>
              <path d="M5 16h12l-1 4H6l-1-4z"/>
              <circle cx="11" cy="7" r="3"/>
            </svg>
          </div>
          <p className="text-xs font-medium leading-relaxed opacity-90 mb-3">
            Please organize your menus through button below!
          </p>
          <button className="w-full bg-white text-green-600 text-xs font-bold py-2 rounded-xl hover:bg-green-50 transition-colors flex items-center justify-center gap-1.5">
            {icons.plus}
            Add Menus
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-4 border-t border-gray-50 pt-3">
        <p className="text-[10px] text-gray-400 font-medium">Sedap Restaurant Admin Dashboard</p>
        <p className="text-[10px] text-gray-400">© 2025 All Rights Reserved</p>
        <p className="text-[10px] text-gray-400 mt-1">
          Made with{' '}
          <span className="text-red-400">♥</span>
          {' '}by Pertemuan 5
        </p>
      </div>
    </aside>
  )
}