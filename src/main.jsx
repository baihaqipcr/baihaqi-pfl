/**
 * main.jsx — App entry point dengan navigasi 3 halaman
 *
 * Navigasi: Dashboard → Order List → Customer
 * Ganti halaman lewat Sidebar
 */

import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import React from 'react'

import Sidebar    from './layouts/Sidebar'
import Header     from './layouts/Header'
import Dashboard  from './pages/Dashboard'
import OrderList  from './pages/OrderList'
import Customer   from './pages/Customer'
import Error400   from './pages/Error400'
import Error401   from './pages/Error401'
import Error403   from './pages/Error403'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './assets/tailwind.css'

/* ── Page map ─────────────────────────────────────────────── */
const PAGES = {
  dashboard: Dashboard,
  order:     OrderList,
  customer:  Customer,
  error400:  Error400,
  error401:  Error401,
  error403:  Error403,
}

/* ── Page transition wrapper ──────────────────────────────── */
function PageWrapper({ pageKey, children }) {
  return (
    <div
      key={pageKey}
      style={{
        animation: 'pageIn 0.22s ease both',
      }}
    >
      {children}
    </div>
  )
}

/* ── App ───────────────────────────────────────────────────── */
function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const PageComponent = PAGES[currentPage] || Dashboard

  return (
    <>
      {/* Page transition keyframes */}
      <style>{`
        @keyframes pageIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <Sidebar activePage={currentPage} onNavigate={setCurrentPage} />

        <div className="flex flex-1 flex-col overflow-hidden min-w-0">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <PageWrapper pageKey={currentPage}>
              <PageComponent />
            </PageWrapper>
          </main>
        </div>
      </div>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <App />
    </BrowserRouter>
)