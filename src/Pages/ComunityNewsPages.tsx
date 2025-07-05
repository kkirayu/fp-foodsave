import React from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../types/Article';

const dummyArticles: Article[] = [
  {
    id: '1',
    imageSrc: '/img/6.png', 
    imageAlt: 'Tumpukan sampah makanan di tempat pembuangan akhir',
    title: 'Dampak Sampah Makanan Terhadap Perubahan Iklim',
    description: 'Pelajari bagaimana limbah makanan berkontribusi pada emisi gas rumah kaca dan krisis iklim global.',
    link: '#', 
    date: '1 Juli 2024',
    source: 'Lingkungan Hidup',
  },
  {
    id: '2',
    imageSrc: '/img/7.png', 
    imageAlt: 'Kompos dari sampah makanan',
    title: 'Solusi Inovatif Mengurangi Limbah Makanan di Perkotaan',
    description: 'Berbagai inisiatif dan teknologi baru untuk mengelola dan mengurangi sampah makanan di kota-kota besar.',
    link: '#',
    date: '25 Juni 2024',
    source: 'EcoWatch',
  },
  {
    id: '3',
    imageSrc: '/img/8.png', 
    imageAlt: 'Orang-orang menerima donasi makanan',
    title: 'Peran Komunitas dalam Menyelamatkan Makanan Berlebih',
    description: 'Bagaimana gerakan akar rumput dan inisiatif komunitas membantu mendistribusikan makanan yang masih layak.',
    link: '#',
    date: '18 Juni 2024',
    source: 'FoodRescue.org',
  },
  {
    id: '4',
    imageSrc: '/img/9.png', 
    imageAlt: 'Petani menanam tanaman secara berkelanjutan',
    title: 'Dari Petani ke Meja: Mengurangi Kerugian Pangan di Rantai Pasok',
    description: 'Menganalisis titik-titik kerugian pangan dari pertanian hingga konsumen dan cara mengatasinya.',
    link: '#',
    date: '10 Juni 2024',
    source: 'Pertanian Berkelanjutan',
  },
];

const CommunityNewsPage: React.FC = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-white" id="community-news">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
        Berita &amp; Edukasi Komunitas
      </h2>
      <p className="text-lg text-center text-gray-700 mb-10 max-w-3xl mx-auto">
        Temukan artikel terbaru tentang dampak sampah makanan terhadap lingkungan, solusi inovatif, dan bagaimana kita bisa berkontribusi dalam mengurangi limbah.
      </p>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyArticles.map((article) => (
          <article
            key={article.id}
            className="bg-green-50 rounded-lg shadow overflow-hidden flex flex-col"
          >
            <img
              alt={article.imageAlt}
              className="w-full h-48 object-cover"
              loading="lazy"
              src={article.imageSrc}
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                {article.title}
              </h3>
              <p className="text-gray-700 text-sm mb-3 flex-grow">
                {article.description.substring(0, 150)}
              </p>
              <div className="flex justify-between items-center text-gray-500 text-xs mt-auto">
                <span>{article.date}</span>
                <span>Sumber: {article.source}</span>
              </div>
              <Link
                className="mt-4 text-green-600 font-semibold hover:underline self-start"
                to={`/komunitas/${article.id}`}
              >
                Baca Selengkapnya →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CommunityNewsPage;
