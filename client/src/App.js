// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Client
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import Login from './pages/Login';
import Register from './pages/Register';

// Server
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import OrdersAdmin from "./pages/admin/OrdersAdmin";
import LoginAdmin from "./pages/admin/Login";

  function App() {
    return (
      <Router>
        <Routes>

          {/* Client */}

          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/ProductDetail" element={<ProductDetail />} />
          <Route path="/Cart" element ={<Cart/>}/>
          <Route path="/Checkout" element ={<Checkout/>}/>
          <Route path="/Profile" element ={<Profile/>}/>
          <Route path="/Orders" element ={<Orders/>}/>
          <Route path="/Login" element ={<Login/>}/>
          <Route path="/Register" element ={<Register/>}/>
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/orders/:orderId" element={<OrderDetail />} />

          {/* Admin */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<OrdersAdmin />} />
          <Route path="/admin/login" element={<LoginAdmin />} />
        </Routes>
      </Router>
    );
  }

  export default App;
