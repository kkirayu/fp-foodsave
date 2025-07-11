export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Pembeli {
  id: number;
  user_id: number;
  nama: string;
  alamat: string;
  no_telepon: string;
  poin_loyalitas: number;
  foto_profil: string | null;
  created_at: string;
  updated_at: string;
}