export interface FoodItem {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string; 
  description: string;
  price: string;
  originalPrice?: string;
  rawDiscountedPrice: number; // Added for numerical filtering
  rawOriginalPrice?: number; // Added for numerical filtering
  pickupTime: string; // Combines 'start_time' and 'end_time'
  stock: number; // Maps to 'current_stock' from API
  kategori: { // Added category info for filtering
    id: number;
    nama: string; // Maps to 'kategori.nama'
  };
  penjual: { // Added seller info for potential distance filtering (assuming lat/lon)
    id: number;
    nama_toko: string;
    latitude: string;
    longitude: string;
  };
  // Anda bisa menambahkan properti lain dari API jika diperlukan di masa mendatang
}
