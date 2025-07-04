import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import EditBiodataForm from '../components/EditBiodataForm'; 

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  profilePic: string;
}

const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'history' | 'biodata' | 'privacy'>('orders');
  const [isEditBiodataModalOpen, setIsEditBiodataModalOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+62 812 3456 7890',
    address: 'Jl. Contoh No. 45, Jakarta',
    profilePic: 'https://placehold.co/120x120/A5D6A7/2E7D32?text=User', 
  });

  const dummyOrders = [
    { id: 'ORD001', item: 'Nasi Goreng Spesial', quantity: 1, status: 'Menunggu Pengambilan', pickupTime: 'Hari ini, 20:00' },
    { id: 'ORD002', item: 'Roti Tawar', quantity: 2, status: 'Siap Diambil', pickupTime: 'Hari ini, 19:30' },
  ];

  const dummyOrderHistory = [
    { id: 'ORD000', item: 'Es Teh Manis Mint', quantity: 1, status: 'Selesai', pickupTime: '2024-06-28, 18:00' },
    { id: 'ORD003', item: 'Kue Lapis Pelangi', quantity: 1, status: 'Selesai', pickupTime: '2024-06-27, 20:00' },
  ];

  const handleSaveBiodata = (newData: UserData) => {
    setUserData(newData);
    setIsEditBiodataModalOpen(false);
    alert('Biodata berhasil diperbarui!'); 
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div>
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Daftar Pesanan Aktif</h3>
            {dummyOrders.length > 0 ? (
              <div className="space-y-4">
                {dummyOrders.map((order) => (
                  <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <p className="font-semibold text-lg">{order.item} ({order.quantity}x)</p>
                    <p className="text-gray-600">ID Pesanan: {order.id}</p>
                    <p className="text-gray-600">Status: <span className={`font-medium ${order.status === 'Siap Diambil' ? 'text-green-600' : 'text-blue-600'}`}>{order.status}</span></p>
                    <p className="text-gray-600">Waktu Pengambilan: {order.pickupTime}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Anda tidak memiliki pesanan aktif saat ini.</p>
            )}
          </div>
        );
      case 'history':
        return (
          <div>
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Riwayat Pesanan</h3>
            {dummyOrderHistory.length > 0 ? (
              <div className="space-y-4">
                {dummyOrderHistory.map((order) => (
                  <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <p className="font-semibold text-lg">{order.item} ({order.quantity}x)</p>
                    <p className="text-gray-600">ID Pesanan: {order.id}</p>
                    <p className="text-gray-600">Status: <span className="font-medium text-gray-500">{order.status}</span></p>
                    <p className="text-gray-600">Tanggal: {order.pickupTime}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Anda belum memiliki riwayat pesanan.</p>
            )}
          </div>
        );
      case 'biodata':
        return (
          <div>
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Biodata Pengguna</h3>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <p className="text-gray-700"><strong>Nama Lengkap:</strong> {userData.fullName}</p>
              <p className="text-gray-700"><strong>Email:</strong> {userData.email}</p>
              <p className="text-gray-700"><strong>Nomor Telepon:</strong> {userData.phone}</p>
              <p className="text-gray-700"><strong>Alamat:</strong> {userData.address}</p>
              <button
                onClick={() => setIsEditBiodataModalOpen(true)} 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition"
              >
                Edit Biodata
              </button>
            </div>
          </div>
        );
      case 'privacy':
        return (
          <div>
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Pengaturan Privasi</h3>
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Izinkan Notifikasi Email</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600 rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Izinkan Pelacakan Lokasi</span>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600 rounded" />
              </div>
              <p className="text-gray-600 text-sm italic">
                Kami berkomitmen untuk melindungi data pribadi Anda. Baca kebijakan privasi kami untuk informasi lebih lanjut.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition">
                Simpan Pengaturan
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50 min-h-[calc(100vh-160px)]">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8 md:p-10">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-4">Profil Pengguna</h2>
        
        <div className="flex justify-center mb-8">
          <img
            src={userData.profilePic} 
            alt="Foto Profil Pengguna"
            className="w-32 h-32 rounded-full object-cover border-4 border-green-300 shadow-md"
          />
        </div>

        <div className="flex flex-col md:flex-row md:space-x-8">
          <aside className="md:w-1/4 mb-8 md:mb-0">
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-3 px-4 rounded-lg text-left font-semibold transition ${
                  activeTab === 'orders' ? 'bg-green-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Daftar Pesanan
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-3 px-4 rounded-lg text-left font-semibold transition ${
                  activeTab === 'history' ? 'bg-green-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Riwayat Pesanan
              </button>
              <button
                onClick={() => setActiveTab('biodata')}
                className={`py-3 px-4 rounded-lg text-left font-semibold transition ${
                  activeTab === 'biodata' ? 'bg-green-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Biodata
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`py-3 px-4 rounded-lg text-left font-semibold transition ${
                  activeTab === 'privacy' ? 'bg-green-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Privasi
              </button>
            </nav>
          </aside>

          <div className="md:w-3/4 bg-gray-50 p-6 rounded-lg shadow-inner">
            {renderContent()}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isEditBiodataModalOpen}
        onClose={() => setIsEditBiodataModalOpen(false)}
        title="Edit Biodata"
      >
        <EditBiodataForm
          initialData={userData}
          onSave={handleSaveBiodata}
          onCancel={() => setIsEditBiodataModalOpen(false)}
        />
      </Modal>
    </section>
  );
};

export default UserProfilePage;
