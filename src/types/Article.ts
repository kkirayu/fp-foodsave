export interface Article {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  link: string; // URL lengkap artikel
  date: string; // Tanggal publikasi
  source: string; // Sumber berita
}
