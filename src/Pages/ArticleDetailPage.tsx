import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Article } from '../types/Article';

const dummyArticles: Article[] = [
  {
    id: '1',
    imageSrc: 'https://placehold.co/800x450/E0F2F1/004D40?text=Article+1', 
    imageAlt: 'Tumpukan sampah makanan di tempat pembuangan akhir',
    title: 'Dampak Sampah Makanan Terhadap Perubahan Iklim',
    description: 'Limbah makanan adalah masalah global yang kompleks dengan dampak lingkungan, sosial, dan ekonomi yang signifikan. Salah satu dampak paling krusial adalah kontribusinya terhadap perubahan iklim. Ketika makanan terbuang dan membusuk di tempat pembuangan akhir, ia menghasilkan metana, gas rumah kaca yang jauh lebih kuat daripada karbon dioksida dalam jangka pendek. Diperkirakan bahwa limbah makanan menyumbang sekitar 8-10% dari emisi gas rumah kaca global. Mengurangi limbah makanan bukan hanya tentang menghemat sumber daya, tetapi juga merupakan langkah penting dalam mitigasi perubahan iklim.',
    link: '#',
    date: '1 Juli 2024',
    source: 'Lingkungan Hidup',
  },
  {
    id: '2',
    imageSrc: 'https://placehold.co/800x450/C8E6C9/1B5E20?text=Article+2', 
    imageAlt: 'Kompos dari sampah makanan',
    title: 'Solusi Inovatif Mengurangi Limbah Makanan di Perkotaan',
    description: 'Kota-kota besar menghadapi tantangan besar dalam mengelola limbah makanan karena kepadatan penduduk dan konsumsi yang tinggi. Namun, berbagai solusi inovatif mulai diterapkan. Ini termasuk program pengumpulan kompos rumah tangga, teknologi pengolahan limbah makanan menjadi energi (biogas), aplikasi yang menghubungkan surplus makanan dengan mereka yang membutuhkan, dan kebijakan insentif untuk restoran dan toko kelontong agar mengurangi pemborosan. Edukasi publik juga memainkan peran kunci dalam mengubah perilaku konsumen.',
    link: '#',
    date: '25 Juni 2024',
    source: 'EcoWatch',
  },
  {
    id: '3',
    imageSrc: 'https://placehold.co/800x450/A5D6A7/2E7D32?text=Article+3', 
    imageAlt: 'Orang-orang menerima donasi makanan',
    title: 'Peran Komunitas dalam Menyelamatkan Makanan Berlebih',
    description: 'Gerakan akar rumput dan inisiatif komunitas memainkan peran vital dalam mengurangi limbah makanan. Bank makanan, dapur umum, dan program penyelamatan makanan sukarela bekerja tanpa lelah untuk mengumpulkan makanan berlebih dari supermarket, restoran, dan acara, kemudian mendistribusikannya kepada individu dan keluarga yang rentan pangan. Upaya ini tidak hanya mengurangi pemborosan tetapi juga mengatasi masalah ketahanan pangan, menciptakan jembatan antara surplus dan kebutuhan.',
    link: '#',
    date: '18 Juni 2024',
    source: 'FoodRescue.org',
  },
  {
    id: '4',
    imageSrc: 'https://placehold.co/800x450/81C784/388E3C?text=Article+4',
    imageAlt: 'Petani menanam tanaman secara berkelanjutan',
    title: 'Dari Petani ke Meja: Mengurangi Kerugian Pangan di Rantai Pasok',
    description: 'Kerugian pangan tidak hanya terjadi di tingkat konsumen tetapi juga di sepanjang rantai pasok, mulai dari pertanian hingga distribusi. Faktor-faktor seperti praktik panen yang tidak efisien, penyimpanan yang buruk, dan standar kualitas yang ketat menyebabkan sejumlah besar makanan tidak pernah mencapai pasar. Solusi yang diusulkan meliputi peningkatan infrastruktur pasca-panen, penggunaan teknologi untuk memantau kondisi penyimpanan, dan pengembangan pasar untuk produk "jelek" yang masih layak konsumsi.',
    link: '#',
    date: '10 Juni 2024',
    source: 'Pertanian Berkelanjutan',
  },
];

const ArticleDetailPage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  console.log('Article ID from URL params:', articleId);
  
  const article = dummyArticles.find((a) => a.id === articleId);
  console.log('Found article:', article); 

  if (!article) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Artikel Tidak Ditemukan</h2>
        <p className="text-gray-700">Maaf, artikel yang Anda cari tidak ada.</p>
        <Link to="/komunitas" className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition">
          Kembali ke Berita Komunitas
        </Link>
      </div>
    );
  }

  return (
    <section className="py-16 px-6 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <Link to="/komunitas" className="text-green-600 hover:underline mb-8 block">
          &larr; Kembali ke Berita Komunitas
        </Link>
        <img
          src={article.imageSrc}
          alt={article.imageAlt}
          className="w-full h-80 object-cover rounded-lg shadow-md mb-8"
        />
        <h1 className="text-4xl font-extrabold text-green-800 mb-4">
          {article.title}
        </h1>
        <div className="text-gray-600 text-sm mb-6 flex justify-between">
          <span>{article.date}</span>
          <span>Sumber: {article.source}</span>
        </div>
        <p className="text-gray-800 leading-relaxed text-lg mb-8">
          {article.description}
        </p>
        {/* Anda bisa menambahkan lebih banyak paragraf atau elemen di sini */}
        <p className="text-gray-700 italic">
          Artikel ini adalah bagian dari upaya FoodSaver untuk meningkatkan kesadaran tentang pentingnya mengurangi limbah makanan.
        </p>
      </div>
    </section>
  );
};

export default ArticleDetailPage;
