import { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from "react-icons/fa"; 

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        closeMobileMenu();
        navigate('/');
    };

    const activeLink = 'text-green-600 font-semibold';
    const normalLink = 'hover:text-green-600 transition-colors duration-300';
    
    const mobileActiveLink = 'bg-green-100 text-green-700';
    const mobileNormalLink = 'text-gray-700 hover:text-gray-900 hover:bg-gray-50';

    const navLinks = (
        <>
            <NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink}>Home</NavLink>
            <NavLink to="/makanan" className={({ isActive }) => isActive ? activeLink : normalLink}>Cari Makanan</NavLink>
            <NavLink to="/cara-kerja" className={({ isActive }) => isActive ? activeLink : normalLink}>Cara Kerja</NavLink>
            <NavLink to="/komunitas" className={({ isActive }) => isActive ? activeLink : normalLink}>Community</NavLink>
        </>
    );
    
    const mobileNavLinks = (
        <>
            <NavLink to="/" className={({ isActive }) => `block rounded-md px-3 py-2 text-base font-medium ${isActive ? mobileActiveLink : mobileNormalLink}`} onClick={closeMobileMenu}>Home</NavLink>
            <NavLink to="/makanan" className={({ isActive }) => `block rounded-md px-3 py-2 text-base font-medium ${isActive ? mobileActiveLink : mobileNormalLink}`} onClick={closeMobileMenu}>Cari Makanan</NavLink>
            <NavLink to="/cara-kerja" className={({ isActive }) => `block rounded-md px-3 py-2 text-base font-medium ${isActive ? mobileActiveLink : mobileNormalLink}`} onClick={closeMobileMenu}>Cara Kerja</NavLink>
            <NavLink to="/komunitas" className={({ isActive }) => `block rounded-md px-3 py-2 text-base font-medium ${isActive ? mobileActiveLink : mobileNormalLink}`} onClick={closeMobileMenu}>Community</NavLink>
        </>
    );

    const isProfilePageActive = location.pathname.startsWith('/profil') || location.pathname.startsWith('/pesanan');

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-green-600 flex items-center space-x-2">
                    <img alt="Logo FoodSaver" className="w-9 h-9" src="/img/logo.png" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    <span>FoodSaver</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
                    {navLinks}
                </nav>
                <div className="hidden md:flex items-center space-x-4">
                    {isAuthenticated && user ? (
                        <div className="relative">
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
                                <FaUserCircle className={`w-6 h-6 transition-colors ${isProfilePageActive ? 'text-green-600' : 'text-gray-400'}`} />
                                <span className={`font-medium transition-colors ${isProfilePageActive ? 'text-green-600' : 'text-gray-700'}`}>{user.name}</span>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5" onMouseLeave={() => setIsDropdownOpen(false)}>
                                    <NavLink to="/profil" className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? mobileActiveLink : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setIsDropdownOpen(false)}>Profil Saya</NavLink>
                                    <NavLink to="/pesanan" className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? mobileActiveLink : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setIsDropdownOpen(false)}>Pesanan & Riwayat</NavLink>
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 font-semibold">
                            Login
                        </Link>
                    )}
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} aria-label="Toggle menu" className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
                    </button>
                </div>
            </div>

            <nav className={`bg-white border-t border-gray-200 md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {mobileNavLinks}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                    <div className="px-5">
                        {isAuthenticated && user ? (
                            <div className="space-y-1">
                                <div className="flex items-center space-x-3 mb-3">
                                    <FaUserCircle className="w-10 h-10 text-gray-400"/>
                                    <div>
                                        <div className="text-base font-medium text-gray-800">{user.name}</div>
                                        <div className="text-sm font-medium text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                                <NavLink to="/profil" className={({ isActive }) => `block rounded-md px-3 py-2 text-base font-medium ${isActive ? mobileActiveLink : mobileNormalLink}`} onClick={closeMobileMenu}>Profil Saya</NavLink>
                                <NavLink to="/pesanan" className={({ isActive }) => `block rounded-md px-3 py-2 text-base font-medium ${isActive ? mobileActiveLink : mobileNormalLink}`} onClick={closeMobileMenu}>Pesanan & Riwayat</NavLink>
                                <button onClick={handleLogout} className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" onClick={closeMobileMenu} className="block w-full text-center bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 font-semibold">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;