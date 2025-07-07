import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Exchange from './Exchange';
import Security from './Security';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="website-home">
      <Header />
      <Hero />
      <Features />
      <Exchange />
      <Security />
      <Footer />
    </div>
  );
};

export default Home;