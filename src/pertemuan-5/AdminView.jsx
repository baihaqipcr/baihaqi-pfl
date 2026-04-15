function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`text-xs ${i <= Math.round(rating) ? "text-yellow-400" : "text-gray-700"}`}>★</span>
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

const CATEGORY_COLOR = {
  Pantai:  "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  Alam:    "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  Sejarah: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Bahari:  "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Budaya:  "bg-purple-500/10 text-purple-400 border-purple-500/30",
  Satwa:   "bg-orange-500/10 text-orange-400 border-orange-500/30",
}

export default function AdminView({ data }) {
  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Data",      val: 20,                                   color: "text-blue-400",    bg: "bg-blue-500/10 border-blue-500/20" },
          { label: "Hasil Filter",    val: data.length,                           color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          { label: "Sedang Buka",     val: data.filter(d=>d.isOpen).length,       color: "text-green-400",   bg: "bg-green-500/10 border-green-500/20" },
          { label: "Total Ulasan",    val: data.reduce((s,d)=>s+d.reviews.count,0).toLocaleString("id-ID"),
                                                                                   color: "text-yellow-400",  bg: "bg-yellow-500/10 border-yellow-500/20" },
        ].map((s,i) => (
          <div key={i} className={`rounded-xl border p-3 ${s.bg}`}>
            <div className={`text-xl font-bold ${s.color}`}>{s.val}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Result info */}
      <p className="text-sm text-gray-500 mb-3">
        Menampilkan <span className="text-white font-semibold">{data.length}</span> dari{" "}
        <span className="text-white font-semibold">20</span> destinasi
      </p>

      {/* Table wrapper (horizontal scroll on mobile) */}
      <div className="rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="bg-gray-900 border-b border-gray-800">
                {["#", "Foto", "Nama Destinasi", "Kategori", "Lokasi", "Harga", "Rating", "Status", "Fasilitas", "Ulasan", "Kontak"].map(h => (
                  <th key={h}
                      className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400
                                 uppercase tracking-wider whitespace-nowrap first:pl-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-16 text-gray-600">
                    <div className="text-3xl mb-2">🔍</div>
                    <p>Tidak ada data ditemukan</p>
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr key={item.id}
                      className={`border-b border-gray-800/60 hover:bg-gray-800/40
                                  transition-colors ${idx % 2 === 0 ? "bg-gray-900/30" : ""}`}>

                    {/* # */}
                    <td className="px-4 py-3 text-gray-600 text-xs font-mono">{String(idx+1).padStart(2,"0")}</td>

                    {/* Foto */}
                    <td className="px-4 py-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-10 object-cover rounded-lg border border-gray-700"
                        onError={e => { e.target.src = `https://picsum.photos/seed/${item.id+10}/120/80` }}
                      />
                    </td>

                    {/* Nama */}
                    <td className="px-4 py-3">
                      <div className="font-semibold text-white text-sm whitespace-nowrap">{item.name}</div>
                      <div className="text-[10px] text-gray-600 mt-0.5 max-w-[180px] truncate">{item.description}</div>
                    </td>

                    {/* Kategori */}
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium
                                        ${CATEGORY_COLOR[item.category] || "bg-gray-700 text-gray-300 border-gray-600"}`}>
                        {item.category}
                      </span>
                    </td>

                    {/* Lokasi (nested: address) */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-xs text-white">{item.address.city}</div>
                      <div className="text-[10px] text-gray-500">{item.address.province}</div>
                      <div className="text-[10px] text-gray-700 font-mono mt-0.5">
                        {item.address.coordinates.lat.toFixed(2)}, {item.address.coordinates.lng.toFixed(2)}
                      </div>
                    </td>

                    {/* Harga */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      {item.price === 0
                        ? <span className="text-emerald-400 text-xs font-semibold">Gratis</span>
                        : <span className="text-white text-xs font-mono">Rp {item.price.toLocaleString("id-ID")}</span>
                      }
                    </td>

                    {/* Rating (nested: reviews) */}
                    <td className="px-4 py-3">
                      <StarRating rating={item.rating} />
                      <div className="text-[10px] text-gray-600 mt-0.5">
                        {item.reviews.count.toLocaleString()} ulasan
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                        item.isOpen
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-red-500/10 text-red-400 border-red-500/30"
                      }`}>
                        {item.isOpen ? "● Buka" : "● Tutup"}
                      </span>
                    </td>

                    {/* Fasilitas (nested: facilities) */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5 text-[10px]">
                        {[
                          ["P", item.facilities.parking,    "Parkir"],
                          ["W", item.facilities.wifi,       "WiFi"],
                          ["R", item.facilities.restaurant, "Resto"],
                          ["S", item.facilities.surfRental, "Sport"],
                        ].map(([k, v, label]) => (
                          <span key={k} className={`flex items-center gap-1 ${v ? "text-emerald-400" : "text-gray-700"}`}>
                            <span>{v ? "✓" : "✗"}</span> {label}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Ulasan terbaru */}
                    <td className="px-4 py-3 max-w-[180px]">
                      <p className="text-[10px] text-gray-400 italic line-clamp-2">
                        "{item.reviews.latest}"
                      </p>
                    </td>

                    {/* Kontak (nested: contact) */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-[10px] text-gray-400 space-y-0.5">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-600">📞</span>
                          <span className="font-mono">{item.contact.phone.replace("+62","0").slice(0,12)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-600">🌐</span>
                          <span className="text-blue-400">{item.contact.website}</span>
                        </div>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
        <span>Menampilkan {data.length} entri</span>
        <span className="font-mono">Last updated: {new Date().toLocaleDateString("id-ID")}</span>
      </div>
    </div>
  )
}