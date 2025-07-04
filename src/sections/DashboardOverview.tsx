import React, { useEffect } from 'react';

const DashboardOverview: React.FC = () => {
  useEffect(() => {
    console.log('DashboardOverview component has rendered.');
  }, []);

  const totalSales = 1250000; 
  const totalOrders = 75;
  const foodSaved = 150; 
  const topSellingItem = "Nasi Goreng Spesial";
  const pendingOrders = 5;

  const salesData = [
    { day: 'Sen', sales: 150000 },
    { day: 'Sel', sales: 200000 },
    { day: 'Rab', sales: 180000 },
    { day: 'Kam', sales: 250000 },
    { day: 'Jum', sales: 300000 },
    { day: 'Sab', sales: 350000 },
    { day: 'Min', sales: 280000 },
  ];

  return (
    <div>
      <h3 className="text-2xl font-semibold text-green-700 mb-6">Ringkasan Dashboard</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="text-green-600 text-4xl">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Penjualan</p>
            <p className="text-2xl font-bold text-gray-800">Rp {totalSales.toLocaleString('id-ID')}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="text-blue-600 text-4xl">
            <i className="fas fa-receipt"></i>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Pesanan</p>
            <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="text-yellow-600 text-4xl">
            <i className="fas fa-leaf"></i>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Makanan Terselamatkan</p>
            <p className="text-2xl font-bold text-gray-800">{foodSaved} kg</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Penjualan 7 Hari Terakhir</h4>
        <div className="flex justify-between items-end h-48">
          {salesData.map((data, index) => (
            <div key={index} className="flex flex-col items-center h-full justify-end">
              <div
                className="w-8 bg-green-500 rounded-t-md transition-all duration-300 ease-out"
                style={{ height: `${(data.sales / Math.max(...salesData.map(d => d.sales))) * 100}%` }}
                title={`Rp ${data.sales.toLocaleString('id-ID')}`}
              ></div>
              <span className="text-xs text-gray-600 mt-2">{data.day}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 text-center mt-4">Jumlah penjualan harian</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Item Terlaris</h4>
          <p className="text-lg text-gray-700">{topSellingItem}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Pesanan Menunggu Persetujuan</h4>
          <p className="text-lg text-red-600 font-bold">{pendingOrders}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
