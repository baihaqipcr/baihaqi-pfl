/**
 * Customer.jsx — Halaman Customer dengan CRUD
 */

import { useState, useMemo } from 'react'
import PageHeader from '../components/PageHeader'
// 1. Import data dari file JSON yang baru dibuat
import CUSTOMERS_DATA from './customers.json'

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

function CustomerTableRow({ c, onEdit, onDelete }) {
  const isActive = c.status === 'Active'
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={`https://picsum.photos/seed/${c.seed}/40/40`}
              alt={c.name}
              className="w-10 h-10 rounded-lg object-cover ring-1 ring-gray-100"
              onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${c.name}&size=40` }}
            />
            <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white
              ${isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{c.name}</p>
            <p className="text-xs text-gray-400">{c.email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{c.phone}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{c.city}</td>
      <td className="px-4 py-3 text-center">
        <span className="text-sm font-semibold text-gray-800">{c.orders}</span>
      </td>
      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{c.spent}</td>
      <td className="px-4 py-3">
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full
          ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
          {c.status}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{c.joined}</td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(c)}
            className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(c.id)}
            className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

function CustomerModal({ isOpen, onClose, onSave, editingCustomer }) {
  const [formData, setFormData] = useState(editingCustomer || {
    id: null,
    name: '',
    email: '',
    phone: '',
    city: '',
    orders: 0,
    spent: '',
    status: 'Active',
    joined: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'short' }).replace(' ', ' '),
    seed: ''
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Nama harus diisi'
    if (!formData.email.trim()) newErrors.email = 'Email harus diisi'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email tidak valid'
    if (!formData.phone.trim()) newErrors.phone = 'Nomor telepon harus diisi'
    if (!formData.city.trim()) newErrors.city = 'Kota harus diisi'
    if (formData.orders < 0) newErrors.orders = 'Jumlah order tidak boleh negatif'
    if (!formData.spent.trim()) newErrors.spent = 'Total pengeluaran harus diisi'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'orders' ? parseInt(value) || 0 : value
    }))
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData)
      setFormData({
        id: null,
        name: '',
        email: '',
        phone: '',
        city: '',
        orders: 0,
        spent: '',
        status: 'Active',
        joined: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'short' }).replace(' ', ' '),
        seed: ''
      })
      setErrors({})
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
        </h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama customer"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nomor Telepon</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0812-3456-7890"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Kota</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Jakarta"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
          </div>

          {/* Orders */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Jumlah Order</label>
            <input
              type="number"
              name="orders"
              value={formData.orders}
              onChange={handleChange}
              min="0"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.orders ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.orders && <p className="text-xs text-red-500 mt-1">{errors.orders}</p>}
          </div>

          {/* Spent */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Total Pengeluaran</label>
            <input
              type="text"
              name="spent"
              value={formData.spent}
              onChange={handleChange}
              placeholder="Rp 1.2 Jt"
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.spent ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.spent && <p className="text-xs text-red-500 mt-1">{errors.spent}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Seed (untuk avatar) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Seed Avatar</label>
            <input
              type="text"
              name="seed"
              value={formData.seed}
              onChange={handleChange}
              placeholder="gunakan nama atau inisial"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
          >
            {editingCustomer ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Customer() {
  const [customers, setCustomers] = useState(CUSTOMERS_DATA)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Calculate top customers
  const TOP = useMemo(() => {
    return [...customers].sort((a, b) => b.orders - a.orders).slice(0, 4)
  }, [customers])

  // Filter customers by search term
  const filteredCustomers = useMemo(() => {
    return customers.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [customers, searchTerm])

  const handleAddCustomer = () => {
    setEditingCustomer(null)
    setIsModalOpen(true)
  }

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer)
    setIsModalOpen(true)
  }

  const handleDeleteCustomer = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus customer ini?')) {
      setCustomers(prev => prev.filter(c => c.id !== id))
    }
  }

  const handleSaveCustomer = (formData) => {
    if (editingCustomer) {
      // Update existing customer
      setCustomers(prev => prev.map(c =>
        c.id === editingCustomer.id ? { ...formData, id: editingCustomer.id, seed: formData.seed || editingCustomer.seed } : c
      ))
    } else {
      // Add new customer
      const newCustomer = {
        ...formData,
        id: Math.max(...customers.map(c => c.id), 0) + 1,
        seed: formData.seed || formData.name.toLowerCase()
      }
      setCustomers(prev => [...prev, newCustomer])
    }
    setIsModalOpen(false)
    setEditingCustomer(null)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingCustomer(null)
  }

  return (
    <div className="space-y-5">
      {/* Memanggil PageHeader dengan 3 Props yang diminta */}
      <PageHeader
        title="Customer"
        breadcrumb={['Dashboard', 'Management', 'Customer']} // Contoh menggunakan Array
      >
        {/* Ini adalah prop "children" (Tombol akan otomatis ditaruh di sebelah kanan header) */}
        <button
          onClick={handleAddCustomer}
          className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2"
        >
          <span>+</span> Add Customer
        </button>
      </PageHeader>

      {/* Top Customers Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Top Customers</h3>
          <div className="space-y-3">
            {TOP.map(c => <CustomerCard key={c.id} c={c} />)}
          </div>
        </div>

        {/* Customer Statistics */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Customer Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Customers</span>
              <span className="text-lg font-bold text-gray-800">{customers.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Customers</span>
              <span className="text-lg font-bold text-green-600">
                {customers.filter(c => c.status === 'Active').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Inactive Customers</span>
              <span className="text-lg font-bold text-gray-500">
                {customers.filter(c => c.status === 'Inactive').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Orders</span>
              <span className="text-lg font-bold text-gray-800">
                {customers.reduce((sum, c) => sum + c.orders, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* All Customers Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">All Customers</h3>
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">City</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Orders</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Spent</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map(c => (
                  <CustomerTableRow
                    key={c.id}
                    c={c}
                    onEdit={handleEditCustomer}
                    onDelete={handleDeleteCustomer}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Add/Edit Customer */}
      <CustomerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCustomer}
        editingCustomer={editingCustomer}
      />
    </div>
  )
}