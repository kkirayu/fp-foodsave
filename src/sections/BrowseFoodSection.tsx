import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FoodItem } from '../types/FoodItem';
import Modal from '../components/Modal';
import OrderForm from '../components/OrderForm';

const API_BASE_URL = 'https://food-saver.kontrakita.web.id';

const BrowseFoodSection: React.FC = () => {
  const [allFoodItems, setAllFoodItems] = useState<FoodItem[]>([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState<FoodItem[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem | null>(null);
  const navigate = useNavigate();

  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<number | ''>('');
  const [distanceFilter, setDistanceFilter] = useState<number | ''>(''); 

  const applyFilters = useCallback(() => {
    let tempItems = [...allFoodItems]; 

    if (categoryFilter) {
      tempItems = tempItems.filter(item => item.kategori.nama.toLowerCase() === categoryFilter.toLowerCase());
    }

    if (priceFilter !== '') {
      tempItems = tempItems.filter(item => item.rawDiscountedPrice <= priceFilter);
    }

    if (distanceFilter !== '') {
      console.log(`Filtering by distance (simulated): ${distanceFilter} km`);
    }

    setFilteredFoodItems(tempItems);
  }, [allFoodItems, categoryFilter, priceFilter, distanceFilter]);

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiUrl = `${API_BASE_URL}/api/v1/pembeli/makanan`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        const apiFoodData = result; 

        const formattedFoodItems: FoodItem[] = apiFoodData.map((item: any) => ({
          id: item.id.toString(),
          imageSrc: item.image && item.image.startsWith('/') ? `${API_BASE_URL}${item.image}` : item.image || 'https://placehold.co/400x250/E0F2F1/004D40?text=No+Image',
          imageAlt: item.name,
          title: item.name,
          description: item.description,
          price: `Rp ${item.discounted_price.toLocaleString('id-ID')}`,
          originalPrice: item.original_price ? `Rp ${item.original_price.toLocaleString('id-ID')}` : undefined, 
          rawDiscountedPrice: item.discounted_price,
          rawOriginalPrice: item.original_price, 
          pickupTime: `${item.start_time.substring(0, 5)} - ${item.end_time.substring(0, 5)}`,
          stock: item.current_stock,
          kategori: {
            id: item.kategori.id,
            nama: item.kategori.nama,
          },
          penjual: {
            id: item.penjual.id,
            nama_toko: item.penjual.nama_toko,
            latitude: item.penjual.latitude,
            longitude: item.penjual.longitude,
          },
        }));
        setAllFoodItems(formattedFoodItems); 
      } catch (e: any) {
        setError(`Gagal mengambil data makanan: ${e.message}`);
        console.error("Error fetching food data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodData();
  }, []); 

  useEffect(() => {
    applyFilters();
  }, [allFoodItems, applyFilters]); 

  const handleSubmitFilters = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleOrderClick = (item: FoodItem) => {
    setSelectedFoodItem(item);
    setIsModalOpen(true);
  };

  const handlePlaceOrder = (item: FoodItem, quantity: number, notes: string) => {
    console.log('Pesanan Ditempatkan:', { item, quantity, notes });
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
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Semua Kategori</option>
                <option value="Makanan Ringan">Makanan Ringan</option>
                <option value="Makanan Berat">Makanan Berat</option>
                <option value="Dessert">Dessert</option>
                <option value="Roti & Kue">Roti &amp; Kue</option>
                <option value="Minuman">Minuman</option>
                <option value="Fast Food">Fast Food</option>
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
                value={priceFilter}
                onChange={(e) => setPriceFilter(parseFloat(e.target.value) || '')}
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
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(parseFloat(e.target.value) || '')}
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
          {loading && (
            <div className="col-span-full text-center py-10">
              <i className="fas fa-spinner fa-spin text-green-600 text-4xl mb-4"></i>
              <p className="text-gray-700">Memuat makanan...</p>
            </div>
          )}
          {error && (
            <div className="col-span-full text-center py-10 text-red-600">
              <p>{error}</p>
              <p>Silakan coba refresh halaman.</p>
            </div>
          )}
          {!loading && !error && filteredFoodItems.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-600">
              <p>Tidak ada makanan yang ditemukan dengan kriteria ini.</p>
            </div>
          )}
          {!loading && !error && allFoodItems.length > 0 && filteredFoodItems.map((item) => (
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
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x250/E0F2F1/004D40?text=No+Image'; }} // Fallback on error
              />
              <div className="p-4 flex flex-col flex-grow">
                <h4 className="text-lg font-semibold text-green-800 mb-1">
                  {item.title}
                </h4>
                <p className="text-gray-600 flex-grow text-sm">
                  {item.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-green-700 font-bold text-lg">
                    {item.price}
                    {item.originalPrice && (
                      <span className="ml-2 text-gray-500 line-through text-sm">
                        {item.originalPrice}
                      </span>
                    )}
                  </span>
                  <span className="text-sm text-gray-500">
                    Ambil: {item.pickupTime}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Stok: {item.stock}
                </div>
                <button
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleOrderClick(item)}
                  disabled={item.stock <= 0}
                >
                  {item.stock > 0 ? 'Pesan Sekarang' : 'Stok Habis'}
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>

      {/* Order Modal */}
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
