import React from 'react';
import HeroSection from '../sections/HeroSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import CommunitySection from '../sections/ComunitySection';
import BlogSection from '../sections/BlogSection';
import CariMakanan from './CariMakanan';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <CariMakanan />
      <CommunitySection />
      <BlogSection />
    </>
  );
};

export default HomePage;