import React from 'react';
import HeroSection from '../sections/HeroSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import BrowseFoodSection from '../sections/BrowseFoodSection';
import CommunitySection from '../sections/ComunitySection';
import BlogSection from '../sections/BlogSection';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <BrowseFoodSection />
      <CommunitySection />
      <BlogSection />
    </>
  );
};

export default HomePage;