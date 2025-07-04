import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SellerRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    storeName: '',
    location: '',
    phoneNumber: '',
    storeType: '',
    halalCertified: false,
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Kata sandi dan konfirmasi kata sandi tidak cocok.');
      return;
    }

    console.log('Data Pendaftaran Penjual:', formData);
    
    navigate('/verifikasi-email', { state: { email: formData.email } });
  };

  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50 min-h-[calc(100vh-160px)] flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto bg-white rounded-lg shadow-xl p-8 md:p-10">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-8">Daftar Sebagai Penjual</h2>
        <p className="text-center text-gray-600 mb-8">
          Bergabunglah dengan FoodSaver untuk mengurangi limbah makanan dan menjangkau lebih banyak pelanggan!
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="storeName" className="block text-gray-700 text-sm font-bold mb-2">
              Nama Toko:
            </label>
            <input
              type="text"
              id="storeName"
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
              placeholder="Nama Restoran/Kafe/Toko Anda"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
              Alamat Lengkap Toko:
            </label>
            <textarea
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              rows={3}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
              placeholder="Jalan, Nomor, Kota, Provinsi, Kode Pos"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Nomor Telepon:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
              placeholder="Contoh: +628123456789"
              required
            />
          </div>
          <div>
            <label htmlFor="storeType" className="block text-gray-700 text-sm font-bold mb-2">
              Jenis Toko:
            </label>
            <select
              id="storeType"
              name="storeType"
              value={formData.storeType}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Pilih Jenis Toko</option>
              <option value="restaurant">Restoran</option>
              <option value="cafe">Kafe</option>
              <option value="bakery">Toko Roti/Kue</option>
              <option value="catering">Katering</option>
              <option value="other">Lainnya</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="halalCertified"
              name="halalCertified"
              checked={formData.halalCertified}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-green-600 rounded"
            />
            <label htmlFor="halalCertified" className="ml-2 text-gray-700 text-sm font-bold">
              Memiliki Sertifikat Halal
            </label>
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
              placeholder="email@contoh.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Kata Sandi:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
              placeholder="Minimal 8 karakter"
              required
              minLength={8}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Konfirmasi Kata Sandi:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
              placeholder="Ulangi kata sandi Anda"
              required
              minLength={8}
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-md shadow-md transition text-lg"
            >
              Daftar Sekarang
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SellerRegistrationPage;
