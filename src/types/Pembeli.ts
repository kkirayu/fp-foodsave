export interface Pembeli {
    id: number;
    user_id: number;
    nama: string;
    alamat: string;
    no_telepon: string;
    foto_profil: string | null;
    poin_loyalitas: number;
    created_at?: string;
    updated_at?: string;
}
