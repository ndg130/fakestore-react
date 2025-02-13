import { useState, useEffect, useContext } from 'react'
import ProductCard from '../components/ProductCard';
import BreadCrumbs from '../components/BreadCrumbs';

import { CartContext } from '../context/cart';
import { ProductContext } from '../context/products';
export default function ProductsPage() {

    const { toggleSideCart } = useContext(CartContext);
    const { products, sortPriceAscending, sortPriceDescending } = useContext(ProductContext);
    const [sortOrder, setSortOrder] = useState("");


    useEffect(() => {
        
        toggleSideCart(false);

/*         fetch('https://api.escuelajs.co/api/v1/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
        }) */

    }, [toggleSideCart]);


    return (
        <>
            <BreadCrumbs items={[{label: 'Home', href: '/'}, {label: 'Products'}]} />
            <div className='px-4 max-w-2xl lg:max-w-7xl mx-auto'>
                <div className='pt-10'>
                    <h1 className='text-3xl md:text-5xl mb-3 text-theme-900'>All Products</h1>
                    <div className='flex justify-between items-center'>
                        <p className='text-sm font-semibold'>{products.length} PRODUCT{products.length !== 1 && 'S'}</p>
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
                    {
                        products.map(product => (
                            <ProductCard key={product.id} product={product}/>
                        ))
                    }
                </section>
            </div>        
        </>

    )
}
