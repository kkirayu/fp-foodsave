import React from 'react';
import Header from '../components/Header'; 
import BrowseFoodSection from '../sections/BrowseFoodSection';
import Footer from '../components/Footer'; 

const BrowseFoodPage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <BrowseFoodSection />
      </main>
      <Footer />
    </>
  );
};

export default BrowseFoodPage;