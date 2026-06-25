// Mengambil API Key dan Base URL dari file .env Vite
const NARAROUTER_API_KEY = import.meta.env.VITE_NARAROUTER_API_KEY || import.meta.env.NARAROUTER_API_KEY; 
const NARAROUTER_BASE_URL = import.meta.env.VITE_NARAROUTER_BASE_URL || import.meta.env.NARAROUTER_BASE_URL;

/**
 * Fungsi untuk menganalisis kesegaran bayam menggunakan Nararouter AI
 * @param {string} base64Image - Gambar bayam dalam format base64
 */
export const cekKesegaranBayam = async (base64Image) => {
  const url = `${NARAROUTER_BASE_URL}/chat/completions`;

  const headers = {
    "Authorization": `Bearer ${NARAROUTER_API_KEY}`,
    "Content-Type": "application/json"
  };

  // Instruksi Prompt agar AI memberikan respons terstruktur sesuai kategori UI Anda
  const payload = {
    model: "gpt-4o-mini", // Sesuai dengan model vision yang tersedia di Nararouter Anda
    messages: [
      {
        role: "system",
        content: `Anda adalah AI ahli pertanian. Analisis gambar bayam yang diberikan dan tentukan kategorinya hanya dari 3 pilihan berikut:
        1. "Bayam Segar" (Ciri: hijau cerah, renyah, batang kokoh).
        2. "Kurang Segar" (Ciri: hijau memudar, ujung agak layu, lemas).
        3. "Tidak Segar / Busuk" (Ciri: layu, keriput, menguning, bercak hitam/cokelat).
        
        Berikan jawaban dalam format JSON:
        {
          "kategori": "Bayam Segar / Kurang Segar / Tidak Segar / Busuk",
          "alasan": ["ciri 1", "ciri 2"],
          "rekomendasi": "Sangat Layuk Konsumsi / Olah Hari Ini / Rekomendasi Dibuang"
        }`
      },
      {
        role: "user",
        content: [
          { type: "text", text: "Analisis kesegaran bayam dari gambar ini:" },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`
            }
          }
        ]
      }
    ],
    response_format: { type: "json_object" } // Memastikan hasil kembali berupa JSON bersih
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Mengembalikan objek hasil parsing AI
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error("Gagal mendeteksi gambar lewat Nararouter:", error);
    return null;
  }
};