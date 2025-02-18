import { useEffect, createContext, useState } from "react";

export const OrdersContext = createContext();


export const OrdersProvider = ({ children }) => {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:4001/orders');
            if(!response.ok){
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setOrders(data);            
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }

    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <OrdersContext.Provider
          value={{
            orders,
            setOrders,
            fetchOrders
          }}
        >
          {children}
        </OrdersContext.Provider>
      );

}

