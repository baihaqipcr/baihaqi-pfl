import frameworkData from "./framework.json";

export default function ResponsiveText(){
    return (
        <p className="text-sm md:text-lg lg:text-xl xl:text-2xl mb-4">
            Coba lakukan zoom in atau zoom out. Perhatikan bahwa ukuran teks akan menyesuaikan dengan ukuran layar.<br/>
            Coba hapus class yang menggunakan prefix breakpoint (md:xxx, lg:xxx, xl:xxx) dan lihat perbedaannya!
        </p>
    )
    
}

