import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import type { Order } from '../types/Order'; 

const InvoicePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order | undefined;

  useEffect(() => {
    if (!order || order.status !== 'paid') {
      navigate('/makanan', { replace: true }); 
    }
  }, [order, navigate]);

  if (!order || order.status !== 'paid') {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <p className="text-gray-700">Memuat invoice...</p>
      </div>
    );
  }

  return (
    <section className="py-16 px-6 md:px-12 bg-white min-h-[calc(100vh-160px)] flex items-center justify-center">
      <div className="max-w-xl mx-auto bg-green-50 rounded-lg shadow-xl p-8 md:p-10 text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Invoice Pesanan Berhasil!</h2>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-left">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Detail Invoice</h3>
          <p className="text-gray-700 mb-1"><strong>ID Pesanan:</strong> {order.orderId}</p>
          <p className="text-gray-700 mb-1"><strong>Item:</strong> {order.item.title}</p>
          <p className="text-gray-700 mb-1"><strong>Kuantitas:</strong> {order.quantity}</p>
          <p className="text-gray-700 mb-1"><strong>Catatan:</strong> {order.notes || '-'}</p>
          <p className="text-gray-700 mb-1"><strong>Status Pembayaran:</strong> <span className="text-green-600 font-semibold">Berhasil</span></p>
          <p className="text-gray-700 mb-1"><strong>Tanggal Pesanan:</strong> {new Date(order.orderDate).toLocaleString('id-ID')}</p>
          <p className="text-green-800 text-2xl font-bold mt-4">
            Total Dibayar: Rp {order.totalPrice.toLocaleString('id-ID')}
          </p>
        </div>

        <p className="text-gray-700 mb-6">
          Terima kasih telah berbelanja di FoodSaver! Anda dapat mengambil pesanan Anda sesuai waktu pengambilan yang tertera.
        </p>

        <Link
          to="/"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-md shadow-md transition text-lg"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
};

export default InvoicePage;
