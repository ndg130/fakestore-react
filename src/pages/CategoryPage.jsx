import React, { useState, useEffect, useContext } from 'react'
import BreadCrumbs from '../components/BreadCrumbs';
import ProductCard from '../components/ProductCard';

import { ProductContext } from '../context/products';
import { useParams } from 'react-router';
export default function CategoryPage() {

    const { id, title } = useParams();
    const { products, setProducts, sortPriceAscending, sortPriceDescending } = useContext(ProductContext);
    
    const [sortOrder, setSortOrder] = useState("");
    const [categoryProducts, setCategoryProducts] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const filteredProducts = products.filter(product => Number(product.category.id) === Number(id));
            setCategoryProducts(filteredProducts);
        }
    }, [id, products]);



    return (
        <>
            <BreadCrumbs items={[{label: 'Home', href: '/'}, {label: `${title.charAt(0).toUpperCase() + title.slice(1)}`}]} />
            <div className='px-4 max-w-2xl lg:max-w-7xl mx-auto'>
                <div className='pt-10'>
                    <h1 className='text-3xl md:text-5xl mb-3 capitalize'>{title}</h1>
                    <div className='flex justify-between items-center'>
                        <p className='text-sm font-semibold'>{categoryProducts.length} PRODUCT{products.length !== 1 && 'S'}</p>
                        <select
                            onChange={(e) => {
                                setSortOrder(e.target.value);
                                if (e.target.value === 'price-asc'){
                                    sortPriceAscending()
                                } else if (e.target.value === 'price-desc'){
                                    sortPriceDescending()
                                }
                            }}
                            className='border-2 border-theme-300 rounded-xl px-2 py-1 outline-theme-400'
                        >
                            <option value="">Sort By</option>
                            <option value="price-asc">Price: Ascending</option>
                            <option value="price-desc">Price: Descending</option>
                        </select>                        
                    </div>

                </div>
                <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 py-10'>
                    {categoryProducts.length > 0 ? (
                        categoryProducts.map(product => <ProductCard key={product.id} product={product} />)
                    ) : (
                        <p>No products found in this category.</p>
                    )}
                </section>
            </div>        
        </>
    )
}
