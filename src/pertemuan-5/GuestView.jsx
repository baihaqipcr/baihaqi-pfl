const CATEGORY_COLOR = {
  Pantai:   { bg: "bg-cyan-500/10",   border: "border-cyan-500/30",   text: "text-cyan-400",   dot: "bg-cyan-400"   },
  Alam:     { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", dot: "bg-emerald-400" },
  Sejarah:  { bg: "bg-amber-500/10",  border: "border-amber-500/30",  text: "text-amber-400",  dot: "bg-amber-400"  },
  Bahari:   { bg: "bg-blue-500/10",   border: "border-blue-500/30",   text: "text-blue-400",   dot: "bg-blue-400"   },
  Budaya:   { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", dot: "bg-purple-400" },
  Satwa:    { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400", dot: "bg-orange-400" },
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`text-sm ${i <= Math.round(rating) ? "text-yellow-400" : "text-gray-600"}`}>★</span>
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

function FacilityBadge({ available, label }) {
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${
      available
        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
        : "bg-gray-800 border-gray-700 text-gray-600 line-through"
    }`}>
      {label}
    </span>
  )
}

function DestinationCard({ item }) {
  const c = CATEGORY_COLOR[item.category] || CATEGORY_COLOR.Alam
  const isFree = item.price === 0

  return (
    <div className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden
                    hover:border-gray-600 hover:-translate-y-1.5 hover:shadow-2xl
                    hover:shadow-black/50 transition-all duration-300 flex flex-col">

      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={e => { e.target.src = `https://picsum.photos/seed/${item.id}/600/400` }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

        {/* Category badge */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1
                         rounded-full border text-xs font-semibold backdrop-blur-sm
                         ${c.bg} ${c.border} ${c.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
          {item.category}
        </div>

        {/* Open/Closed */}
        <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium
                         backdrop-blur-sm border ${
          item.isOpen
            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
            : "bg-red-500/20 border-red-500/40 text-red-300"
        }`}>
          {item.isOpen ? "● Buka" : "● Tutup"}
        </div>

        {/* Price */}
        <div className="absolute bottom-3 right-3 bg-gray-900/90 backdrop-blur-sm
                        border border-gray-700 rounded-lg px-2.5 py-1">
          <span className="text-sm font-bold text-white">
            {isFree ? "Gratis" : `Rp ${item.price.toLocaleString("id-ID")}`}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">

        {/* Name + Location */}
        <div>
          <h3 className="font-bold text-white text-base leading-tight group-hover:text-emerald-400
                          transition-colors">{item.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
            <span>📍</span>
            {item.address.city}, {item.address.province}
          </p>
        </div>

        {/* Rating + reviews */}
        <div className="flex items-center justify-between">
          <StarRating rating={item.rating} />
          <span className="text-xs text-gray-600">{item.reviews.count.toLocaleString()} ulasan</span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 flex-1">
          {item.description}
        </p>

        {/* Facilities */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-gray-800">
          <FacilityBadge available={item.facilities.parking}    label="Parkir"     />
          <FacilityBadge available={item.facilities.wifi}       label="WiFi"       />
          <FacilityBadge available={item.facilities.restaurant} label="Restoran"   />
          {item.facilities.surfRental &&
            <FacilityBadge available={true} label="Water Sport" />
          }
        </div>

        {/* Latest review */}
        <div className="bg-gray-800/60 rounded-lg px-3 py-2 mt-1">
          <p className="text-[10px] text-gray-500 mb-0.5">💬 Ulasan terbaru</p>
          <p className="text-xs text-gray-300 italic line-clamp-1">"{item.reviews.latest}"</p>
        </div>

        {/* CTA */}
        <button className={`w-full mt-1 py-2 rounded-xl text-sm font-semibold
                            transition-all duration-200 border
                            ${c.bg} ${c.border} ${c.text}
                            hover:brightness-125 hover:scale-[1.02]`}>
          Lihat Detail →
        </button>
      </div>
    </div>
  )
}

export default function GuestView({ data }) {
  return (
    <div>
      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Destinasi", val: "20", icon: "🗺️" },
          { label: "Provinsi",        val: "13", icon: "📍" },
          { label: "Rata-rata Rating",val: "4.6", icon: "⭐" },
          { label: "Tersedia",        val: data.filter(d=>d.isOpen).length, icon: "✅" },
        ].map((s,i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl
                                   p-3 flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <div className="text-xl font-bold text-white">{s.val}</div>
              <div className="text-[11px] text-gray-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Result count */}
      <p className="text-sm text-gray-500 mb-4">
        Menampilkan <span className="text-white font-semibold">{data.length}</span> destinasi wisata
      </p>

      {/* Grid */}
      {data.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg font-semibold text-gray-500">Tidak ada destinasi ditemukan</p>
          <p className="text-sm mt-1">Coba ubah kata kunci atau filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.map(item => (
            <DestinationCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}