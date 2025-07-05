import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
          href="/"
        >
          <img
            alt="Logo FoodSaver berupa ikon piring dengan daun hijau di atasnya"
            className="w-10 h-10"
            height="40"
            src="/img/logo.png"
            width="40"
          />
          <span> FoodSaver </span>
        </a>
        <nav className="hidden md:flex space-x-8 font-semibold text-gray-700">
          <a className="hover:text-green-600 transition" href="cara-kerja">
            Cara Kerja
          </a>
          <Link className="hover:text-green-600 transition" to="/makanan">
            Cari Makanan
          </Link>
          <a className="hover:text-green-600 transition" href="profil"> 
            Profile
          </a>
          <a className="hover:text-green-600 transition" href="/komunitas">
            Komunitas
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
          href="cara-kerja"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Cara Kerja
        </a>
        <Link
          className="block px-4 py-3 border-b border-gray-200 hover:bg-green-50"
          to="/makanan"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Cari Makanan
        </Link>
        <a
          className="block px-4 py-3 border-b border-gray-200 hover:bg-green-50"
          href="profil"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Profile
        </a>
        <a
          className="block px-4 py-3 border-b border-gray-200 hover:bg-green-50"
          href="/komunitas"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Komunitas
        </a>
      </nav>
    </header>
  );
};

export default Header;