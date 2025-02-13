import { useEffect, createContext, useState } from "react";

export const CartContext = createContext();


export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])
    const [sideCartOpen, setSideCartOpen] = useState(false);

    const toggleSideCart = (value) => {
        setSideCartOpen(sideCartOpen => value !== undefined ? value : !sideCartOpen);
    }
    const addToCart = (item) => {

        toggleSideCart(true);
    

        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            );
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }

        // console.log(cartItems);
    };

    const removeFromCart = (item) => {
        console.log('Removing from cart:', item);
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    };

    const clearCart = () => {
        setCartItems([])
    }

    const getCartQuantity = () => {

        let total = 0;
        cartItems.forEach((item) => {
            total = total + item.quantity
        });
        return total;
    }     
    const getCartValue = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total = total + (item.quantity * item.price)
        });
        return total;
    } 
    
    const increaseItemQuantity = (item) => {
        setCartItems(
            cartItems.map((cartItem) =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            )
        );
    }

    const decreaseItemQuantity = (item) => {
        if(item.quantity > 0){
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                )
            );
    }
    }


    // Any time cartItems is updated, set the new value to localStorage
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // On page load this checks localStorage for cartItems, and sets cartItems
    // to it's value if there is one there already
    useEffect(() => {
        const cartItems = localStorage.getItem("cartItems");
        if(cartItems){
            setCartItems(JSON.parse(cartItems));
        }
    }, []);


    return (
        <CartContext.Provider
          value={{
            cartItems,
            sideCartOpen,
            addToCart,
            removeFromCart,
            clearCart,
            getCartValue,
            getCartQuantity, 
            toggleSideCart,
            increaseItemQuantity,
            decreaseItemQuantity
          }}
        >
          {children}
        </CartContext.Provider>
      );

}

