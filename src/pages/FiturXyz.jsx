import PageHeader from "../components/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { cn } from "@/lib/utils";

export default function FiturXyz() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Fitur Xyz"
        subtitle="Dashboard / Order List"
        showFilter={false}
      />

      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg p-10 border border-green-100">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                <span className="text-xl">✨</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Selamat datang di Fitur Xyz
              </h2>
            </div>
            <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
              Ini adalah halaman fitur baru yang dapat diakses melalui menu "Fitur Xyz". Anda dapat menambahkan konten, elemen interaktif, atau informasi penting di sini sesuai kebutuhan Anda.
            </p>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2">
          <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-md p-7 border border-green-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">📋</span>
              </div>
              <div className="space-y-2 flex-1">
                <p className="font-semibold text-green-900">Ringkasan Fitur</p>
                <p className="text-sm text-gray-600">
                  Fitur ini dibuat sebagai contoh halaman baru yang responsif dan modern sesuai permintaan Anda.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-7 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-lg">✓</span>
              </div>
              <div className="space-y-2 flex-1">
                <p className="font-semibold text-gray-900">Status Integrasi</p>
                <p className="text-sm text-gray-600">
                  Halaman sudah terhubung dengan menu sidebar dan route React Router dengan sempurna.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <Card className="shadow-lg border-gray-200 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-green-100 pb-6">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-xl">Belajar shadcn/ui</CardTitle>
                  <Badge variant="secondary" className="ml-2">Baru</Badge>
                </div>
              </div>
            </div>
            <CardDescription className="text-base text-gray-600">
              Contoh penggunaan komponen shadcn/ui dan best practices di React
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6 space-y-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              Komponen ini dibuat di branch <strong className="text-green-700">setup-shadcn</strong> dan kemudian di-merge ke main branch untuk integrasi yang lebih baik.
            </p>
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <p className="text-xs font-semibold text-green-900 mb-1">💡 Tips</p>
              <p className="text-sm text-green-800">
                Gunakan komponen UI ini untuk membangun interface yang konsisten dan responsif di seluruh aplikasi.
              </p>
            </div>
          </CardContent>

          <CardFooter className="bg-gray-50 border-t border-gray-100 gap-3 pt-6">
            <Button className="bg-green-600 hover:bg-green-700">Simpan Perubahan</Button>
            <Button variant="outline" className="border-gray-300">Batal</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
