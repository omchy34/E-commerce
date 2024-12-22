import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Cart from './components/Cart/Cart.jsx';
import Layout from './Layout/Layout';
import RegistrationForm from './components/Registration/Registration';
import LoginForm from "./components/Registration/Login";
import ProfilePage from './components/Profile/Profile';
import EditProfile from './components/EditProfile/EditProfile';
import Wishlist from './components/WishList/WishList';
import ProductList from "./components/productList/ProductList";
import Orders from './components/Order/Orders';
import ProtectedRoute from './components/ProtectedRoute';
import ProductFashion from './components/Fashion/Fashion';
import ProductMobile from './components/Mobiles/Mobiles'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/RegistrationForm" element={<RegistrationForm />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/WishList" element={<Wishlist />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path='/Fashion/:categoryId/:name' element={<ProductFashion/>} />
        <Route path='/Mobile/:categoryId/:name' element={<ProductMobile/>} />

        {/* Protected Routes */}
        <Route 
          path="/Profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/EditProfile" 
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Layout>
  );
};

export default App;
