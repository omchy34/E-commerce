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
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ProductFashion from './components/Fashion/Fashion';
import ProductMobile from './components/Mobiles/Mobiles'
import AddressForm from './components/Address/AddressFrom.jsx'
import ProductDetails from './components/ProductPage/ProductPage.jsx';
import OrderSuccessPage from './components/Order/Order-Success.jsx';
import AddressMain from './components/Address/AddressMain.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/RegistrationForm" element={<RegistrationForm />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/WishList" element={<Wishlist />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path='/Fashion/:categoryId/:name' element={<ProductFashion />} />
        <Route path='/Mobile/:categoryId/:name' element={<ProductMobile />} />
        <Route path='/ProductDetails/:id' element={<ProductDetails />} />

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
        <Route
          path="/Add-Address"
          element={
            <ProtectedRoute>
              <AddressForm />
            </ProtectedRoute>
          }
        />
        <Route path='/order-success'
        element={
          <ProtectedRoute>
          <OrderSuccessPage/>
          </ProtectedRoute>
        }
        />
        <Route path='/address' element={
 <ProtectedRoute>
 <AddressMain/>
 </ProtectedRoute>
        }/>
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>} />
      </Routes>
    </Layout>
  );
};

export default App;
