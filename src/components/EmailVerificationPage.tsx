import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const EmailVerificationPage: React.FC = () => {
  const location = useLocation();
  const email = location.state?.email as string | undefined;
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 5000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50 min-h-[calc(100vh-160px)] flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto bg-white rounded-lg shadow-xl p-8 md:p-10 text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-6">Verifikasi Email Anda</h2>
        
        {showAlert && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Pendaftaran Berhasil!</strong>
            <span className="block sm:inline"> Silakan cek email Anda untuk verifikasi.</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg onClick={() => setShowAlert(false)} className="fill-current h-6 w-6 text-green-500 cursor-pointer" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        )}

        <p className="text-gray-700 text-lg mb-4">
          Kami telah mengirimkan tautan verifikasi ke email Anda:
        </p>
        <p className="text-green-800 font-bold text-xl mb-6">
          {email || 'alamat_email_anda@contoh.com'}
        </p>
        <p className="text-gray-600 mb-8">
          Silakan klik tautan tersebut untuk mengaktifkan akun penjual Anda. Jika Anda tidak menerima email, periksa folder spam Anda atau klik tombol di bawah ini untuk mengirim ulang.
        </p>

        <div className="space-y-4">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-md shadow-md transition text-lg w-full"
            onClick={() => alert('Tautan verifikasi baru telah dikirim!')} 
          >
            Kirim Ulang Email Verifikasi
          </button>
          <Link
            to="/"
            className="block bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-8 py-3 rounded-md shadow-md transition text-lg w-full"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EmailVerificationPage;
