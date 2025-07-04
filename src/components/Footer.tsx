import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-700 text-green-100 py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-lg font-bold mb-4">FoodSaver</h4>
          <p className="text-sm">
            Menghubungkan penjual makanan sisa dengan pembeli untuk mengurangi
            limbah makanan dan memberikan keuntungan bersama.
          </p>
          <div className="mt-4 flex space-x-4 text-green-200">
            <a aria-label="Facebook" className="hover:text-white" href="#">
              <i className="fab fa-facebook fa-lg"> </i>
            </a>
            <a aria-label="Instagram" className="hover:text-white" href="#">
              <i className="fab fa-instagram fa-lg"> </i>
            </a>
            <a aria-label="Twitter" className="hover:text-white" href="#">
              <i className="fab fa-twitter fa-lg"> </i>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Menu</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="hover:underline" href="#how-it-works">
                {' '}
                Cara Kerja{' '}
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#browse-food">
                {' '}
                Cari Makanan{' '}
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#seller-dashboard">
                {' '}
                Penjual{' '}
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#community">
                {' '}
                Komunitas{' '}
              </a>
            </li>
            <li>
              <a className="hover:underline" href="#blog">
                {' '}
                Blog{' '}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Model Bisnis</h4>
          <ul className="space-y-2 text-sm">
            <li>Komisi kecil 5-10% dari transaksi</li>
            <li>Fitur premium untuk penjual</li>
            <li>Iklan bisnis makanan terkait</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Kontak</h4>
          <address className="not-italic text-sm space-y-2">
            <p>Jl. Makanan No. 123, Jakarta</p>
            <p>Email: support@foodsaver.id</p>
            <p>Telepon: +62 812 3456 7890</p>
          </address>
        </div>
      </div>
      <div className="mt-10 text-center text-green-300 text-sm">
        © 2024 FoodSaver. Semua hak cipta dilindungi.
      </div>
    </footer>
  );
};

export default Footer;