import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-16">
        Bagaimana FoodSaver Bekerja?
      </h2>

      <div className="max-w-6xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl font-semibold text-green-800 mb-4">
              1. Penjual Unggah Makanan Surplus
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Restoran, kafe, toko roti, atau bahkan katering yang memiliki makanan berkualitas tinggi namun tidak terjual, dapat dengan mudah mengunggah daftar makanan surplus mereka ke platform FoodSaver. Setiap unggahan dilengkapi dengan foto menarik, deskripsi detail, harga diskon yang menguntungkan, dan waktu pengambilan yang fleksibel. Proses ini cepat dan intuitif, membantu penjual mengurangi limbah dan mendapatkan kembali nilai dari makanan mereka.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center mt-8 md:mt-0 relative">
            <img
              alt="[Ilustrasi penjual mengunggah foto makanan sisa dengan deskripsi dan harga diskon]"
              className="w-full max-w-md rounded-lg shadow-lg"
              src="https://storage.googleapis.com/a1aa/image/7b4e7266-8322-481e-45bb-1b18ed1a26e2.jpg"
            />
            <svg className="absolute -bottom-16 md:-right-16 md:bottom-auto md:top-1/2 w-16 h-16 text-green-600 transform rotate-90 md:rotate-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10H4a1 1 0 110-2h10.586l-4.293-4.293a1 1 0 011.414-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
          </div>
        </div>


        <div className="flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-12">
          <div className="md:w-1/2 text-center md:text-right">
            <h3 className="text-3xl font-semibold text-green-800 mb-4">
              2. Pembeli Temukan &amp; Pesan Makanan
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Pembeli dapat dengan mudah menjelajahi berbagai pilihan makanan surplus yang tersedia di dekat lokasi mereka. Dengan fitur filter yang canggih berdasarkan kategori makanan, harga, dan jarak, menemukan hidangan favorit menjadi lebih mudah. Setelah menemukan yang diinginkan, pembeli dapat langsung memesan dan melakukan pembayaran dengan aman melalui aplikasi FoodSaver.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center mt-8 md:mt-0 relative">
            <img
              alt="[Ilustrasi pembeli mencari makanan sisa berdasarkan lokasi dan filter kategori]"
              className="w-full max-w-md rounded-lg shadow-lg"
              src="https://storage.googleapis.com/a1aa/image/9073d43a-e03b-4d96-d11f-6e518c683070.jpg"
            />
            <svg className="absolute -bottom-16 md:-left-16 md:bottom-auto md:top-1/2 w-16 h-16 text-green-600 transform rotate-90 md:rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10H4a1 1 0 110-2h10.586l-4.293-4.293a1 1 0 011.414-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center md:space-x-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h3 className="text-3xl font-semibold text-green-800 mb-4">
              3. Ambil &amp; Nikmati Hidangan Lezat
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Setelah pembayaran berhasil, pembeli hanya perlu datang ke lokasi penjual sesuai waktu pengambilan yang telah ditentukan. Proses pengambilan yang sederhana memastikan efisiensi bagi kedua belah pihak. Dengan FoodSaver, Anda tidak hanya menikmati hidangan lezat dengan harga terjangkau, tetapi juga turut berkontribusi dalam upaya global mengurangi limbah makanan dan menjaga keberlanjutan lingkungan.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
            <img
              alt="[Ilustrasi pembeli mengambil makanan sisa di lokasi penjual sesuai waktu pengambilan]"
              className="w-full max-w-md rounded-lg shadow-lg"
              src="https://storage.googleapis.com/a1aa/image/3d949469-d266-4268-4d43-793b4f11ba40.jpg"
            />
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <button
          onClick={handleGoBack}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-md shadow-md transition inline-flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Kembali
        </button>
      </div>
    </section>
  );
};

export default HowItWorksPage;
