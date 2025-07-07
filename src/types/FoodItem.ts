export interface FoodItem {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string; 
  description: string;
  price: string;
  originalPrice?: string;
  rawDiscountedPrice: number; 
  rawOriginalPrice?: number; 
  pickupTime: string; 
  stock: number; 
  kategori: {
    id: number;
    nama: string; 
  };
  penjual: {
    nama_toko: string;
    latitude: string;
    longitude: string;
  };
}
