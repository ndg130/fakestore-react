import React, { useContext } from 'react'
import Sidebar from '../components/Admin/Sidebar'
import { Link } from 'react-router-dom'
import { ProductContext } from '../context/products'
import { OrdersContext } from '../context/orders'


export default function Dashboard() {

    const { products } = useContext(ProductContext);
    const { orders } = useContext(OrdersContext);
    
    return (
        <div className='relative flex flex-col lg:flex-row h-full min-h-[calc(100vh-64px)] lg:min-h-screen'>
            <Sidebar />
            <div className='flex-1 lg:ml-72 max-w-2xl sm:max-w-5xl lg:max-w-7xl w-full h-full'>
                <div className='pt-10 pb-5 bg-theme-50 shadow-lg px-4'>
                    <h1 className='text-3xl font-semibold text-theme-900'>Welcome to the FakeStore admin dashboard</h1>
                </div>
                <div className='px-4 py-10'>
                    <h2 className='text-2xl text-theme-900 font-medium mb-3'>Overview</h2>
                    <div className='grid grid-cols-3 gap-4'>
                        <div className='rounded-lg shadow bg-white pt-3 overflow-hidden'>
                            <h3 className='text-theme-900 font-medium px-4'>Products</h3>
                            <p className='text-theme-800 font-semibold text-xl px-4 mb-3'>{products ? products.length : '...'}</p>
                            <Link to={`/dashboard/products`} aria-label="view all products" className='flex px-4 pb-3 pt-4 bg-theme-50 text-theme-800 hover:text-theme-900'>View all products</Link>
                        </div>
                        <div className='rounded-lg shadow bg-white pt-3 overflow-hidden'>
                            <h3 className='text-theme-900 font-medium px-4'>Orders</h3>
                            <p className='text-theme-800 font-semibold text-xl px-4 mb-3'>{orders ? orders.length : '...'}</p>
                            <Link to={`/dashboard/orders`} aria-label="view all orders" className='flex px-4 pb-3 pt-4 bg-theme-50 text-theme-800 hover:text-theme-900'>View all orders</Link>
                        </div>
                        <div className='rounded-lg shadow bg-white pt-3 overflow-hidden'>
                            <h3 className='text-theme-900 font-medium px-4'>Customers</h3>
                            <p className='text-theme-800 font-semibold text-xl px-4 mb-3'>19</p>
                            <Link to={`/dashboard/customers`} aria-label="view all customers" className='flex px-4 pb-3 pt-4 bg-theme-50 text-theme-800 hover:text-theme-900'>View all customers</Link>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    )
}
