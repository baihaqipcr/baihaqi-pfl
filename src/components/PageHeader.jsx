/**
 * PageHeader — Reusable page title + subtitle + optional filter
 *
 * Props:
 *   title       string  — Main page title
 *   subtitle    string  — Subtitle / greeting text
 *   showFilter  bool    — Show the filter period button
 *   filterLabel string  — Filter button label (default: "Filter Periode")
 *   filterSub   string  — Filter date range subtitle
 */

import { useState } from 'react'

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <rect x="1" y="2.5" width="12" height="10" rx="1.5"/>
    <line x1="1" y1="5.5" x2="13" y2="5.5"/>
    <line x1="4" y1="1" x2="4" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
  </svg>
)
const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <polyline points="3 5 7 9 11 5"/>
  </svg>
)

export default function PageHeader({
  title = 'Dashboard',
  subtitle = '',
  showFilter = true,
  filterLabel = 'Filter Periode',
  filterSub = '17 April 2020 – 21 May 2020',
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-start justify-between mb-6">
      {/* Left: title + subtitle */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>
        )}
      </div>

      {/* Right: filter button */}
      {showFilter && (
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-600 hover:border-green-400 hover:text-green-600 transition-all shadow-sm"
        >
          <span className="text-blue-500"><CalendarIcon /></span>
          <div className="text-left">
            <div className="font-semibold text-gray-700">{filterLabel}</div>
            <div className="text-gray-400 text-[10px]">{filterSub}</div>
          </div>
          <span className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}>
            <ChevronIcon />
          </span>
        </button>
      )}
    </div>
  )
}