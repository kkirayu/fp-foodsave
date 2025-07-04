import React, { useState } from 'react';
import type { Order } from '../types/Order'; 
import Modal from '../components/Modal'; 

const OrderApproval: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      orderId: 'ORD-001',
      item: {
        id: 'food1',
        imageSrc: 'https://storage.googleapis.com/a1aa/image/3413175d-3cb8-46d5-e81e-f170bcc827a9.jpg',
        imageAlt: 'Nasi Goreng Spesial',
        title: 'Nasi Goreng Spesial',
        description: 'Nasi goreng dengan telur dan sayuran.',
        price: 'Rp 15.000',
        pickupTime: '19.00 - 20.00',
        stock: 0, 
      },
      quantity: 1,
      notes: 'Tanpa bawang goreng',
      totalPrice: 15000,
      status: 'paid',
      orderDate: '2024-07-05T10:00:00Z',
      customerName: 'Budi Santoso',
      pickupCode: 'FS12345',
    },
    {
      orderId: 'ORD-002',
      item: {
        id: 'food2',
        imageSrc: 'https://storage.googleapis.com/a1aa/image/9b12dc9c-d92e-416a-9ffa-80e5ae19c0c6.jpg',
        imageAlt: 'Roti Tawar',
        title: 'Roti Tawar',
        description: 'Roti tawar lembut dengan selai stroberi.',
        price: 'Rp 8.000',
        pickupTime: '18.30 - 19.30',
        stock: 0,
      },
      quantity: 2,
      notes: '',
      totalPrice: 16000,
      status: 'paid',
      orderDate: '2024-07-05T09:30:00Z',
      customerName: 'Siti Aminah',
      pickupCode: 'FS67890',
    },
    {
      orderId: 'ORD-003',
      item: {
        id: 'food3',
        imageSrc: 'https://storage.googleapis.com/a1aa/image/7bae9ff7-fdbe-4e96-6418-c79d7cedd1bf.jpg',
        imageAlt: 'Es Teh Manis Mint',
        title: 'Es Teh Manis Mint',
        description: 'Minuman segar es teh manis dengan daun mint.',
        price: 'Rp 5.000',
        pickupTime: '17.00 - 18.00',
        stock: 0,
      },
      quantity: 3,
      notes: 'Es batu sedikit',
      totalPrice: 15000,
      status: 'picked_up', 
      orderDate: '2024-07-04T15:00:00Z',
      customerName: 'Agus Salim',
      pickupCode: 'FS00001',
    },
  ]);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [pickupCodeInput, setPickupCodeInput] = useState<string>('');
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const handleMarkAsPickedUpClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setPickupCodeInput(''); 
    setVerificationError(null);
    setIsConfirmModalOpen(true);
  };

  const confirmPickup = () => {
    const orderToUpdate = orders.find(o => o.orderId === selectedOrderId);

    if (orderToUpdate && orderToUpdate.pickupCode === pickupCodeInput) {
      setOrders(
        orders.map((order) =>
          order.orderId === selectedOrderId ? { ...order, status: 'picked_up' } : order
        )
      );
      setIsConfirmModalOpen(false);
      setSelectedOrderId(null);
      alert(`Pesanan ${selectedOrderId} berhasil ditandai sebagai sudah diambil.`);
    } else {
      setVerificationError('Kode pengambilan tidak valid.');
    }
  };

  const cancelConfirmation = () => {
    setIsConfirmModalOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold text-green-700 mb-6">Persetujuan Pesanan</h3>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Pesanan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pelanggan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kuantitas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kode Ambil
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.orderId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.item.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Rp {order.totalPrice.toLocaleString('id-ID')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'picked_up' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status === 'paid' ? 'Dibayar' : order.status === 'picked_up' ? 'Sudah Diambil' : 'Lainnya'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">
                  {order.pickupCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {order.status === 'paid' && (
                    <button
                      onClick={() => handleMarkAsPickedUpClick(order.orderId)}
                      className="text-green-600 hover:text-green-900"
                      title="Tandai Sudah Diambil"
                    >
                      <i className="fas fa-check-circle fa-lg"></i>
                    </button>
                  )}
                  {order.status === 'picked_up' && (
                     <span className="text-gray-400" title="Pesanan Sudah Diambil">
                       <i className="fas fa-check-circle fa-lg"></i>
                     </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={cancelConfirmation}
        title="Konfirmasi Pengambilan Pesanan"
      >
        <p className="text-gray-700 mb-4">
          Masukkan kode pengambilan dari pelanggan untuk mengonfirmasi pesanan <strong>{selectedOrderId}</strong>.
        </p>
        <input
          type="text"
          value={pickupCodeInput}
          onChange={(e) => setPickupCodeInput(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500 mb-4"
          placeholder="Masukkan kode pengambilan"
        />
        {verificationError && (
          <p className="text-red-600 text-sm mb-4">{verificationError}</p>
        )}
        <div className="flex justify-end space-x-3">
          <button
            onClick={cancelConfirmation}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition"
          >
            Batal
          </button>
          <button
            onClick={confirmPickup}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition"
          >
            Verifikasi & Tandai Diambil
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderApproval;
