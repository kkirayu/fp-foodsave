import React from 'react';

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-white" id="how-it-works">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
        Cara Kerja FoodSaver
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <img
            alt="Ikon ilustrasi penjual mengunggah foto makanan sisa dengan deskripsi dan harga diskon"
            className="w-24 h-24"
            height="120"
            loading="lazy"
            src="https://storage.googleapis.com/a1aa/image/7b4e7266-8322-481e-45bb-1b18ed1a26e2.jpg"
            width="120"
          />
          <h3 className="text-xl font-semibold text-green-800">
            Penjual Unggah Makanan Sisa
          </h3>
          <p className="text-gray-600 max-w-xs">
            Penjual restoran, kafe, atau toko roti mengunggah daftar makanan
            sisa dengan foto, deskripsi, harga diskon, dan waktu pengambilan.
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <img
            alt="Ikon ilustrasi pembeli mencari makanan sisa berdasarkan lokasi dan filter kategori"
            className="w-24 h-24"
            height="120"
            loading="lazy"
            src="https://storage.googleapis.com/a1aa/image/9073d43a-e03b-4d96-d11f-6e518c683070.jpg"
            width="120"
          />
          <h3 className="text-xl font-semibold text-green-800">
            Pembeli Cari dan Pesan
          </h3>
          <p className="text-gray-600 max-w-xs">
            Pembeli mencari makanan sisa di dekat lokasi mereka, menggunakan
            filter kategori dan harga, lalu memesan dan membayar melalui
            aplikasi.
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <img
            alt="Ikon ilustrasi pembeli mengambil makanan sisa di lokasi penjual sesuai waktu pengambilan"
            className="w-24 h-24"
            height="120"
            loading="lazy"
            src="https://storage.googleapis.com/a1aa/image/3d949469-d266-4268-4d43-793b4f11ba40.jpg"
            width="120"
          />
          <h3 className="text-xl font-semibold text-green-800">
            Ambil Makanan &amp; Nikmati
          </h3>
          <p className="text-gray-600 max-w-xs">
            Pembeli datang ke lokasi penjual sesuai waktu pengambilan untuk
            mengambil makanan yang sudah dipesan dan menikmati hidangan lezat
            dengan harga hemat.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;