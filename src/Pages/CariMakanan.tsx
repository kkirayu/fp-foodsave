import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import type { FoodItem } from "../types/FoodItem";

const CariMakanan = () => {
  const [allFoodItems, setAllFoodItems] = useState<FoodItem[]>([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<number | "">("");
  const [distanceFilter, setDistanceFilter] = useState<number | "">("");

  // Fungsi pengecekan waktu yang telah diperbaiki
  const isOrderableTime = (item: FoodItem): boolean => {
    // Helper untuk mengubah string "HH:mm:ss" menjadi total menit
    const timeToMinutes = (timeStr: string): number => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const now = new Date();
    // Dapatkan total menit untuk waktu saat ini
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const startMinutes = timeToMinutes(item.start_time);
    const endMinutes = timeToMinutes(item.end_time);

    // Kasus 1: Rentang waktu di hari yang sama (misal: 09:00 - 22:00)
    if (startMinutes <= endMinutes) {
      return nowMinutes >= startMinutes && nowMinutes <= endMinutes;
    }
    // Kasus 2: Rentang waktu melewati tengah malam (misal: 21:00 - 02:00)
    else {
      // Waktu saat ini harus setelah waktu mulai ATAU sebelum waktu selesai
      return nowMinutes >= startMinutes || nowMinutes <= endMinutes;
    }
  };

  const applyFilters = useCallback(() => {
    let tempItems = [...allFoodItems];

    if (categoryFilter) {
      tempItems = tempItems.filter(
        (item) =>
          item.kategori.nama.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (priceFilter !== "") {
      tempItems = tempItems.filter(
        (item) => item.discounted_price <= priceFilter
      );
    }

    if (distanceFilter !== "") {
      console.log(`Simulasi filter jarak: ${distanceFilter} km`);
    }

    setFilteredFoodItems(tempItems);
  }, [allFoodItems, categoryFilter, priceFilter, distanceFilter]);

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://food-saver.kontrakita.web.id/api/v1/pembeli/makanan"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setAllFoodItems(result);
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
    applyFilters();
  };

  return (
    <section
      className="py-16 px-6 md:px-12 bg-green-50"
      style={{ marginBottom: "40px" }}
    >
      <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
        Cari Makanan Sisa di Sekitarmu
      </h2>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:space-x-8">
        <aside className="mb-8 md:mb-0 md:w-1/4 bg-white rounded-lg shadow p-6 h-fit sticky top-24">
          <h3 className="text-xl font-semibold text-green-800 mb-4">
            Filter Pencarian
          </h3>
          <form className="space-y-6" onSubmit={handleSubmitFilters}>
            {/* Bagian form filter tidak berubah */}
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
                <option value="Minuman">Minuman</option>
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
                onChange={(e) =>
                  setPriceFilter(parseFloat(e.target.value) || "")
                }
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
                onChange={(e) =>
                  setDistanceFilter(parseFloat(e.target.value) || "")
                }
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
        <main className="md:w-3/4">
          {/* Bagian loading dan error tidak berubah */}
          {loading && (
            <div className="col-span-full text-center py-10">
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
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFoodItems.map((item) => {
                // Logika pengecekan ketersediaan tetap sama
                const canOrderTime = isOrderableTime(item);
                const isAvailable = item.current_stock > 0 && canOrderTime;

                // Teks tombol dinamis
                const buttonText = () => {
                  if (item.current_stock <= 0) return "Stok Habis";
                  if (!canOrderTime) return "Di Luar Jam Pesan";
                  return "Pesan Sekarang";
                };

                return (
                  <article
                    key={item.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transform hover:-translate-y-1 transition-transform duration-300"
                  >
                    <img
                      alt={item.name}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                      src={`https://food-saver.kontrakita.web.id${item.image}`}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/400x250/E0F2F1/004D40?text=No+Image";
                      }}
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      <h4 className="text-lg font-semibold text-green-800 mb-1">
                        {item.name}
                      </h4>
                      <p className="text-gray-600 flex-grow text-sm">
                        {item.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-green-700 font-bold text-lg">
                          Rp {item.discounted_price.toLocaleString("id-ID")}
                          {item.original_price && (
                            <span className="ml-2 text-gray-500 line-through text-sm">
                              Rp {item.original_price.toLocaleString("id-ID")}
                            </span>
                          )}
                        </span>
                        <span className="text-sm text-gray-500">
                          Ambil: {item.start_time.substring(0, 5)} -{" "}
                          {item.end_time.substring(0, 5)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Stok: {item.current_stock}
                      </div>
                      {/* Logika tombol Link tidak berubah */}
                      <Link
                        to={isAvailable ? `/makanan/${item.id}` : "#"}
                        className={`mt-4 text-center font-semibold py-2 rounded-md transition ${
                          isAvailable
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-gray-400 text-gray-700 cursor-not-allowed"
                        }`}
                        aria-disabled={!isAvailable}
                        onClick={(e) => {
                          if (!isAvailable) e.preventDefault();
                        }}
                      >
                        {buttonText()}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default CariMakanan;