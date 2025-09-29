import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Header from "../components/Header/Header";
import ProductList from '../components/ProductList';
import Footer from '../components/Footer';
import Filter from '../components/Filter';
import Pagnination from '../components/Pagnination';
import Category from '../components/Category';

const CategoryPage = () => {
    const { categoryName } = useParams(); // slug của category từ URL
    const [searchParams] = useSearchParams(); // để lấy query string, ví dụ brand=hp
    const brandName = searchParams.get("brand"); 

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = `http://localhost:5000/api/products?`;
                if (categoryName) url += `category=${categoryName}&`;
                if (brandName) url += `brand=${brandName}`;


                const res = await axios.get(url);
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryName, brandName]); // re-run khi category hoặc brand thay đổi

    if (loading) return <div>Loading...</div>;

    return (
        <div className="app">
            <Header />
            <div className='app__container'>
                <div className='grid'>
                    <div className="grid__row app__content">
                        <div className="grid__column-2">
                            <Category/>
                        </div>

                        <div className="grid__column-10">
                            <Filter/>
                            <ProductList products={products} />
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
