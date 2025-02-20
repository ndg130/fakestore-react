import { useEffect, createContext, useState } from "react";

export const ProductContext = createContext();


export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        const localEndpoint = import.meta.env.VITE_PRODUCTS_SERVER;
        try {
            const response = await fetch(localEndpoint);
            if(!response.ok){
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setProducts(data);            
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }

    };

    const sortPriceAscending = () => {
        setProducts((products) => products.toSorted((a,b) => a.price - b.price));
    }

    const sortPriceDescending = () => {
        setProducts((products) => products.toSorted((a,b) => b.price - a.price));
    }


    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:4000/products');
            const data = await response.json();
            setProducts(data);
        };
    
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider
          value={{
            products,
            setProducts,
            sortPriceAscending,
            sortPriceDescending,
            fetchProducts
          }}
        >
          {children}
        </ProductContext.Provider>
      );

}

