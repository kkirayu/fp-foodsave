import React from 'react';

const BlogSection: React.FC = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-white" id="blog">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
        Artikel &amp; Edukasi
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <article className="bg-green-50 rounded-lg shadow overflow-hidden flex flex-col">
          <img
            alt="Ilustrasi dapur dengan berbagai wadah penyimpanan makanan sisa yang rapi dan terorganisir"
            className="w-full h-44 object-cover"
            height="220"
            loading="lazy"
            src="https://storage.googleapis.com/a1aa/image/6747e96f-7d30-4001-35ff-d3e863c436ac.jpg"
            width="400"
          />
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Tips Mengelola Sisa Makanan di Rumah
            </h3>
            <p className="text-gray-700 flex-grow">
              Pelajari cara menyimpan dan mengolah sisa makanan agar tetap lezat
              dan tidak cepat basi, mengurangi limbah di rumah.
            </p>
            <a
              className="mt-4 text-green-600 font-semibold hover:underline self-start"
              href="#"
            >
              Baca Selengkapnya →
            </a>
          </div>
        </article>
        <article className="bg-green-50 rounded-lg shadow overflow-hidden flex flex-col">
          <img
            alt="Ilustrasi bumi dikelilingi oleh makanan dan ikon daur ulang sebagai simbol pengurangan limbah makanan"
            className="w-full h-44 object-cover"
            height="220"
            loading="lazy"
            src="https://storage.googleapis.com/a1aa/image/887e2f2f-7660-4319-83b2-d8376bf88ea0.jpg"
            width="400"
          />
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Pentingnya Mengurangi Limbah Makanan
            </h3>
            <p className="text-gray-700 flex-grow">
              Mengapa limbah makanan menjadi masalah besar dan bagaimana
              kontribusi kecil kita bisa membuat perubahan besar.
            </p>
            <a
              className="mt-4 text-green-600 font-semibold hover:underline self-start"
              href="#"
            >
              Baca Selengkapnya →
            </a>
          </div>
        </article>
        <article className="bg-green-50 rounded-lg shadow overflow-hidden flex flex-col">
          <img
            alt="Ilustrasi penjual dan pembeli tersenyum dengan latar belakang makanan dan ikon koin sebagai simbol keuntungan"
            className="w-full h-44 object-cover"
            height="220"
            loading="lazy"
            src="https://storage.googleapis.com/a1aa/image/78483e0b-c8e4-4b56-52f5-fd43656a6347.jpg"
            width="400"
          />
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Manfaat FoodSaver untuk Penjual dan Pembeli
            </h3>
            <p className="text-gray-700 flex-grow">
              Bagaimana FoodSaver membantu penjual mengurangi limbah dan pembeli
              mendapatkan makanan enak dengan harga terjangkau.
            </p>
            <a
              className="mt-4 text-green-600 font-semibold hover:underline self-start"
              href="#"
            >
              Baca Selengkapnya →
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};

export default BlogSection;