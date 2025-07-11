import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    alamat: '',
    no_telepon: '',
  });
  const [fotoProfil, setFotoProfil] = useState<File | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFotoProfil(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError('');
    setIsLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('password_confirmation', formData.password_confirmation);
    data.append('alamat', formData.alamat);
    data.append('no_telepon', formData.no_telepon);
    if (fotoProfil) {
      data.append('foto_profil', fotoProfil);
    }

    try {
      const response = await fetch('https://food-saver.kontrakita.web.id/api/v1/pembeli/register', {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json',
        }
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 422) { 
          setErrors(result.errors);
        } else {
          throw new Error(result.message || 'Registrasi gagal. Silakan coba lagi.');
        }
        return;
      }
      
      navigate('/login', { state: { message: 'Registrasi berhasil! Silakan login.' } });

    } catch (err: any) {
      setServerError(err.message);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Buat Akun Baru</h2>
        {serverError && <p className="bg-red-100 text-red-700 text-center p-3 rounded mb-4">{serverError}</p>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nama Lengkap</label>
              <input className={`shadow appearance-none border ${errors.name ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`} id="name" type="text" name="name" onChange={handleChange} required />
              {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name[0]}</p>}
            </div>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input className={`shadow appearance-none border ${errors.email ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`} id="email" type="email" name="email" onChange={handleChange} required />
              {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email[0]}</p>}
            </div>
            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input className={`shadow appearance-none border ${errors.password ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`} id="password" type="password" name="password" onChange={handleChange} required />
              {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password[0]}</p>}
            </div>
            {/* Password Confirmation */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password_confirmation">Konfirmasi Password</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500" id="password_confirmation" type="password" name="password_confirmation" onChange={handleChange} required />
            </div>
            {/* Alamat */}
            <div className="mb-4 md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="alamat">Alamat</label>
              <input className={`shadow appearance-none border ${errors.alamat ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`} id="alamat" type="text" name="alamat" onChange={handleChange} required />
              {errors.alamat && <p className="text-red-500 text-xs italic mt-1">{errors.alamat[0]}</p>}
            </div>
            {/* No Telepon */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="no_telepon">Nomor Telepon</label>
              <input className={`shadow appearance-none border ${errors.no_telepon ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`} id="no_telepon" type="text" name="no_telepon" onChange={handleChange} required />
              {errors.no_telepon && <p className="text-red-500 text-xs italic mt-1">{errors.no_telepon[0]}</p>}
            </div>
            {/* Foto Profil */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="foto_profil">Foto Profil</label>
              <input className={`shadow appearance-none border ${errors.foto_profil ? 'border-red-500' : ''} rounded w-full py-1.5 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500`} id="foto_profil" type="file" name="foto_profil" onChange={handleFileChange} required />
              {errors.foto_profil && <p className="text-red-500 text-xs italic mt-1">{errors.foto_profil[0]}</p>}
            </div>
          </div>

          <div className="mt-6">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-300 disabled:bg-gray-400" type="submit" disabled={isLoading}>
              {isLoading ? 'Mendaftar...' : 'Daftar'}
            </button>
          </div>
          <p className="text-center text-gray-600 text-sm mt-6">
            Sudah punya akun? <Link to="/login" className="text-green-500 hover:text-green-700 font-semibold">Login di sini</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;