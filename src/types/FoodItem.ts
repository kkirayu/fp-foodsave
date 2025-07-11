interface Kategori {
    id: number;
    nama: string;
    deskripsi: string | null;
}

interface Penjual {
    id: number;
    user_id: number;
    nama_toko: string;
    alamat_toko: string;
    jam_buka: string;
    jam_tutup: string;
}

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  original_price: number;
  discounted_price: number;
  current_stock: number;
  image: string;
  start_time: string;
  end_time: string;
  status: 'available' | 'unavailable';
  kategori: Kategori;
  penjual: Penjual;
}
