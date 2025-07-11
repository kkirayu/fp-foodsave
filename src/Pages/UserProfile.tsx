import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import EditBiodataForm from '../components/EditBiodataForm';
import { useAuth } from '../context/AuthContext';
import type { Pembeli } from '../types/Pembeli';
import type { Pesanan } from '../types/Order'; 

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  profilePic: string;
}

const UserProfilePage: React.FC = () => {
  const { user, pembeli, isLoading, token } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'history' | 'biodata' | 'privacy'>('orders');
  const [isEditBiodataModalOpen, setIsEditBiodataModalOpen] = useState<boolean>(false);
  
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    profilePic: 'https://placehold.co/120x120/A5D6A7/2E7D32?text=User',
  });

  const [activeOrders, setActiveOrders] = useState<Pesanan[]>([]);
  const [orderHistory, setOrderHistory] = useState<Pesanan[]>([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState<boolean>(true);


  useEffect(() => {
    if (pembeli && user) {
      setUserData({
        fullName: pembeli.nama,
        email: user.email,
        phone: pembeli.no_telepon,
        address: pembeli.alamat,
        profilePic: `https://food-saver.kontrakita.web.id/storage/${pembeli.foto_profil}` || 'https://placehold.co/120x120/A5D6A7/2E7D32?text=User',
      });

      const fetchOrders = async () => {
        setIsOrdersLoading(true);
        try {
          const response = await fetch(`https://food-saver.kontrakita.web.id/api/v1/pembeli/pesanan`, {
             headers: {
                'Authorization': `Bearer ${token}`
             }
          });
          if (!response.ok) {
            throw new Error('Gagal mengambil data pesanan');
          }
          const allOrders: Pesanan[] = await response.json();
          
          const active = allOrders.filter(order => 
            ['pending', 'confirmed', 'siap_diambil'].includes(order.status)
          );
          const history = allOrders.filter(order => 
            ['sudah_diambil', 'dibatalkan_pembeli', 'dibatalkan_penjual'].includes(order.status)
          );

          setActiveOrders(active);
          setOrderHistory(history);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setIsOrdersLoading(false);
        }
      };

      fetchOrders();
    }
  }, [pembeli, user, token]);

  const handleSaveBiodata = (newData: UserData) => {
    setUserData(newData);
    setIsEditBiodataModalOpen(false);
    alert('Biodata berhasil diperbarui!');
  };

    const getStatusBadge = (status: Pesanan['status']) => {
        const styles: { [key in Pesanan['status']]: string } = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-blue-100 text-blue-800',
            siap_diambil: 'bg-blue-100 text-blue-800',
            sudah_diambil: 'bg-green-100 text-green-800',
            dibatalkan_pembeli: 'bg-red-100 text-red-800',
            dibatalkan_penjual: 'bg-red-100 text-red-800',
        };
        return styles[status] || 'bg-gray-100 text-gray-800';
    };


  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center">Loading...</p>;
    }

    switch (activeTab) {
      case 'orders':
        if (isOrdersLoading) return <p className="text-center">Memuat pesanan...</p>;
        return (
          <div>
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Daftar Pesanan Aktif</h3>
            {activeOrders.length > 0 ? (
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <p className="font-semibold text-lg">{order.makanan.name} ({order.quantity}x)</p>
                    <p className="text-gray-600">ID Pesanan: {order.unique_code}</p>
                    <p className="text-gray-600">Status: <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>{order.status.replace(/_/g, ' ')}</span></p>
                    <p className="text-gray-600">Waktu Pengambilan: {new Date(order.pickup_date).toLocaleString('id-ID')}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Anda tidak memiliki pesanan aktif saat ini.</p>
            )}
          </div>
        );
      case 'history':
        if (isOrdersLoading) return <p className="text-center">Memuat riwayat...</p>;
        return (
          <div>
            <h3 className="text-2xl font-semibold text-green-700 mb-4">Riwayat Pesanan</h3>
            {orderHistory.length > 0 ? (
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <p className="font-semibold text-lg">{order.makanan.name} ({order.quantity}x)</p>
                    <p className="text-gray-600">ID Pesanan: {order.unique_code}</p>
                     <p className={`text-gray-600`}>Status: <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>{order.status.replace(/_/g, ' ')}</span></p>
                    <p className="text-gray-600">Tanggal: {new Date(order.pickup_date).toLocaleString('id-ID')}</p>
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

        <div className="flex flex-col items-center mb-8">
          <img
            src={userData.profilePic}
            alt="Foto Profil Pengguna"
            className="w-32 h-32 rounded-full object-cover border-4 border-green-300 shadow-md"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/120x120/A5D6A7/2E7D32?text=User'; }}
          />
          <h3 className="text-2xl font-bold mt-4 text-green-800">{userData.fullName}</h3>
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