import React from 'react';
import type { FoodItem } from '../types/FoodItem';


const foodItems: FoodItem[] = [
  {
    imageSrc: 'https://storage.googleapis.com/a1aa/image/3413175d-3cb8-46d5-e81e-f170bcc827a9.jpg',
    imageAlt: 'Nasi Goreng Spesial dengan telur dan sayuran segar di piring putih',
    title: 'Nasi Goreng Spesial',
    description: 'Nasi goreng dengan telur, sayuran segar, dan bumbu khas Indonesia. Porsi 1 piring.',
    price: 'Rp 15.000',
    pickupTime: '20.00 - 21.00',
  },
  {
    imageSrc: 'https://storage.googleapis.com/a1aa/image/9b12dc9c-d92e-416a-9ffa-80e5ae19c0c6.jpg',
    imageAlt: 'Roti tawar gurih dengan selai stroberi merah segar di atas piring kayu',
    title: 'Roti Tawar dengan Selai Stroberi',
    description: 'Roti tawar lembut dengan selai stroberi manis, cocok untuk sarapan atau camilan.',
    price: 'Rp 8.000',
    pickupTime: '19.30 - 20.30',
  },
  {
    imageSrc: 'https://storage.googleapis.com/a1aa/image/7bae9ff7-fdbe-4e96-6418-c79d7cedd1bf.jpg',
    imageAlt: 'Segelas es teh manis dengan daun mint segar dan es batu di gelas kaca bening',
    title: 'Es Teh Manis Mint',
    description: 'Minuman segar es teh manis dengan daun mint, cocok untuk melepas dahaga di siang hari.',
    price: 'Rp 5.000',
    pickupTime: '18.00 - 19.00',
  },
  {
    imageSrc: 'https://storage.googleapis.com/a1aa/image/72b4aef6-c5e2-4ceb-3918-4c71a2c4491e.jpg',
    imageAlt: 'Kue lapis pelangi berwarna-warni dengan tekstur lembut di atas piring putih',
    title: 'Kue Lapis Pelangi',
    description: 'Kue lapis tradisional dengan warna-warni cerah dan rasa manis lembut, cocok untuk dessert.',
    price: 'Rp 12.000',
    pickupTime: '20.00 - 21.00',
  },
  {
    imageSrc: 'https://storage.googleapis.com/a1aa/image/7e864d6a-a229-4304-59ec-32469920139e.jpg',
    imageAlt: 'Sepiring ayam goreng kremes dengan sambal pedas dan lalapan segar di piring putih',
    title: 'Ayam Goreng Kremes',
    description: 'Ayam goreng renyah dengan kremesan gurih dan sambal pedas, porsi lengkap dengan lalapan.',
    price: 'Rp 20.000',
    pickupTime: '19.00 - 20.00',
  },
  {
    imageSrc: 'https://storage.googleapis.com/a1aa/image/ab2f1cc9-64a5-43d6-0a62-66989e507257.jpg',
    imageAlt: 'Mangkok salad buah segar berisi potongan melon, semangka, anggur, dan yogurt putih',
    title: 'Salad Buah Segar',
    description: 'Campuran buah segar dengan yogurt, cocok untuk camilan sehat dan menyegarkan.',
    price: 'Rp 10.000',
    pickupTime: '18.30 - 19.30',
  },
];

const BrowseFoodSection: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle form submission here, e.g.,
    // fetching data based on filters.
    console.log('Search filters submitted!');
  };

  return (
    <section className="py-16 px-6 md:px-12 bg-green-50" id="browse-food">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
        Cari Makanan Sisa di Sekitarmu
      </h2>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:space-x-8">
        {/* Filters */}
        <aside className="mb-8 md:mb-0 md:w-1/4 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-green-800 mb-4">
            Filter Pencarian
          </h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="category"
              >
                Kategori Makanan
              </label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                id="category"
                name="category"
              >
                <option value="">Semua Kategori</option>
                <option value="indonesian">Masakan Indonesia</option>
                <option value="dessert">Dessert</option>
                <option value="bread">Roti &amp; Kue</option>
                <option value="beverages">Minuman</option>
                <option value="fastfood">Fast Food</option>
              </select>
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="price"
              >
                Harga Maksimum (Rp)
              </label>
              <input
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                id="price"
                name="price"
                placeholder="Contoh: 25000"
                type="number"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="distance"
              >
                Jarak Maksimum (km)
              </label>
              <input
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                id="distance"
                name="distance"
                placeholder="Contoh: 5"
                type="number"
              />
            </div>
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
              type="submit"
            >
              Cari
            </button>
          </form>
        </aside>
        {/* Food Listings */}
        <section className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foodItems.map((item, index) => (
            <article
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <img
                alt={item.imageAlt}
                className="w-full h-48 object-cover"
                height="250"
                loading="lazy"
                src={item.imageSrc}
                width="400"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h4 className="text-lg font-semibold text-green-800 mb-1">
                  {item.title}
                </h4>
                <p className="text-gray-600 flex-grow">{item.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-green-700 font-bold text-lg">
                    {item.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    Ambil: {item.pickupTime}
                  </span>
                </div>
                <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition">
                  Pesan Sekarang
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
};

export default BrowseFoodSection;