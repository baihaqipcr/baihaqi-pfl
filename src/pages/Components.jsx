import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Avatar from "../components/Avatar";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";

export default function Components() {
  const headers = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];

  const products = [
    { id: 1, name: "Sepatu Sport", category: "Fashion", price: "Rp 450.000" },
    { id: 2, name: "Smartphone", category: "Elektronik", price: "Rp 4.500.000" },
  ];

  return (
    <>
    <div id="dashboard-container" className="min-h-screen bg-[#F8FAFC] py-8 font-['Inter',sans-serif]">
      <Container>
        
        {/* Header Utama */}
        <div className="mb-10">
          <PageHeader title="UI Kit Showcase" subtitle="Daftar global reusable components yang siap digunakan di seluruh aplikasi." />
        </div>

        {/* Wrapper utama dengan space antar section yang lega */}
        <div className="space-y-8">

          {/* SECTION 1: INFO & TYPOGRAPHY */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex flex-col border-b border-slate-100 pb-4 mb-5">
              <span className="text-[10px] font-bold tracking-wider text-indigo-600 uppercase mb-1">Element 01</span>
              <h2 className="text-lg font-bold text-slate-800">Typography Headers</h2>
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Daftar Produk</h1>
            <p className="text-slate-500 mt-1 text-sm">Berikut adalah daftar produk terbaru yang telah tersinkronisasi.</p>
          </div>

          {/* SECTION 2: BUTTONS */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex flex-col border-b border-slate-100 pb-4 mb-5">
              <span className="text-[10px] font-bold tracking-wider text-indigo-600 uppercase mb-1">Element 02</span>
              <h2 className="text-lg font-bold text-slate-800">Button Actions</h2>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3 items-center">
                <Button type="success">Simpan</Button>
                <Button type="danger">Hapus</Button>
                <Button type="secondary">Batal</Button>
                <Button type="warning">Hapus</Button>
              </div>
              <div className="flex flex-wrap gap-3 items-center pt-2 border-t border-slate-50">
                <Button type="success">Simpan</Button>
                <Button type="danger">Hapus</Button>
              </div>
            </div>
          </div>

          {/* SECTION 3: AVATARS */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex flex-col border-b border-slate-100 pb-4 mb-5">
              <span className="text-[10px] font-bold tracking-wider text-indigo-600 uppercase mb-1">Element 03</span>
              <h2 className="text-lg font-bold text-slate-800">User Identity & Avatars</h2>
            </div>
            <div className="flex gap-4 items-center">
              <div className="transition-transform hover:scale-110 cursor-pointer shadow-sm rounded-full">
                <Avatar name="budi"> MH </Avatar>
              </div>
              <div className="transition-transform hover:scale-110 cursor-pointer shadow-sm rounded-full">
                <Avatar name="joko"> ST </Avatar>
              </div>
            </div>
          </div>

          {/* SECTION 4: CARDS & PRODUCT CARDS SPLIT */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Standard Card Container */}
            <div className="xl:col-span-1 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col">
              <div className="flex flex-col border-b border-slate-100 pb-4 mb-5">
                <span className="text-[10px] font-bold tracking-wider text-indigo-600 uppercase mb-1">Element 04</span>
                <h2 className="text-lg font-bold text-slate-800">Standard Base Card</h2>
              </div>
              <div className="flex-1 flex items-center justify-center bg-slate-50 rounded-2xl p-4">
                <div className="w-full">
                  <Card>
                    <h2 className="text-xl font-bold text-slate-800">Judul Card</h2>
                    <p className="text-slate-500 text-sm mt-1">Ini adalah isi konten internal di dalam base card wrapper.</p>
                  </Card>
                </div>
              </div>
            </div>

            {/* Product Card Container */}
            <div className="xl:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex flex-col border-b border-slate-100 pb-4 mb-5">
                <span className="text-[10px] font-bold tracking-wider text-indigo-600 uppercase mb-1">Element 05</span>
                <h2 className="text-lg font-bold text-slate-800">E-Commerce Products Grid</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProductCard
                  image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                  title="Sepatu Sport"
                  category="Fashion"
                  price="Rp 450.000"
                  description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
                />
                <ProductCard
                  image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                  title="Smartphone"
                  category="Elektronik"
                  price="Rp 4.500.000"
                  description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
                />
              </div>
            </div>
          </div>

          {/* SECTION 5: DATA GRID TABLE */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="flex flex-col border-b border-slate-100 pb-4 mb-6">
              <span className="text-[10px] font-bold tracking-wider text-indigo-600 uppercase mb-1">Element 06</span>
              <h2 className="text-lg font-bold text-slate-800">Data Grid & Collections</h2>
            </div>
            
            {/* Wrapper tambahan untuk merapikan border table bawaan */}
            <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
              <Table headers={headers}>
                {products.map((product, index) => (
                  <tr key={product.id} className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-b-0">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-500">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-800">{product.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                        product.category === "Fashion" ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
                      }`}>
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-extrabold text-slate-700">{product.price}</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors shadow-sm shadow-indigo-100">
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          </div>

        </div>

        {/* Footer Area */}
        <div className="mt-12 pt-6 border-t border-slate-100">
          <Footer />
        </div>
      </Container>
    </div>
    </>
  );
}