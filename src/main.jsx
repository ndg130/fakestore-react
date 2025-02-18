import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/cart.jsx'
import { ProductProvider } from './context/products.jsx'
import { OrdersProvider } from './context/orders.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <ProductProvider>
            <CartProvider>
                <OrdersProvider>
                    <App />                    
                </OrdersProvider>
            </CartProvider>            
        </ProductProvider>
    </BrowserRouter>
  </StrictMode>,
)
