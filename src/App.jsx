import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import IndividualProductPage from './pages/IndividualProductPage';
import Basket from './pages/Basket';
import CategoryPage from './pages/CategoryPage';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';

// Admin Pages
import Dashboard from './pages/Dashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminSingleOrder from './pages/Admin/AdminSingleOrder';
import AdminAddProduct from './pages/Admin/AdminAddProduct';
import AdminEditProduct from './pages/Admin/AdminEditProduct';

// Components
import NavBar from './components/NavBar';
import SideCart from './components/SideCart';
import Footer from './components/Footer';
import ScrollToTop from './utils/ScrollToTop';

function App() {

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on hot reload
    }, []);

    return (
        <>
            <ScrollToTop />
            <div className="min-h-screen bg-theme-400 text-gray-900">
                <NavBar/>
                <SideCart/>
                <main className='pb-10 font-regular min-h-[calc(100vh-100px)]'>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/products/:id" element={<IndividualProductPage />} />
                        <Route path="/category/:title" element={<CategoryPage />} />
                        <Route path="/basket" element={<Basket />} />
                        <Route path="/checkout" element={<Checkout />} />

                        {/* Dashboard Routes - Nested */}
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/dashboard/products' element={<AdminProducts />} />
                        <Route path='/dashboard/products/add' element={<AdminAddProduct />} />
                        <Route path='/dashboard/products/edit/:id' element={<AdminEditProduct />} />
                        <Route path='/dashboard/orders' element={<AdminOrders />} />
                        <Route path='/dashboard/orders/:id' element={<AdminSingleOrder />} />

                        {/* Catch-All Route */}
                        <Route path="*" element={<NotFound />} />

                    </Routes>                
                </main>      
                <Footer />              
            </div>
        </>
    )
}

export default App
