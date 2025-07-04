import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import HowItWorksSection from './sections/HowItWorksSection';
import BrowseFoodSection from './sections/BrowseFoodSection';
import CommunitySection from './sections/ComunitySection';
import BlogSection from './sections/BlogSection';
import './index.css'; // Or './App.css' depending on your setup

const App: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <HowItWorksSection />
        <BrowseFoodSection />
        <CommunitySection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;