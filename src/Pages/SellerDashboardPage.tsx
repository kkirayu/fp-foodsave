import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const SellerDashboardPage: React.FC = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(() => {
  
    if (location.pathname.includes('/penjual/-p-makanan')) return 'makanan';
    if (location.pathname.includes('/penjual/-p-pesanan')) return 'pesanan';
    return 'dashboard'; 
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-green-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out md:relative md:flex-shrink-0 flex flex-col p-4 rounded-r-lg md:rounded-none shadow-lg`}
      >
        <div className="flex items-center justify-between md:justify-center mb-8">
          <Link to="/penjual" className="text-2xl font-bold text-white flex items-center space-x-2">
            {/* <img
              alt="Logo FoodSaver"
              className="w-8 h-8 rounded-full"
              src="#"
            /> */}
            <span>FoodSaver</span>
          </Link>
          <button onClick={toggleSidebar} className="md:hidden text-white focus:outline-none">
            <i className="fas fa-times fa-lg"></i> 
          </button>
        </div>

        <nav className="flex-grow space-y-2">
          <Link
            to="/penjual"
            onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
            className={`flex items-center px-4 py-2 rounded-md font-semibold transition duration-200 ${
              activeTab === 'dashboard' ? 'bg-green-600 shadow' : 'hover:bg-green-700'
            }`}
          >
            <i className="fas fa-chart-line mr-3"></i>
            Ringkasan Dashboard
          </Link>
          <Link
            to="/penjual/-p-makanan"
            onClick={() => { setActiveTab('makanan'); setIsSidebarOpen(false); }}
            className={`flex items-center px-4 py-2 rounded-md font-semibold transition duration-200 ${
              activeTab === 'makanan' ? 'bg-green-600 shadow' : 'hover:bg-green-700'
            }`}
          >
            <i className="fas fa-utensils mr-3"></i>
            Manajemen Makanan
          </Link>
          <Link
            to="/penjual/-p-pesanan"
            onClick={() => { setActiveTab('pesanan'); setIsSidebarOpen(false); }}
            className={`flex items-center px-4 py-2 rounded-md font-semibold transition duration-200 ${
              activeTab === 'pesanan' ? 'bg-green-600 shadow' : 'hover:bg-green-700'
            }`}
          >
            <i className="fas fa-check-square mr-3"></i>
            Persetujuan Pesanan
          </Link>
          {/* <Link
            to="/"
            className="flex items-center px-4 py-2 rounded-md font-semibold transition duration-200 hover:bg-green-700"
          >
            <i className="fas fa-home mr-3"></i>
            Kembali ke Beranda
          </Link> */}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow py-4 px-6 md:hidden flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-xl font-bold text-green-700">Dashboard Penjual</h1>
          <button onClick={toggleSidebar} className="text-gray-700 focus:outline-none">
            <i className="fas fa-bars fa-lg"></i> 
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-10">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default SellerDashboardPage;
