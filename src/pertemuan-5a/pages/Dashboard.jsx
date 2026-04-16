import PageHeader from '../components/PageHeader'

/* ═══════════════════════════════════════════════
   HELPER: smooth cubic-bezier SVG path from data
═══════════════════════════════════════════════ */
function makePath(values, w, h, padX = 10, padT = 10, padB = 10) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const pts = values.map((v, i) => ({
    x: padX + (i / (values.length - 1)) * (w - padX * 2),
    y: padT + (1 - (v - min) / range) * (h - padT - padB),
  }))
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i - 1], c = pts[i], mx = (p.x + c.x) / 2
    d += ` C ${mx} ${p.y} ${mx} ${c.y} ${c.x} ${c.y}`
  }
  return { d, pts }
}
function makeArea(linePath, pts, h, padB = 10) {
  const last = pts[pts.length - 1], first = pts[0]
  return `${linePath} L ${last.x} ${h - padB} L ${first.x} ${h - padB} Z`
}

/* ═══════════════════════════════════════════════
   STAT CARD
═══════════════════════════════════════════════ */
function StatCard({ icon, value, label, change, changeDir = 'up', iconBg = 'bg-green-100' }) {
  const isUp = changeDir === 'up'
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-extrabold text-gray-900 leading-tight">{value}</p>
        <p className="text-xs text-gray-500 font-medium mt-0.5">{label}</p>
        <p className={`text-[11px] font-semibold mt-1 ${isUp ? 'text-green-500' : 'text-red-400'}`}>
          {isUp ? '▲' : '▼'} {change}
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   DONUT CHART
═══════════════════════════════════════════════ */
function DonutChart({ pct, color, trackColor = '#f1f5f9', size = 84, strokeW = 12, label }) {
  const r = (size - strokeW) / 2
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  const cx = size / 2, cy = size / 2

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={trackColor} strokeWidth={strokeW}/>
          <circle
            cx={cx} cy={cy} r={r}
            fill="none" stroke={color} strokeWidth={strokeW}
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-base font-extrabold text-gray-800">{pct}%</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 font-medium mt-1.5">{label}</p>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   PIE CHARTS PANEL
═══════════════════════════════════════════════ */
function PieChartsPanel() {
  return (
    <div className="card p-5 flex-1 min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-bold text-gray-800">Pie Chart</h2>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
            <div className="w-3.5 h-3.5 border border-gray-300 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-400 rounded-sm"/>
            </div>
            Chart
          </label>
          <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
            <div className="w-3.5 h-3.5 bg-red-400 rounded-sm"/>
            Show Value
          </label>
          <button className="text-gray-400 hover:text-gray-600 text-lg leading-none">⋯</button>
        </div>
      </div>

      {/* 3 donuts */}
      <div className="flex justify-around items-center py-2">
        <DonutChart pct={81} color="#f87171" label="Total Order" />
        <DonutChart pct={22} color="#34d399" label="Customer Growth" />
        <DonutChart pct={62} color="#60a5fa" label="Total Revenue" />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   CHART ORDER (line chart)
═══════════════════════════════════════════════ */
function ChartOrder() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const data = [18, 32, 22, 45, 38, 55, 42]
  const W = 320, H = 110
  const { d, pts } = makePath(data, W, H, 14, 12, 24)
  const area = makeArea(d, pts, H, 24)
  const peak = pts.reduce((a, b) => (b.y < a.y ? b : a))

  return (
    <div className="card p-5 flex-1 min-w-0">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-sm font-bold text-gray-800">Chart Order</h2>
          <p className="text-[11px] text-gray-400 mt-0.5">Lorem ipsum dolor sit amet consectetur adipiscing</p>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-500 border border-blue-200 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="6" y1="1" x2="6" y2="9"/><line x1="2" y1="9" x2="10" y2="9"/>
            <polyline points="3 6 6 9 9 6"/>
          </svg>
          Save Report
        </button>
      </div>

      {/* SVG Chart */}
      <div className="relative mt-1" style={{ width: '100%' }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none">
          <defs>
            <linearGradient id="order-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[0.2, 0.4, 0.6, 0.8].map((f, i) => (
            <line key={i} x1={14} y1={12 + f * 74} x2={W - 14} y2={12 + f * 74}
              stroke="#f1f5f9" strokeWidth="1"/>
          ))}
          {/* Area + line */}
          <path d={area} fill="url(#order-grad)"/>
          <path d={d} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Data points */}
          {pts.map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill="white" stroke="#3b82f6" strokeWidth="2"/>
          ))}
          {/* Peak annotation */}
          <circle cx={peak.x} cy={peak.y} r="6" fill="#3b82f6"/>
          <circle cx={peak.x} cy={peak.y} r="4" fill="white"/>
          {/* Tooltip box */}
          <rect x={peak.x - 28} y={peak.y - 28} width="56" height="20" rx="4" fill="#1e40af"/>
          <text x={peak.x} y={peak.y - 14} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">456 Order</text>
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between px-3 mt-1">
          {days.map(d => (
            <span key={d} className="text-[9px] text-gray-400" style={{ fontSize: '9px' }}>
              {d.slice(0, 3)}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   TOTAL REVENUE CHART
═══════════════════════════════════════════════ */
function TotalRevenueChart() {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
  const y2020 = [15, 28, 20, 38, 30, 45, 35, 22, 38, 28, 35, 42]
  const y2021 = [28, 18, 35, 22, 42, 32, 48, 38, 25, 42, 35, 48]
  const W = 460, H = 170

  const { d: d20, pts: pts20 } = makePath(y2020, W, H, 12, 10, 28)
  const { d: d21, pts: pts21 } = makePath(y2021, W, H, 12, 10, 28)
  const area20 = makeArea(d20, pts20, H, 28)
  const area21 = makeArea(d21, pts21, H, 28)

  // Peak annotations
  const peak20 = pts20.reduce((a, b) => (b.y < a.y ? b : a))
  const peak21 = pts21.reduce((a, b) => (b.y < a.y ? b : a))

  return (
    <div className="card p-5 flex-1 min-w-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-800">Total Revenue</h2>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-1.5 rounded-full bg-blue-400 inline-block"/>
            <span className="text-gray-500">2020</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-1.5 rounded-full bg-red-400 inline-block"/>
            <span className="text-gray-500">2021</span>
          </span>
        </div>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none">
          <defs>
            <linearGradient id="rev20-g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.02"/>
            </linearGradient>
            <linearGradient id="rev21-g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#fca5a5" stopOpacity="0.02"/>
            </linearGradient>
          </defs>
          {/* Grid */}
          {['$10k','$20k','$30k','$40k'].map((l, i) => (
            <g key={i}>
              <line x1={34} y1={140 - i * 32} x2={W} y2={140 - i * 32} stroke="#f1f5f9" strokeWidth="1"/>
              <text x={0} y={140 - i * 32 + 4} fontSize="8" fill="#9ca3af">{l}</text>
            </g>
          ))}
          {/* Areas */}
          <path d={area20} fill="url(#rev20-g)"/>
          <path d={area21} fill="url(#rev21-g)"/>
          {/* Lines */}
          <path d={d20} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
          <path d={d21} fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
          {/* Annotations */}
          {[
            { pt: peak20, val: '$36,703.00', color: '#3b82f6' },
            { pt: peak21, val: '$12,483.00', color: '#ef4444' },
          ].map(({ pt, val, color }, i) => (
            <g key={i}>
              <line x1={pt.x} y1={10} x2={pt.x} y2={H - 28} stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
              <circle cx={pt.x} cy={pt.y} r="4" fill={color}/>
              <rect x={pt.x - 32} y={pt.y - 22} width="64" height="16" rx="4" fill={color}/>
              <text x={pt.x} y={pt.y - 10} textAnchor="middle" fill="white" fontSize="7.5" fontWeight="bold">{val}</text>
            </g>
          ))}
        </svg>
        {/* X labels */}
        <div className="flex justify-between px-3 mt-0">
          {months.map(m => (
            <span key={m} className="text-[9px] text-gray-400">{m}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   CUSTOMER MAP (bar chart)
═══════════════════════════════════════════════ */
function CustomerMap() {
  const days = ['Sun','Sun','Sun','Sun','Sun','Sun','Sun']
  const data = [
    { y: 62, r: 78 }, { y: 85, r: 42 }, { y: 54, r: 68 }, { y: 72, r: 88 },
    { y: 40, r: 58 }, { y: 66, r: 46 }, { y: 78, r: 52 },
  ]
  const maxVal = 100
  const W = 240, H = 120, chartH = 90, chartY = 10
  const barW = 12, gap = 4, groupW = barW * 2 + gap
  const sectionW = W / data.length

  return (
    <div className="card p-5 min-w-[280px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-800">Customer Map</h2>
        <div className="flex items-center gap-2">
          <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 focus:outline-none focus:border-green-400">
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
          <button className="text-gray-400 hover:text-gray-600">⋯</button>
        </div>
      </div>

      {/* Y labels + bars */}
      <div className="flex gap-2">
        {/* Y axis */}
        <div className="flex flex-col justify-between text-[9px] text-gray-400 pr-1 pb-5" style={{ height: H }}>
          {[80, 60, 40, 20, 0].map(v => <span key={v}>{v}</span>)}
        </div>

        {/* Bar chart */}
        <div className="flex-1 relative" style={{ height: H }}>
          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((f, i) => (
            <div key={i} className="absolute left-0 right-0 border-t border-gray-100"
              style={{ top: (1 - f) * (H - 20) + 'px' }}/>
          ))}

          <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H}>
            {data.map((d, i) => {
              const centerX = (i + 0.5) * (W / data.length)
              const yH = (d.y / maxVal) * chartH
              const rH = (d.r / maxVal) * chartH
              const x1 = centerX - barW - gap / 2
              const x2 = centerX + gap / 2
              return (
                <g key={i}>
                  <rect x={x1} y={chartY + chartH - yH} width={barW} height={yH} rx="3" fill="#fbbf24"/>
                  <rect x={x2} y={chartY + chartH - rH} width={barW} height={rH} rx="3" fill="#f87171"/>
                </g>
              )
            })}
          </svg>

          {/* X labels */}
          <div className="flex justify-around text-[9px] text-gray-400 mt-0">
            {days.map((d, i) => <span key={i}>{d}</span>)}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 justify-center text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-amber-400 inline-block"/>New Customer
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-red-400 inline-block"/>Old Customer
        </span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   REVIEW CARD
═══════════════════════════════════════════════ */
function ReviewCard({ name, date, text, rating, foodImg, avatarSeed }) {
  return (
    <div className="bg-gray-900 rounded-2xl p-4 flex gap-3 min-w-0">
      <img
        src={`https://picsum.photos/seed/${avatarSeed}/48/48`}
        alt={name}
        className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-gray-100"
        onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${name}&size=40` }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-bold text-gray-800">{name}</p>
            <p className="text-[10px] text-gray-400">{date}</p>
          </div>
          <img
            src={`https://picsum.photos/seed/${foodImg}/70/70`}
            alt="food"
            className="w-16 h-16 rounded-xl object-cover shrink-0"
          />
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mt-2 line-clamp-3">
          {text}
        </p>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex text-amber-400 text-sm">
            {'★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
            <span className="text-gray-300">★</span>
          </div>
          <span className="text-xs font-semibold text-gray-700">{rating}</span>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   DASHBOARD PAGE
═══════════════════════════════════════════════ */
const reviews = [
  {
    name: 'Fathur Teyeng', date: '1 month ago', rating: '4',
    text: 'Makanannya enak banget pokoknya deh ayam bakarnya!!!',
    avatarSeed: 'FT',
  },
  {
    name: 'Gipo Pertamax Turbo', date: '14 days ago', rating: '4.0',
    text: 'Rasanya hampir seperti makanan buatan ibu, bintang 4 aja deh',
    avatarSeed: 'GP',
  },
  {
    name: 'Arsyad', date: '3 days ago', rating: '4.5',
    text: 'Ga perlu banyak cincong, pokoknya beli deh menu2 di Sedap, dijamin gak nyesel',
    avatarSeed: 'A',
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-5 max-w-full">

      {/* ── Page Header ── */}
      <PageHeader
        title="Dashboard"
        subtitle="Hi, Baihaqi. Welcome back to Sedap Admin!"
        showFilter={true}
        filterLabel="Filter Periode"
        filterSub="17 April 2020 – 21 May 2020"
      />

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round">
              <rect x="4" y="6" width="20" height="16" rx="3"/>
              <path d="M4 10h20M9 14h2M13 14h6M9 17h4"/>
            </svg>
          }
          value="75"
          label="Total Orders"
          change="+4.4 (00%) total"
          changeDir="up"
          iconBg="bg-green-50"
        />
        <StatCard
          icon={
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#0891b2" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 14l5 5L22 8"/>
              <rect x="3" y="3" width="22" height="22" rx="4" opacity="0.3"/>
            </svg>
          }
          value="357"
          label="Total Delivered"
          change="+4.4 (00%) total"
          changeDir="up"
          iconBg="bg-cyan-50"
        />
        <StatCard
          icon={
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="14" cy="14" r="9"/>
              <line x1="14" y1="10" x2="14" y2="14"/>
              <circle cx="14" cy="17" r="1" fill="#d97706" stroke="none"/>
            </svg>
          }
          value="65"
          label="Total Cancelled"
          change="-2.1 (-2.2%) total"
          changeDir="down"
          iconBg="bg-amber-50"
        />
        <StatCard
          icon={
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#0f766e" strokeWidth="1.8" strokeLinecap="round">
              <rect x="4" y="8" width="20" height="14" rx="3"/>
              <path d="M9 8V6a5 5 0 0110 0v2"/>
              <circle cx="14" cy="15" r="3"/>
              <line x1="14" y1="18" x2="14" y2="20"/>
            </svg>
          }
          value="$128"
          label="Total Revenue"
          change="+1.2 (3.10%) total"
          changeDir="up"
          iconBg="bg-teal-50"
        />
      </div>

      {/* ── Charts Row 1 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PieChartsPanel />
        <ChartOrder />
      </div>

      {/* ── Charts Row 2 ── */}
      <div className="flex gap-4 flex-col xl:flex-row">
        <TotalRevenueChart />
        <CustomerMap />
      </div>

      {/* ── Customer Reviews ── */}
      <div className="card p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-gray-800">Customer Review</h2>
            <p className="text-[11px] text-gray-400 mt-0.5">Earn huge consequuntur utadigni sit.</p>
          </div>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm">‹</button>
            <button className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm">›</button>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <ReviewCard key={i} {...r} />
          ))}
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-2" />
    </div>
  )
}