import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import type { FoodItem } from '../types/FoodItem';
import Modal from '../components/Modal';
import OrderForm from '../components/OrderForm';

const foodItems: FoodItem[] = [
  {
    id: 'food1',
    imageSrc: '/img/1.png',
    imageAlt: 'Nasi Goreng Spesial dengan telur dan sayuran segar di piring putih',
    title: 'Nasi Goreng Spesial',
    description: 'Nasi goreng dengan telur, sayuran segar, dan bumbu khas Indonesia. Porsi 1 piring.',
    price: 'Rp 15.000',
    pickupTime: '20.00 - 21.00',
    stock: 10, 
  },
  {
    id: 'food2',
    imageSrc: '/img/2.png',
    imageAlt: 'Roti tawar gurih dengan selai stroberi merah segar di atas piring kayu',
    title: 'Roti Tawar dengan Selai Stroberi',
    description: 'Roti tawar lembut dengan selai stroberi manis, cocok untuk sarapan atau camilan.',
    price: 'Rp 8.000',
    pickupTime: '19.30 - 20.30',
    stock: 10,
  },
  {
    id: 'food3',
    imageSrc: '/img/3.png',
    imageAlt: 'Segelas es teh manis dengan daun mint segar dan es batu di gelas kaca bening',
    title: 'Es Teh Manis Mint',
    description: 'Minuman segar es teh manis dengan daun mint, cocok untuk melepas dahaga di siang hari.',
    price: 'Rp 5.000',
    pickupTime: '18.00 - 19.00',
    stock: 10,
  },
  {
    id: 'food4',
    imageSrc: 'https://storage.googleapis.com/a1aa/image/72b4aef6-c5e2-4ceb-3918-4c71a2c4491e.jpg',
    imageAlt: 'Kue lapis pelangi berwarna-warni dengan tekstur lembut di atas piring putih',
    title: 'Kue Lapis Pelangi',
    description: 'Kue lapis tradisional dengan warna-warni cerah dan rasa manis lembut, cocok untuk dessert.',
    price: 'Rp 12.000',
    pickupTime: '20.00 - 21.00',
    stock: 10,
  },
  {
    id: 'food5',
    imageSrc: '/img/4.png',
    imageAlt: 'Sepiring ayam goreng kremes dengan sambal pedas dan lalapan segar di piring putih',
    title: 'Ayam Goreng Kremes',
    description: 'Ayam goreng renyah dengan kremesan gurih dan sambal pedas, porsi lengkap dengan lalapan.',
    price: 'Rp 20.000',
    pickupTime: '19.00 - 20.00',
    stock: 10,
  },
  {
    id: 'food6',
    imageSrc: '/img/5.png',
    imageAlt: 'Mangkok salad buah segar berisi potongan melon, semangka, anggur, dan yogurt putih',
    title: 'Salad Buah Segar',
    description: 'Campuran buah segar dengan yogurt, cocok untuk camilan sehat dan menyegarkan.',
    price: 'Rp 10.000',
    pickupTime: '18.30 - 19.30',
    stock: 10,
  },
];


const BrowseFoodSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(null);
  const navigate = useNavigate(); 

  const handleSubmitFilters = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search filters submitted!');
  };

  const handleOrderClick = (item: FoodItem) => {
    setSelectedFoodItem(item);
    setIsModalOpen(true);
  };

  const handlePlaceOrder = (item: FoodItem, quantity: number, notes: string) => {
    console.log('Order Placed:', { item, quantity, notes });
    setIsModalOpen(false);
    setSelectedFoodItem(null);

    navigate('/pembayaran', {
      state: {
        order: {
          item,
          quantity,
          notes,
          totalPrice: parseFloat(item.price.replace('Rp ', '').replace('.', '')) * quantity,
          orderId: `ORD-${Date.now()}`, 
        },
      },
    });
  };

  const handleCancelOrder = () => {
    setIsModalOpen(false);
    setSelectedFoodItem(null);
  };

  return (
    <section className="py-16 px-6 md:px-12 bg-green-50">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
        Cari Makanan Sisa di Sekitarmu
      </h2>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:space-x-8">
        <aside className="mb-8 md:mb-0 md:w-1/4 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-green-800 mb-4">
            Filter Pencarian
          </h3>
          <form className="space-y-6" onSubmit={handleSubmitFilters}>
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
        <section className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foodItems.map((item) => (
            <article
              key={item.id}
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
                <div className='text-gray-600'>
                  <span className="text-sm text-gray-500">
                    Stok: {item.stock}
                  </span>
                </div>
                <button
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
                  onClick={() => handleOrderClick(item)}
                >
                  Pesan Sekarang
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>

      {selectedFoodItem && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCancelOrder}
          title={`Pesan ${selectedFoodItem.title}`}
        >
          <OrderForm
            foodItem={selectedFoodItem}
            onPlaceOrder={handlePlaceOrder}
            onCancel={handleCancelOrder}
          />
        </Modal>
      )}
    </section>
  );
};

export default BrowseFoodSection;