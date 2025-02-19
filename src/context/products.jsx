import { useEffect, createContext, useState } from "react";

export const ProductContext = createContext();


export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const fetchProducts = () => {
        const localEndpoint = import.meta.env.VITE_PRODUCTS_SERVER;
        fetch(localEndpoint)
            .then(res => res.json())
            .then(data => {
                setProducts(data); // Update the product list
            });
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

