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
import BrandList from './pages/admin/Brand';
import AddProduct from './pages/admin/addproduct';
import UpdateProduct from './pages/admin/updateproduct';
import AddBrand from './pages/admin/addBrand';
import CategoryAdmin from './pages/admin/Category';
import AddCategory from './pages/admin/addCategory';
import Customer from './pages/admin/Customer';
import Slider from './pages/admin/Slider';

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
          <Route path="/admin/brand" element={<BrandList/>}/>
          <Route path="/admin/addproduct" element={<AddProduct/>}/>
          <Route path="/admin/updateproduct/:id" element={<UpdateProduct/>}/>
          <Route path="/admin/addbrand" element={<AddBrand/>}/>
          <Route path="/admin/category" element={<CategoryAdmin/>}/>
          <Route path="/admin/addcategory"  element={<AddCategory/>}/>
          <Route path="/admin/customer" element ={<Customer/>}/>
          <Route path="/admin/slider" element={<Slider/>}/>
        </Routes>
      </Router>
    );
  }

  export default App;
