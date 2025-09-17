// src/pages/Home.js
import React from 'react';
import Header from "../components/Header/Header";
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Footer from '../components/Footer';
import Banner from '../components/Banner';

const Home = () => {
  const promoProducts = [
    {
      id: 1,
      image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m759k7ls0rkx59@resize_w450_nl.webp",
      name: "Đồng hồ đeo tay nam Wokai dây da nâu mặt nâu lịch lãm sang trọng",
      oldPrice: "1.200.000đ",
      currentPrice: "999.000đ",
      sold: 88,
      brand: "Whoo",
      origin: "Nhật Bản",
      saleOff: 43,
      rating: 4,
      isFavorite: true,
    },
        {
      id: 1,
      image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m759k7ls0rkx59@resize_w450_nl.webp",
      name: "Đồng hồ đeo tay nam Wokai dây da nâu mặt nâu lịch lãm sang trọng",
      oldPrice: "1.200.000đ",
      currentPrice: "999.000đ",
      sold: 88,
      brand: "Whoo",
      origin: "Nhật Bản",
      saleOff: 43,
      rating: 4,
      isFavorite: true,
    },

        {
      id: 1,
      image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m759k7ls0rkx59@resize_w450_nl.webp",
      name: "Đồng hồ đeo tay nam Wokai dây da nâu mặt nâu lịch lãm sang trọng",
      oldPrice: "1.200.000đ",
      currentPrice: "999.000đ",
      sold: 88,
      brand: "Whoo",
      origin: "Nhật Bản",
      saleOff: 43,
      rating: 4,
      isFavorite: true,
    },

        {
      id: 1,
      image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m759k7ls0rkx59@resize_w450_nl.webp",
      name: "Đồng hồ đeo tay nam Wokai dây da nâu mặt nâu lịch lãm sang trọng",
      oldPrice: "1.200.000đ",
      currentPrice: "999.000đ",
      sold: 88,
      brand: "Whoo",
      origin: "Nhật Bản",
      saleOff: 43,
      rating: 4,
      isFavorite: true,
    },

        {
      id: 1,
      image: "https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m759k7ls0rkx59@resize_w450_nl.webp",
      name: "Đồng hồ đeo tay nam Wokai dây da nâu mặt nâu lịch lãm sang trọng",
      oldPrice: "1.200.000đ",
      currentPrice: "999.000đ",
      sold: 88,
      brand: "Whoo",
      origin: "Nhật Bản",
      saleOff: 43,
      rating: 4,
      isFavorite: true,
    },

    

  ];

  const newProducts = [
    {
      id: 2,
      image: "img/lap.png", 
      name: "Máy tính Victus CPU i5/RAM 16GB/SSD 556GB",
      oldPrice: "20.000.000đ",
      currentPrice: "15.000.000đ",
      sold: 12,
      brand: "HP",
      origin: "Mỹ",
      saleOff: 25,
      rating: 4,
      isFavorite: true,
    },
    
    {
      id: 2,
      image: "img/lap.png", 
      name: "Máy tính Victus CPU i5/RAM 16GB/SSD 556GB",
      oldPrice: "20.000.000đ",
      currentPrice: "15.000.000đ",
      sold: 12,
      brand: "HP",
      origin: "Mỹ",
      saleOff: 25,
      rating: 4,
      isFavorite: true,
    },

    {
      id: 2,
      image: "img/lap.png", 
      name: "Máy tính Victus CPU i5/RAM 16GB/SSD 556GB",
      oldPrice: "20.000.000đ",
      currentPrice: "15.000.000đ",
      sold: 12,
      brand: "HP",
      origin: "Mỹ",
      saleOff: 25,
      rating: 4,
      isFavorite: true,
    },

    {
      id: 2,
      image: "img/lap.png", 
      name: "Máy tính Victus CPU i5/RAM 16GB/SSD 556GB",
      oldPrice: "20.000.000đ",
      currentPrice: "15.000.000đ",
      sold: 12,
      brand: "HP",
      origin: "Mỹ",
      saleOff: 25,
      rating: 4,
      isFavorite: true,
    },

    {
      id: 2,
      image: "img/lap.png", 
      name: "Máy tính Victus CPU i5/RAM 16GB/SSD 556GB",
      oldPrice: "20.000.000đ",
      currentPrice: "15.000.000đ",
      sold: 12,
      brand: "HP",
      origin: "Mỹ",
      saleOff: 25,
      rating: 4,
      isFavorite: true,
    },
  ];

  return (
    <div  className="app"> 
      <Header />
      <div className='app__container'>
        <div className='grid'>
          <ProductList title="Sản phẩm khuyến mãi" products={promoProducts} />
          <Banner/>
          <ProductList title="Sản phẩm mới" products={newProducts} />
        </div>
      <Footer />
      </div>
    </div>
  );
};

export default Home;