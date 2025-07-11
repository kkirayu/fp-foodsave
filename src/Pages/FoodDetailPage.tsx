import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { FoodItem } from '../types/FoodItem';
interface Review {
    id: number;
    reviewer_name: string; 
    rating: number;
    comment: string;
    date: string;
}

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
                const starClass = index < rating ? 'text-yellow-400' : 'text-gray-300';
                return (
                    <svg key={index} className={`w-5 h-5 ${starClass}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.366 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.366-2.446a1 1 0 00-1.175 0l-3.366 2.446c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.35 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                    </svg>
                );
            })}
        </div>
    );
};

const FoodDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [food, setFood] = useState<FoodItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [reviews, setReviews] = useState<Review[]>([]);
    const [isReviewsLoading, setIsReviewsLoading] = useState(true);

    useEffect(() => {
        const fetchFoodAndReviews = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const response = await fetch(`https://food-saver.kontrakita.web.id/api/v1/pembeli/makanan`);
                if (!response.ok) throw new Error('Gagal memuat data makanan.');
                const data = await response.json();
                const selectedFood = data.find((item: FoodItem) => item.id.toString() === id);
                setFood(selectedFood || null);
            } catch (err) {
                setError('Terjadi kesalahan saat mengambil data makanan.');
            } finally {
                setIsLoading(false);
            }
            setIsReviewsLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) { 
                    console.log("Token tidak ditemukan, tidak dapat memuat ulasan.");
                    return;
                }

                const response = await fetch(`https://food-saver.kontrakita.web.id/api/v1/pembeli/pesanan`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Gagal memuat data pesanan untuk ulasan.');
                }
                
                const allOrders = await response.json();

                if (!Array.isArray(allOrders)) {
                    throw new Error("Format data pesanan tidak terduga.");
                }
                
                const relevantReviews = allOrders
                    .filter(order => order.makanan_id?.toString() === id && order.ulasan)
                    .map((order): Review => ({
                        id: order.ulasan.id,
                        reviewer_name: order.pembeli?.nama || 'Pembeli', 
                        rating: Number(order.ulasan.rating),
                        comment: order.ulasan.comment,
                        date: order.ulasan.tanggal_ulasan || order.ulasan.created_at,
                    }));

                setReviews(relevantReviews);

            } catch (err: any) {
                console.error("Gagal mengambil atau memproses ulasan:", err.message);
            } finally {
                setIsReviewsLoading(false);
            }
        };

        fetchFoodAndReviews();
    }, [id]);

    const handleOrder = (e: React.FormEvent, foodItem: FoodItem) => {
        e.preventDefault();
        navigate('/payment', {
            state: {
                food: foodItem,
                quantity: 1, 
                paymentMethod: 'qris',
            }
        });
    };

    if (isLoading) return <div className="text-center py-10">Memuat data makanan...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
    if (!food) return <div className="text-center py-10">Makanan tidak ditemukan atau sudah tidak tersedia.</div>;

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
                    <div className="mb-4 text-sm text-gray-800">
                        <p><strong>Toko:</strong> {food.penjual.nama_toko}</p>
                        <p><strong>Stok Tersedia:</strong> {food.current_stock}</p>
                        <p><strong>Waktu Pengambilan:</strong> {food.start_time.substring(0,5)} - {food.end_time.substring(0,5)}</p>
                    </div>
                    <form onSubmit={(e) => handleOrder(e, food)} className="bg-gray-50 p-6 rounded-lg">
                        <button type="submit" className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">
                            Pesan Sekarang
                        </button>
                    </form>
                </div>
            </div>
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 border-b pb-4">Ulasan Pembeli</h2>
                {isReviewsLoading ? (
                    <p className="text-gray-500">Memuat ulasan...</p>
                ) : reviews.length > 0 ? (
                    <div className="space-y-6">
                        {reviews.map(review => (
                            <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm border">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center font-bold text-green-700">
                                            {review.reviewer_name.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="flex items-center mb-1">
                                            <p className="font-semibold mr-3">{review.reviewer_name}</p>
                                            <StarRating rating={review.rating} />
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2">
                                            {new Date(review.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                        <p className="text-gray-700">{review.comment}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">Belum ada ulasan untuk makanan ini.</p>
                )}
            </div>
        </div>
    );
};

export default FoodDetailPage;