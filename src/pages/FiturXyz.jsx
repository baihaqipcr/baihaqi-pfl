import PageHeader from '../components/PageHeader'

export default function FiturXyz() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Fitur Xyz"
        subtitle="Dashboard / Order List"
        showFilter={false}
      />

      <div className="grid gap-5">
        <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Selamat datang di Fitur Xyz</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Ini adalah halaman fitur baru yang bisa diakses melalui menu "Fitur Xyz".
            Anda dapat menambahkan konten, elemen interaktif, atau informasi penting di sini sesuai kebutuhan.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-green-50 rounded-3xl p-6 border border-green-100">
            <p className="text-sm font-semibold text-green-700 mb-2">Ringkasan Fitur</p>
            <p className="text-sm text-gray-600">Fitur ini dibuat sebagai contoh halaman baru sesuai permintaan.</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-gray-100">
            <p className="text-sm font-semibold text-gray-900 mb-2">Status</p>
            <p className="text-sm text-gray-600">Halaman sudah terhubung dengan menu sidebar dan route React Router.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
