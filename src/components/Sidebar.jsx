import { Link, useLocation } from 'react-router-dom'

/* ── Icons ─────────────────────────────────────────────── */
const icons = {
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="1" width="6" height="6" rx="1.5"/>
      <rect x="9" y="1" width="6" height="6" rx="1.5"/>
      <rect x="1" y="9" width="6" height="6" rx="1.5"/>
      <rect x="9" y="9" width="6" height="6" rx="1.5"/>
    </svg>
  ),
  order: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="2" y="2" width="12" height="12" rx="2"/>
      <line x1="5" y1="6" x2="11" y2="6"/>
      <line x1="5" y1="9" x2="9"  y2="9"/>
    </svg>
  ),
  customer: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="8" cy="5" r="3"/>
      <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6"/>
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="8" cy="8" r="7"/>
      <line x1="8" y1="4" x2="8" y2="8"/>
      <line x1="8" y1="10" x2="8" y2="10"/>
    </svg>
  ),
  chevron: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="5 3 9 7 5 11"/>
    </svg>
  ),
  plus: (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="7" y1="2" x2="7" y2="12"/>
      <line x1="2" y1="7" x2="12" y2="7"/>
    </svg>
  ),
}

/* ── Nav groups (Ditambahkan property "path" untuk URL) ── */
const NAV_GROUPS = [
  {
    label: 'Main Menu',
    items: [
      { key: 'dashboard', label: 'Dashboard',  icon: 'dashboard', routable: true, path: '/' },
      { key: 'order',     label: 'Order List', icon: 'order',     routable: true, path: '/orders' },
      { key: 'customer',  label: 'Customer',   icon: 'customer',  routable: true, path: '/customers' },
    ],
  },
  {
    label: 'Error Pages',
    items: [
      { key: 'error400',  label: 'Error 400',  icon: 'error',     routable: true, path: '/error400' },
      { key: 'error401',  label: 'Error 401',  icon: 'error',     routable: true, path: '/error401' },
      { key: 'error403',  label: 'Error 403',  icon: 'error',     routable: true, path: '/error403' },
    ],
  },
]

/* ── Badge colors per key ──────────────────────────────── */
const BADGES = {
  order:    { count: 5,  color: 'bg-red-500'    },
  customer: { count: 2,  color: 'bg-blue-500'   },
  chat:     { count: 12, color: 'bg-orange-400' },
}

/* ── Single nav button (Ubah button jadi Link) ─────────── */
function NavItem({ item, currentPath }) {
  // Mengecek apakah menu ini aktif berdasarkan URL saat ini
  const isActive  = currentPath === item.path
  const badge     = BADGES[item.key]

  return (
    <Link
      to={item.path || '#'}
      title={item.label}
      className={`
        group relative w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl
        text-sm font-medium transition-all duration-200 text-left
        ${isActive
          ? 'bg-green-500 text-white shadow-md shadow-green-200'
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
        }
      `}
    >
      {/* Active left bar */}
      {isActive && (
        <span className="absolute left-0 top-2 bottom-2 w-1 bg-white/40 rounded-full" />
      )}

      {/* Icon */}
      <span className={`w-4 h-4 shrink-0 transition-transform duration-200
        ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-green-500 group-hover:scale-110'}`}>
        {icons[item.icon]}
      </span>

      {/* Label */}
      <span className="flex-1 truncate">{item.label}</span>

      {/* Badge */}
      {badge && !isActive && (
        <span className={`${badge.color} text-white text-[10px] font-bold
          min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1`}>
          {badge.count}
        </span>
      )}

      {/* Chevron for routable pages */}
      {item.routable && !isActive && (
        <span className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100
          transition-all duration-200 group-hover:translate-x-0.5">
          {icons.chevron}
        </span>
      )}
    </Link>
  )
}

/* ── Sidebar ─────────────────────────────────────────────── */
export default function Sidebar() {
  // Gunakan useLocation untuk mendeteksi URL yang sedang aktif
  const location = useLocation()

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-white border-r border-gray-100 shrink-0">

      {/* ── Logo ── */}
      <div className="px-6 pt-7 pb-5">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">HQestaurant</span>
          <span className="w-2 h-2 rounded-full bg-green-500 mb-0.5 self-end inline-block" />
        </div>
        <p className="text-xs text-gray-400 mt-0.5 font-medium">Restaurant Admin Restaurant</p>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 pb-4 overflow-y-auto space-y-5">
        {NAV_GROUPS.map(group => (
          <div key={group.label}>
            {/* Group label */}
            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest px-3.5 mb-1.5">
              {group.label}
            </p>

            {/* Items */}
            <div className="space-y-0.5">
              {group.items.map(item => (
                <NavItem
                  key={item.key}
                  item={item}
                  currentPath={location.pathname} // Oper URL saat ini ke NavItem
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* ── Promo card ── */}
      <div className="mx-3 mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 text-white relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-400 rounded-full opacity-40" />
        <div className="absolute -bottom-6 -left-4 w-16 h-16 bg-green-700 rounded-full opacity-30" />

        <div className="relative z-10">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" className="text-white">
              <path d="M7 16v-2a4 4 0 118 0v2"/>
              <path d="M5 16h12l-1 4H6l-1-4z"/>
              <circle cx="11" cy="7" r="3"/>
            </svg>
          </div>
          <p className="text-xs font-medium leading-relaxed opacity-90 mb-3">
            Please organize your menus through button below!
          </p>
          <button className="w-full bg-white text-green-600 text-xs font-bold py-2 rounded-xl
            hover:bg-green-50 active:scale-95 transition-all duration-150
            flex items-center justify-center gap-1.5">
            {icons.plus}
            Add Menus
          </button>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="px-5 pb-4 border-t border-gray-50 pt-3">
        <p className="text-[10px] text-gray-400 font-medium">HQestaurant Admin Dashboard</p>
        <p className="text-[10px] text-gray-400">© 2025 All Rights Reserved</p>
        <p className="text-[10px] text-gray-400 mt-1">
          Made with <span className="text-red-400">♥</span> by Pertemuan 5
        </p>
      </div>

    </aside>
  )
}