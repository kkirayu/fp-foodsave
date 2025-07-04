import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-green-50 py-16 px-6 md:px-12 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 max-w-4xl mx-auto leading-tight">
        Kurangi Limbah Makanan, Nikmati Makanan Enak dengan Harga Terjangkau
      </h1>
      <p className="mt-6 text-lg md:text-xl text-green-900 max-w-3xl mx-auto">
        FoodSaver menghubungkan penjual makanan sisa dengan pembeli yang ingin
        mendapatkan makanan lezat dengan harga diskon. Bersama kita jaga bumi
        dan kantong tetap hemat.
      </p>
      <div className="mt-10 flex justify-center space-x-6">
        <a
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition"
          href="makanan"
        >
          Cari Makanan Sekarang
        </a>
        <a
          className="bg-white border-2 border-green-600 text-green-600 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-green-600 hover:text-white transition"
          href="regis-penjual"
        >
          Daftar Sebagai Penjual
        </a>
      </div>
      <div className="mt-12 max-w-4xl mx-auto">
        <img
          alt="Ilustrasi digital orang menggunakan aplikasi FoodSaver di smartphone, menampilkan daftar makanan sisa dengan harga diskon dan tombol pesan"
          className="mx-auto rounded-lg shadow-lg"
          height="400"
          loading="lazy"
          src="https://storage.googleapis.com/a1aa/image/6be53102-de01-40a2-aeaf-74047a0162dc.jpg"
          width="800"
        />
      </div>
    </section>
  );
};

export default HeroSection;