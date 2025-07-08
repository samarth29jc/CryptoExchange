import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Exchange from './Exchange';
import Security from './Security';
import Footer from './Footer';
import Contact from './Contact';

const Home = () => {
  return (
    <div className="website-home">
      <Header />
      <Hero />
      <Features />
      <Exchange />
      <Security />
      <Contact/>
      <Footer />
    </div>
  );
};

export default Home;