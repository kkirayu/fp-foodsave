import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a
          className="text-2xl font-bold text-green-600 flex items-center space-x-2"
          href="#"
        >
          <img
            alt="Logo FoodSaver berupa ikon piring dengan daun hijau di atasnya"
            className="w-10 h-10"
            height="40"
            src="https://storage.googleapis.com/a1aa/image/4cf37f0a-e3e0-4713-5853-69143f1473ed.jpg"
            width="40"
          />
          <span> FoodSaver </span>
        </a>
        <nav className="hidden md:flex space-x-8 font-semibold text-gray-700">
          <a className="hover:text-green-600 transition" href="#how-it-works">
            Cara Kerja
          </a>
          <a className="hover:text-green-600 transition" href="#browse-food">
            Cari Makanan
          </a>
          <a className="hover:text-green-600 transition" href="admin.html"> {/* Keep as is or change based on actual admin page */}
            Penjual
          </a>
          <a className="hover:text-green-600 transition" href="#community">
            Komunitas
          </a>
          <a className="hover:text-green-600 transition" href="#blog">
            {' '}
            Blog{' '}
          </a>
        </nav>
        <div className="md:hidden">
          <button
            aria-label="Toggle menu"
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
            onClick={toggleMobileMenu}
          >
            <i className="fas fa-bars fa-lg"> </i>
          </button>
        </div>
      </div>
      <nav
        className={`bg-white border-t border-gray-200 md:hidden ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
        id="mobile-menu"
      >
        <a
          className="block px-4 py-3 border-b border-gray-200 hover:bg-green-50"
          href="#how-it-works"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Cara Kerja
        </a>
        <a
          className="block px-4 py-3 border-b border-gray-200 hover:bg-green-50"
          href="#browse-food"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Cari Makanan
        </a>
        <a
          className="block px-4 py-3 border-b border-gray-200 hover:bg-green-50"
          href="#seller-dashboard"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Penjual
        </a>
        <a
          className="block px-4 py-3 border-b border-gray-200 hover:bg-green-50"
          href="#community"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Komunitas
        </a>
        <a
          className="block px-4 py-3 hover:bg-green-50"
          href="#blog"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {' '}
          Blog{' '}
        </a>
      </nav>
    </header>
  );
};

export default Header;