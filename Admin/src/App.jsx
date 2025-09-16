import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import Products from "./components/Products/Products";
import Layout from "./Layout/Layout";
import Analytics from "./components/Analytics/Analytics";
import Settings from "./components/Settings/Settings";
import AddProduct from "./components/AddProduct/AddProduct"

import Category from "./components/category/Category";
import BestDeals from "./components/Bestdeals/Bestdeals";
import Order from "./components/Orders/Order";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import FrontPage from "./components/FrontPage/FrontPage";
import CustomerPage from "./components/customerPage/CustomerPage";
import Login from "./components/Login/Login";


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/Login" element={<Login />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/AddProduct" element={<AddProduct/>} />
              <Route path="/Bestdeals" element={<BestDeals/>} />
              <Route path="/AddCategory" element={<Category/>} />
              <Route path="/orders" element={<Order/>} />
              <Route path="/orderdetails/:id" element={<OrderDetails/>} />
              <Route path="/FrontPage" element={<FrontPage/>} />
              <Route path="/customers" element={<CustomerPage/>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
