import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { FoodItem } from '../types/FoodItem';

const FoodDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [food, setFood] = useState<FoodItem | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('qris'); // State untuk metode pembayaran
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFood = async () => {
            try {
                const response = await fetch(`https://food-saver.kontrakita.web.id/api/v1/pembeli/makanan`);
                const data = await response.json();
                const selectedFood = data.find((item: FoodItem) => item.id.toString() === id);
                if (selectedFood) {
                    setFood(selectedFood);
                } else {
                    setError('Makanan tidak ditemukan.');
                }
            } catch (err) {
                setError('Gagal memuat data makanan.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchFood();
    }, [id]);

    const handleOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!food) return;
        
        // Arahkan ke halaman pembayaran dengan membawa semua data yang diperlukan
        navigate('/payment', {
            state: {
                food,
                quantity,
                paymentMethod, // Kirim metode pembayaran yang dipilih
            }
        });
    };

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    if (error && !food) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!food) return <div className="text-center py-10">Makanan tidak ditemukan.</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={`https://food-saver.kontrakita.web.id${food.image}`}
                        alt={food.name}
                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-2">{food.name}</h1>
                    <p className="text-xl text-green-600 font-semibold mb-4">Rp {food.discounted_price.toLocaleString('id-ID')}</p>
                    <p className="text-gray-600 mb-4">{food.description}</p>
                    <div className="mb-4">
                        <p><strong>Toko:</strong> {food.penjual.nama_toko}</p>
                        <p><strong>Stok Tersedia:</strong> {food.current_stock}</p>
                        <p><strong>Waktu Pengambilan:</strong> {food.start_time} - {food.end_time}</p>
                    </div>

                    <form onSubmit={handleOrder} className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Form Pemesanan</h3>
                        
                        <div className="mb-4">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Jumlah</label>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                min="1"
                                max={food.current_stock}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                required
                            />
                        </div>

                        {/* Pilihan Metode Pembayaran */}
                        <div className="mb-6">
                            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Metode Pembayaran</label>
                            <select
                                id="paymentMethod"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                            >
                                <option value="qris">QRIS</option>
                                <option value="transfer">Bank Transfer</option>
                            </select>
                        </div>

                        <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">
                            Lanjutkan ke Pembayaran
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FoodDetailPage;