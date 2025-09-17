import React from 'react';
import Header from "../components/Header/Header";
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';
import Filter from '../components/Filter';
import Pagnination from '../components/Pagnination';
import Category from '../components/Category';

const CategoryPage = () => {
    const Products = [
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
    return(
        <div  className="app"> 
        <Header />
        <div className='app__container'>
            <div className='grid'>
                <div class="grid__row app__content">
                    <div class="grid__column-2">
                        <Category/>
                    </div>

                    <div class="grid__column-10">
                        <Filter/>
                        <ProductList products={Products} />
                        <Pagnination/>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        
        </div>
    );
}
export default CategoryPage;