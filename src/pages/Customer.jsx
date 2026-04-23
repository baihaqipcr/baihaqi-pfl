/**
 * Customer.jsx — Halaman Customer
 */

import PageHeader from '../components/PageHeader'

const CUSTOMERS = [
  { id: 1, name: 'Jons Sena',       email: 'jons@email.com',     phone: '0812-3456-7890', city: 'Jakarta',   orders: 24, spent: 'Rp 1.2 Jt',  status: 'Active',   joined: 'Jan 2024', seed: 'jons'    },
  { id: 2, name: 'Sofia Amalia',    email: 'sofia@email.com',    phone: '0821-9988-1122', city: 'Bandung',   orders: 18, spent: 'Rp 840 Rb',  status: 'Active',   joined: 'Mar 2024', seed: 'sofia'   },
  { id: 3, name: 'Budi Santoso',    email: 'budi@email.com',     phone: '0813-5544-2233', city: 'Surabaya',  orders: 31, spent: 'Rp 1.8 Jt',  status: 'Active',   joined: 'Dec 2023', seed: 'budi'    },
  { id: 4, name: 'Anandreansyah',   email: 'anand@email.com',    phone: '0878-2211-3344', city: 'Medan',     orders: 7,  spent: 'Rp 320 Rb',  status: 'Inactive', joined: 'Jun 2024', seed: 'anand'   },
  { id: 5, name: 'Rina Kusuma',     email: 'rina@email.com',     phone: '0857-6677-8899', city: 'Yogyakarta',orders: 12, spent: 'Rp 560 Rb',  status: 'Active',   joined: 'Feb 2024', seed: 'rina'    },
  { id: 6, name: 'Doni Prasetyo',   email: 'doni@email.com',     phone: '0819-3344-5566', city: 'Bali',      orders: 42, spent: 'Rp 2.4 Jt',  status: 'Active',   joined: 'Nov 2023', seed: 'doni'    },
  { id: 7, name: 'Mega Wulandari',  email: 'mega@email.com',     phone: '0895-7788-9900', city: 'Semarang',  orders: 9,  spent: 'Rp 405 Rb',  status: 'Active',   joined: 'Apr 2024', seed: 'mega'    },
  { id: 8, name: 'Fajar Hidayat',   email: 'fajar@email.com',    phone: '0823-1122-3344', city: 'Makassar',  orders: 3,  spent: 'Rp 135 Rb',  status: 'Inactive', joined: 'Aug 2024', seed: 'fajar'   },
]

/* TOP CUSTOMERS (by orders) */
const TOP = [...CUSTOMERS].sort((a, b) => b.orders - a.orders).slice(0, 4)

function CustomerCard({ c }) {
  const isActive = c.status === 'Active'
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3
      hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
      <div className="relative shrink-0">
        <img
          src={`https://picsum.photos/seed/${c.seed}/48/48`}
          alt={c.name}
          className="w-12 h-12 rounded-xl object-cover ring-2 ring-gray-100"
          onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${c.name}&size=48` }}
        />
        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white
          ${isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-800 truncate group-hover:text-green-600 transition-colors">
          {c.name}
        </p>
        <p className="text-[11px] text-gray-400 truncate">{c.city}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-extrabold text-gray-800">{c.orders}</p>
        <p className="text-[10px] text-gray-400 font-medium">orders</p>
      </div>
    </div>
  )
}

export default function Customer() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Customer"
        subtitle="Manage your customer data and activity"
        showFilter={false}
      />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Customers', value: '1,284', icon: '👥', bg: 'bg-purple-50', color: 'text-purple-600', change: '+12 this week', up: true  },
          { label: 'Active Today',    value: '348',   icon: '🟢', bg: 'bg-green-50',  color: 'text-green-600',  change: '+5 vs yesterday', up: true  },
          { label: 'New This Month',  value: '64',    icon: '✨', bg: 'bg-blue-50',   color: 'text-blue-600',   change: '+18% growth', up: true  },
          { label: 'Churned',         value: '11',    icon: '⚠️', bg: 'bg-red-50',    color: 'text-red-500',    change: '-3 vs last month', up: false },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
            <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center text-xl shrink-0`}>{s.icon}</div>
            <div>
              <p className={`text-xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              <p className={`text-[10px] font-semibold mt-0.5 ${s.up ? 'text-green-500' : 'text-red-400'}`}>
                {s.up ? '▲' : '▼'} {s.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Top customers + table */}
      <div className="flex gap-4">

        {/* Top customers */}
        <div className="w-60 shrink-0 space-y-2.5">
          <h3 className="text-sm font-bold text-gray-800 mb-3">Top Customers</h3>
          {TOP.map(c => <CustomerCard key={c.id} c={c} />)}
        </div>

        {/* Table */}
        <div className="flex-1 min-w-0 bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-800">All Customers</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                <input
                  placeholder="Search customer..."
                  className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl
                    focus:outline-none focus:border-green-400 w-52 placeholder:text-gray-400"
                />
              </div>
              <select className="text-sm border border-gray-200 rounded-xl px-3 py-2 text-gray-600
                focus:outline-none bg-gray-50">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold
                px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5">
                + Add Customer
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Customer', 'Email', 'Phone', 'City', 'Orders', 'Total Spent', 'Status', 'Joined'].map(h => (
                    <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase
                      tracking-wider px-4 py-3 whitespace-nowrap first:pl-5 last:pr-5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CUSTOMERS.map((c, i) => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-green-50/40
                    transition-colors duration-100 group cursor-pointer">
                    {/* Customer */}
                    <td className="px-4 py-3 pl-5">
                      <div className="flex items-center gap-2.5">
                        <div className="relative shrink-0">
                          <img
                            src={`https://picsum.photos/seed/${c.seed}/32/32`}
                            alt={c.name}
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100"
                            onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${c.name}&size=32` }}
                          />
                          <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white
                            ${c.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`} />
                        </div>
                        <span className="text-sm font-semibold text-gray-800 group-hover:text-green-600
                          transition-colors">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{c.email}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 font-mono">{c.phone}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 font-medium">{c.city}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-bold text-gray-800">{c.orders}</span>
                      <span className="text-xs text-gray-400 ml-1">orders</span>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-green-600">{c.spent}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full
                        ${c.status === 'Active'
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 pr-5 text-xs text-gray-400">{c.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Showing <span className="font-semibold text-gray-700">1–8</span> of{' '}
              <span className="font-semibold text-gray-700">1,284</span> customers
            </p>
            <div className="flex items-center gap-1.5">
              {['‹', '1', '2', '3', '...', '161', '›'].map((p, i) => (
                <button key={i} className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors
                  ${p === '1' ? 'bg-green-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}