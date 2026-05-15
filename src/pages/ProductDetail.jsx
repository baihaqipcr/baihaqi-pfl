import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from "react"
import axios from "axios"
import PageHeader from '../components/PageHeader'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true) // Tambahan state loading biar UX lebih mulus

  useEffect(() => {
    // Pastikan reset state saat ID berubah
    setLoading(true)
    setError(null)

    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Produk tidak ditemukan")
        setLoading(false)
      })
  }, [id])

  // Tampilan saat data masih di-load
  if (loading) {
    return (
      <div className="space-y-5">
        <PageHeader title="Product Detail" subtitle="Memuat data produk..." showFilter={false} />
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center py-20 text-gray-500 font-medium">
          Menyeduh data... ☕
        </div>
      </div>
    )
  }

  // Tampilan saat terjadi error (misalnya ID tidak ketemu)
  if (error) {
    return (
      <div className="space-y-5">
        <PageHeader title="Product Detail" subtitle="Terjadi Kesalahan" showFilter={false} />
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center py-16">
          <p className="text-red-500 mb-4 font-semibold">⚠️ {error}</p>
          <Link to="/orders" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-4 py-2 rounded-lg">
            ← Kembali ke Order List
          </Link>
        </div>
      </div>
    )
  }

  // Tampilan saat data sukses didapatkan
  return (
    <div className="space-y-5">
      <PageHeader
        title="Product Detail"
        subtitle={`Detail lengkap untuk menu ${product.title}`}
        showFilter={false}
      />

      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Bagian Gambar */}
          <div className="w-full md:w-1/3 shrink-0">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="rounded-xl w-full h-auto object-cover border border-gray-100 bg-gray-50 shadow-sm"
            />
          </div>

          {/* Bagian Informasi Teks */}
          <div className="space-y-5 flex-1 w-full">
            <div>
              <p className="text-[11px] uppercase text-gray-400 font-bold tracking-[0.18em]">Product ID</p>
              <p className="text-lg font-bold text-gray-900 font-mono">#{id}</p>
            </div>

            <div>
              <p className="text-[11px] uppercase text-gray-400 font-bold tracking-[0.18em]">Brand & Kategori</p>
              <p className="text-sm text-gray-700 font-semibold mt-1">
                <span className="bg-gray-100 px-2 py-1 rounded-md">{product.category}</span>
                {product.brand && <span className="ml-2 px-2 py-1 bg-amber-50 text-amber-700 rounded-md">{product.brand}</span>}
              </p>
            </div>

            <div>
              <p className="text-[11px] uppercase text-gray-400 font-bold tracking-[0.18em]">Nama Produk</p>
              <p className="text-xl font-bold text-gray-900">{product.title}</p>
            </div>

            <div>
              <p className="text-[11px] uppercase text-gray-400 font-bold tracking-[0.18em]">Deskripsi</p>
              <p className="text-sm text-gray-600 leading-relaxed mt-1">{product.description}</p>
            </div>

            <div>
              <p className="text-[11px] uppercase text-gray-400 font-bold tracking-[0.18em]">Harga Total</p>
              <p className="text-2xl font-black text-emerald-600 tracking-tight">
                {/* Menggunakan toLocaleString agar format Rupiah otomatis rapi (contoh: Rp 85.000) */}
                Rp {(product.price * 1000).toLocaleString('id-ID')}
              </p>
            </div>

            {/* Tombol Kembali */}
            <div className="border-t border-gray-100 pt-6 mt-4">
              <Link to="/orders" className="inline-flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                <span className="mr-2">←</span> Kembali ke Order List
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}