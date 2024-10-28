// src/HomePage.jsx
import React from 'react';
import Categories from './components/categories/Categories.jsx';
import Banner from './components/banner/Banner.jsx';
import BestOfElectronics from './components/BestOfElectronics/BestOfElectronics.jsx';

const HomePage = () => {
  return (
    <div className="bg-white">
      <Categories />
      <Banner />
      <BestOfElectronics />
    </div>
  );
};

export default HomePage;
