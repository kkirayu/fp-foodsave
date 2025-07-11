import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import type { Pesanan } from '../types/Order';
import type { FoodItem } from '../types/FoodItem';
import ReviewModal from '../components/ReviewModal';

const OrderPage = () => {
    const { token, isAuthenticated, isLoading: authLoading } = useAuth();
    const [orders, setOrders] = useState<Omit<Pesanan, 'makanan'>[]>([]);
    const [allFoodItems, setAllFoodItems] = useState<FoodItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Pesanan | null>(null);
    const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

    const fetchAllData = async () => {
        if (!token) return;
        setIsLoading(true);
        setError('');
        try {
            const ordersResponse = await fetch('https://food-saver.kontrakita.web.id/api/v1/pembeli/pesanan', {
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
            });
            if (!ordersResponse.ok) throw new Error('Gagal memuat pesanan.');
            const ordersData = await ordersResponse.json();
            setOrders(Array.isArray(ordersData) ? ordersData : []);

            const foodResponse = await fetch('https://food-saver.kontrakita.web.id/api/v1/pembeli/makanan');
            if (!foodResponse.ok) throw new Error('Gagal memuat data makanan.');
            const foodData = await foodResponse.json();
            setAllFoodItems(Array.isArray(foodData) ? foodData : []);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            fetchAllData();
        } else if (!authLoading && !isAuthenticated) {
            setIsLoading(false);
            setError("Silakan login untuk melihat pesanan Anda.");
        }
    }, [token, isAuthenticated, authLoading]);

    const ordersWithFoodDetails = useMemo((): Pesanan[] => {
        const combined = orders.map(order => {
            const makanan = allFoodItems.find(food => food.id === order.makanan_id);
            return { ...order, makanan: makanan || null };
        });
        return combined.filter((order): order is Pesanan => order.makanan !== null);
    }, [orders, allFoodItems]);

    const { activeOrders, historyOrders } = useMemo((): { activeOrders: Pesanan[]; historyOrders: Pesanan[] } => {
        const active = ordersWithFoodDetails.filter(o => 
            ['pending', 'dikonfirmasi', 'siap_diambil'].includes(o.status)
        );
        const history = ordersWithFoodDetails.filter(o => 
            ['sudah_diambil', 'dibatalkan_pembeli', 'dibatalkan_penjual'].includes(o.status)
        );
        return { activeOrders: active, historyOrders: history };
    }, [ordersWithFoodDetails]);

    const handleCancelOrder = async (orderId: number) => {
        if (!window.confirm("Apakah Anda yakin ingin membatalkan pesanan ini?")) return;
        try {
            const response = await fetch(`https://food-saver.kontrakita.web.id/api/v1/pembeli/pesanan/${orderId}/batalkan`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
            });
            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || 'Gagal membatalkan pesanan.');
            }
            alert('Pesanan berhasil dibatalkan.');
            fetchAllData();
        } catch (err: any) {
            setError(err.message);
            alert(`Error: ${err.message}`);
        }
    };
    
    const handleDeleteOrder = async (orderId: number) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus riwayat pesanan ini?")) return;
        const newOrders = orders.filter(order => order.id !== orderId);
        setOrders(newOrders);
        alert('Riwayat pesanan telah dihapus dari tampilan.');
    };

    const handleOpenReviewModal = (order: Pesanan) => {
        setSelectedOrder(order);
        setIsReviewModalOpen(true);
    };

    const handleCloseReviewModal = () => {
        setSelectedOrder(null);
        setIsReviewModalOpen(false);
        fetchAllData();
    };

    const getStatusBadge = (status: string) => {
        const styles: { [key: string]: string } = {
            pending: 'bg-yellow-100 text-yellow-800',
            dikonfirmasi: 'bg-blue-100 text-blue-800',
            siap_diambil: 'bg-indigo-100 text-indigo-800',
            sudah_diambil: 'bg-green-100 text-green-800',
            dibatalkan_pembeli: 'bg-red-100 text-red-800',
            dibatalkan_penjual: 'bg-red-100 text-red-800',
            default: 'bg-gray-100 text-gray-800',
        };
        return styles[status] || styles.default;
    };

    const renderOrderList = (orderList: Pesanan[], isHistory: boolean) => {
        if (orderList.length === 0) {
            return <div className="text-center py-10 text-gray-500"><p>Tidak ada pesanan di kategori ini.</p></div>;
        }
        return (
            <div className="space-y-4">
                {orderList.map(order => (
                    <div key={order.id} className="bg-white p-4 rounded-lg shadow-md border flex flex-col md:flex-row justify-between items-start">
                        <div className="flex-1 mb-4 md:mb-0">
                            <img 
                                src={`https://food-saver.kontrakita.web.id${order.makanan.image}`} 
                                alt={order.makanan.name} 
                                className="w-24 h-24 object-cover rounded-md float-left mr-4" 
                            />
                            <div>
                                <h2 className="text-xl font-semibold">{order.makanan.name}</h2>
                                <p className="text-sm text-gray-600">Kode Pesanan: {order.unique_code}</p>
                                <p>Jumlah: {order.quantity}</p>
                                <p>Total Harga: Rp {order.total_price.toLocaleString('id-ID')}</p>
                                <p>Tgl Pesan: {new Date(order.order_date).toLocaleString('id-ID')}</p>
                                <p>Status: <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>{order.status.replace(/_/g, ' ')}</span></p>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 w-full md:w-auto self-center">
                            {order.status === 'pending' && <button onClick={() => handleCancelOrder(order.id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-sm">Batalkan</button>}
                            {order.status === 'sudah_diambil' && !order.ulasan && <button onClick={() => handleOpenReviewModal(order)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm">Beri Ulasan</button>}
                            {order.ulasan && <div className="text-sm text-center p-2 bg-gray-100 rounded-md">Sudah Diulas</div>}
                            {isHistory && <button onClick={() => handleDeleteOrder(order.id)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition text-sm">Hapus</button>}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    if (isLoading || authLoading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Pesanan & Riwayat</h1>
            <div className="border-b border-gray-200 mb-4">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('active')} className={`${activeTab === 'active' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Pesanan Aktif ({activeOrders.length})</button>
                    <button onClick={() => setActiveTab('history')} className={`${activeTab === 'history' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>Riwayat ({historyOrders.length})</button>
                </nav>
            </div>
            <div>{activeTab === 'active' ? renderOrderList(activeOrders, false) : renderOrderList(historyOrders, true)}</div>
            {selectedOrder && <ReviewModal isOpen={isReviewModalOpen} onClose={handleCloseReviewModal} orderId={selectedOrder.id} token={token!} />}
        </div>
    );
};

export default OrderPage;