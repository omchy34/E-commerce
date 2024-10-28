// src/Layout/Layout.jsx
import React from 'react';
import Navbar from '../components/navbar/Navbar'; // Assuming you have a Navbar component
import Footer from '../components/footer/Footer'; // Assuming you have a Footer component

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
