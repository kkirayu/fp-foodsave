import type { FoodItem } from './FoodItem';

export interface Ulasan {
    id: number;
    rating: number;
    comment: string;
}

export interface Pesanan {
    id: number;
    pembeli_id: number;
    penjual_id: number;
    makanan_id: number;
    quantity: number;
    total_price: number;
    status: 'pending' | 'confirmed' | 'sudah_diambil' | 'dibatalkan_pembeli' | 'dibatalkan_penjual';
    order_date: string;
    pickup_date: string;
    payment_method: string;
    unique_code: string;
    makanan: FoodItem; 
    ulasan: Ulasan | null; 
}