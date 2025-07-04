import React from 'react';

const CommunitySection: React.FC = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-green-50" id="community">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
        Fokus pada Komunitas
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center space-y-4">
          <img
            alt="Ilustrasi tangan memberikan makanan ke panti asuhan sebagai program donasi makanan"
            className="w-24 h-24"
            height="120"
            loading="lazy"
            src="https://storage.googleapis.com/a1aa/image/553845ba-f199-406b-4ad5-8b40f3bfe890.jpg"
            width="120"
          />
          <h3 className="text-xl font-semibold text-green-800">
            Program Donasi Makanan
          </h3>
          <p className="text-gray-600">
            Penjual dapat menyumbangkan makanan yang tidak terjual ke panti
            asuhan atau yayasan, membantu mereka yang membutuhkan.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center space-y-4">
          <img
            alt="Ilustrasi buku terbuka dengan ikon daun dan makanan sebagai simbol edukasi pengurangan limbah makanan"
            className="w-24 h-24"
            height="120"
            loading="lazy"
            src="https://storage.googleapis.com/a1aa/image/58e0f0c5-eb72-4aaf-2803-d5539fe9e3a0.jpg"
            width="120"
          />
          <h3 className="text-xl font-semibold text-green-800">
            Edukasi Pengurangan Limbah
          </h3>
          <p className="text-gray-600">
            Blog dan artikel tentang pentingnya mengurangi limbah makanan serta
            tips mengelola sisa makanan di rumah.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center space-y-4">
          <img
            alt="Ilustrasi komunitas orang-orang berkumpul dan berdiskusi tentang pengurangan limbah makanan"
            className="w-24 h-24"
            height="120"
            loading="lazy"
            src="https://storage.googleapis.com/a1aa/image/c98b347e-63b0-4b9d-eb5e-7b74f5bcde85.jpg"
            width="120"
          />
          <h3 className="text-xl font-semibold text-green-800">
            Komunitas FoodSaver
          </h3>
          <p className="text-gray-600">
            Bergabung dengan komunitas kami untuk berbagi pengalaman, ide, dan
            dukungan dalam mengurangi limbah makanan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;