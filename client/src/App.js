// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';

  function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/ProductDetail" element={<ProductDetail />} />
          <Route path="/Cart" element ={<Cart/>}/>
          <Route path="/Checkout" element ={<Checkout/>}/>
          <Route path="/Profile" element ={<Profile/>}/>
          <Route path="/Orders" element ={<Orders/>}/>
          <Route path="/OrderDetail" element ={<OrderDetail/>}/>
        </Routes>
      </Router>
    );
  }

  export default App;
