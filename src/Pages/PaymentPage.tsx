import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { FoodItem } from '../types/FoodItem';
import type { PenjualDetail } from '../types/Penjual';
import SuccessModal from '../components/SuccessModal';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token, isAuthenticated } = useAuth();
    
    const state = location.state as { food: FoodItem, quantity: number, paymentMethod: string };

    const [paymentMethod, setPaymentMethod] = useState(state?.paymentMethod || 'qris');
    const [penjualInfo, setPenjualInfo] = useState<PenjualDetail | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingSeller, setIsFetchingSeller] = useState(true);
    const [error, setError] = useState('');
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    if (!isAuthenticated || !state?.food) {
        return (
            <div className="container mx-auto px-4 py-10 text-center">
                <h1 className="text-2xl font-bold text-red-600">Terjadi Kesalahan</h1>
                <p className="text-gray-700 mt-2">Data pesanan tidak ditemukan. Mungkin Anda me-refresh halaman ini.</p>
                <Link to="/cari-makanan" className="mt-4 inline-block bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700">
                    Kembali ke Pencarian Makanan
                </Link>
            </div>
        );
    }
    
    const { food, quantity } = state;
    useEffect(() => {
        const fetchPenjualInfo = async () => {
            if (!food?.penjual?.id) return;
            setIsFetchingSeller(true);
            try {
                const response = await fetch(`https://food-saver.kontrakita.web.id/api/v1/penjual`);
                const result = await response.json();
                if (!result.success || !Array.isArray(result.data)) {
                    throw new Error('Gagal mengambil data penjual.');
                }
                const seller = result.data.find((p: PenjualDetail) => p.id === food.penjual.id);
                if (seller) {
                    setPenjualInfo(seller);
                } else {
                    throw new Error('Detail penjual tidak ditemukan.');
                }
            } catch (err: any) {
                setError(`Gagal memuat info pembayaran: ${err.message}`);
            } finally {
                setIsFetchingSeller(false);
            }
        };

        fetchPenjualInfo();
    }, [food?.penjual?.id]);
    
    const totalPrice = food.discounted_price * quantity;

    const handleConfirmPayment = async () => {
        setIsLoading(true);
        setError('');

        const now = new Date();
        const formattedPickupDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

        try {
            const response = await fetch(`https://food-saver.kontrakita.web.id/api/v1/pembeli/pesan?makanan_id=${food.id}&quantity=${quantity}&pickup_date=${formattedPickupDate}&payment_method=${paymentMethod}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.message || 'Gagal membuat pesanan.');
            }
            
            setIsSuccessModalOpen(true);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Konfirmasi Pembayaran</h1>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Detail Pesanan</h2>
                    <div className="flex items-center space-x-4">
                        <img src={`https://food-saver.kontrakita.web.id${food.image}`} alt={food.name} className="w-24 h-24 object-cover rounded-md"/>
                        <div>
                            <p className="font-bold text-lg">{food.name}</p>
                            <p className="text-gray-600">Jumlah: {quantity}</p>
                            <p className="text-gray-600">Harga: Rp {food.discounted_price.toLocaleString('id-ID')} / item</p>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t flex justify-between items-center font-bold text-xl">
                        <span>Total Pembayaran</span>
                        <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Pilih Metode Pembayaran</h2>
                    <div className="space-y-2">
                        <label className="flex items-center p-3 border rounded-md has-[:checked]:bg-green-50 has-[:checked]:border-green-500 transition-all">
                            <input type="radio" name="paymentMethod" value="qris" checked={paymentMethod === 'qris'} onChange={() => setPaymentMethod('qris')} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"/>
                            <span className="ml-3 font-medium">QRIS</span>
                        </label>
                        <label className="flex items-center p-3 border rounded-md has-[:checked]:bg-green-50 has-[:checked]:border-green-500 transition-all">
                            <input type="radio" name="paymentMethod" value="transfer" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"/>
                            <span className="ml-3 font-medium">Bank Transfer</span>
                        </label>
                    </div>
                </div>

                <div className="text-center p-6 bg-gray-50 rounded-lg">
                    {paymentMethod === 'qris' && (
                        <div>
                            <h3 className="font-semibold mb-2">Scan QR Code di Bawah Ini</h3>
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://food-saver.kontrakita.web.id" alt="QR Code" className="mx-auto"/>
                            <p className="text-sm text-gray-500 mt-2">Gunakan aplikasi pembayaran favorit Anda.</p>
                        </div>
                    )}
                    {paymentMethod === 'transfer' && (
                        <div>
                            <h3 className="font-semibold mb-2">Transfer ke Rekening Berikut</h3>
                            {isFetchingSeller ? (
                                <p>Memuat info rekening...</p>
                            ) : penjualInfo ? (
                                <>
                                    <p className="text-2xl font-mono bg-white p-3 rounded-md shadow-inner">{penjualInfo.rekening_bank}</p>
                                    <p className="text-sm text-gray-500 mt-2">a/n: {penjualInfo.nama_pembilik_rekening}</p>
                                </>
                            ) : (
                                <p className="text-red-500">Gagal memuat info rekening.</p>
                            )}
                        </div>
                    )}
                </div>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                <div className="mt-8">
                    <button 
                        onClick={handleConfirmPayment}
                        disabled={isLoading || isFetchingSeller}
                        className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition disabled:bg-gray-400"
                    >
                        {isLoading ? 'Memproses...' : 'Saya Sudah Bayar'}
                    </button>
                </div>
            </div>
            
            <SuccessModal 
                isOpen={isSuccessModalOpen}
                onClose={() => navigate('/pesanan')}
            />
        </div>
    );
};

export default PaymentPage;