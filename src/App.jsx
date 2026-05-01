import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

// --- Import Halaman Utama ---
import Dashboard from './pages/Dashboard'
import OrderList from './pages/OrderList' 
import Customer from './pages/Customer'   

// --- Import Halaman Auth ---
import Login from './pages/auth/Login'
import Register from './pages/auth/Register' // 👈 Pastikan import ini ada dan path-nya benar!
import Forgot from './pages/auth/Forgot'     // 👈 Pastikan import ini ada dan path-nya benar!

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Utama (Pakai Sidebar) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/customers" element={<Customer />} />
        </Route>

        {/* Layout Auth (Tanpa Sidebar, untuk Login, Register, dll) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          
          {/*  👇 Tambahkan rute Register dan Forgot di dalam AuthLayout 👇 */}
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}