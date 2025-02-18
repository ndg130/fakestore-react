import { useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import IndividualProductPage from './pages/IndividualProductPage'
import Basket from './pages/Basket'
import NavBar from './components/NavBar';
import SideCart from './components/SideCart';
import Footer from './components/Footer'
import ProductAdmin from './pages/ProductAdmin'
import CategoryPage from './pages/CategoryPage'
import Checkout from './pages/Checkout'
import Dashboard from './pages/Dashboard'
function App() {

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on hot reload
    }, []);

    return (
        <>
            <div className="min-h-screen bg-theme-400 text-gray-900">
                <NavBar/>
                <SideCart/>
                <main className='pb-10 font-regular min-h-[calc(100vh-100px)]'>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route 
                            path="/products/:id" 
                            element={<IndividualProductPage />} 
                        />
                                                <Route 
                            path="/category/:id/:title" 
                            element={<CategoryPage />} 
                        />
                        <Route path="/basket" element={<Basket />} />
                        <Route path='/checkout' element={<Checkout />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path="/product-admin" element={<ProductAdmin />} />
                    </Routes>                
                </main>      
                <Footer />              
            </div>
        </>
    )
}

export default App
