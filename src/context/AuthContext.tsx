import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, Pembeli } from '../types/User';

// Definisikan tipe untuk context
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  pembeli: Pembeli | null;
  token: string | null;
  login: (data: any) => void;
  logout: () => void;
  isLoading: boolean; // Untuk mengatasi flicker saat memuat state dari localStorage
}

// Buat context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Buat provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [pembeli, setPembeli] = useState<Pembeli | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Cek localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('authUser');
      const storedPembeli = localStorage.getItem('authPembeli');

      if (storedToken && storedUser && storedPembeli) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setPembeli(JSON.parse(storedPembeli));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Gagal mem-parsing data auth dari localStorage", error);
      // Bersihkan data yang rusak
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      localStorage.removeItem('authPembeli');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fungsi untuk login
  const login = (data: any) => {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('authUser', JSON.stringify(data.user));
    localStorage.setItem('authPembeli', JSON.stringify(data.pembeli));
    setToken(data.token);
    setUser(data.user);
    setPembeli(data.pembeli);
    setIsAuthenticated(true);
  };

  // Fungsi untuk logout
  const logout = () => {
    // Idealnya, panggil juga API logout di sini jika ada
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    localStorage.removeItem('authPembeli');
    setToken(null);
    setUser(null);
    setPembeli(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, pembeli, token, login, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk menggunakan AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};