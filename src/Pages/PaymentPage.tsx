import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Order } from '../types/Order';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order | undefined; // Ambil data pesanan dari state navigasi

  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
     if (!order) {
      navigate('/makanan', { replace: true });
    }
  }, [order, navigate]);

  const handleVerifyPayment = () => {
    setPaymentStatus('processing');
    setErrorMessage(null);

    setTimeout(() => {
      const isPaymentSuccessful = Math.random() > 0.1; 

      if (isPaymentSuccessful) {
        setPaymentStatus('success');
        const updatedOrder: Order = { ...order!, status: 'paid', orderDate: new Date().toISOString() };
        navigate('/invoice', { state: { order: updatedOrder } });
      } else {
        setPaymentStatus('failed');
        setErrorMessage('Pembayaran gagal. Silakan coba lagi atau hubungi dukungan.');
      }
    }, 2000); 
  };

  if (!order) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <p className="text-gray-700">Memuat detail pesanan...</p>
      </div>
    );
  }

  return (
    <section className="py-16 px-6 md:px-12 bg-white min-h-[calc(100vh-160px)] flex items-center justify-center">
      <div className="max-w-xl mx-auto bg-green-50 rounded-lg shadow-xl p-8 md:p-10 text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Konfirmasi Pembayaran</h2>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-left">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Detail Pesanan</h3>
          <p className="text-gray-700 mb-1"><strong>ID Pesanan:</strong> {order.orderId}</p>
          <p className="text-gray-700 mb-1"><strong>Item:</strong> {order.item.title}</p>
          <p className="text-gray-700 mb-1"><strong>Kuantitas:</strong> {order.quantity}</p>
          <p className="text-gray-700 mb-1"><strong>Catatan:</strong> {order.notes || '-'}</p>
          <p className="text-green-800 text-2xl font-bold mt-4">
            Total: Rp {order.totalPrice.toLocaleString('id-ID')}
          </p>
        </div>

        {paymentStatus === 'idle' && (
          <button
            onClick={handleVerifyPayment}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-md shadow-md transition text-lg"
          >
            Verifikasi Pembayaran
          </button>
        )}
        {paymentStatus === 'processing' && (
          <button
            disabled
            className="bg-green-500 text-white font-semibold px-8 py-3 rounded-md shadow-md opacity-75 cursor-not-allowed text-lg flex items-center justify-center mx-auto"
          >
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memproses Pembayaran...
          </button>
        )}
        {paymentStatus === 'failed' && (
          <div className="text-red-600 mt-4">
            <p className="font-semibold mb-2">Pembayaran Gagal!</p>
            <p>{errorMessage}</p>
            <button
              onClick={handleVerifyPayment}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md shadow-md transition"
            >
              Coba Lagi
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentPage;
