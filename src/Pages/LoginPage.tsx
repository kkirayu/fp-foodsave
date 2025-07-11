import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const successMessage = location.state?.message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
        setError('Email dan password harus diisi.');
        setIsLoading(false);
        return;
    }

    try {
      // Mengubah metode ke POST dan mengirim data di body
      const response = await fetch('https://food-saver.kontrakita.web.id/api/v1/pembeli/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Coba untuk parse response sebagai JSON, apa pun statusnya
      const data = await response.json();

      if (!response.ok) {
        // Jika response tidak ok, lempar error dengan pesan dari server
        throw new Error(data.message || 'Login gagal. Periksa kembali email dan password Anda.');
      }

      login(data);
      navigate('/'); // Arahkan ke homepage setelah login berhasil
    } catch (err: any) {
      // Menangkap error dari network atau dari 'throw new Error' di atas
      setError(err.message);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login Akun</h2>
        {error && <p className="bg-red-100 text-red-700 text-center p-3 rounded mb-4">{error}</p>}
        {successMessage && <p className="bg-green-100 text-green-700 text-center p-3 rounded mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
              id="email"
              type="email"
              placeholder="contoh@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-300 disabled:bg-gray-400"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Sign In'}
            </button>
          </div>
          <p className="text-center text-gray-600 text-sm mt-6">
            Belum punya akun? <Link to="/register" className="text-green-500 hover:text-green-700 font-semibold">Daftar di sini</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;