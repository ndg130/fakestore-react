import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/Admin/Sidebar';
import { OrdersContext } from '../../context/orders';
import { ProductContext } from '../../context/products';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
export default function AdminSingleOrder() {

    const { id } = useParams();
    const { products } = useContext(ProductContext);
    const { orders } = useContext(OrdersContext);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState({});
    useEffect(() => {

        const singleOrder = orders.find(order => order.id === id);
        setOrder(singleOrder);
        console.log(order);

    }, [id, order, orders])

    return (
        <div className='relative flex flex-col lg:flex-row h-full min-h-[calc(100vh-64px)] lg:min-h-screen'>
            <Sidebar activePage="products"/>
            <div className='flex-1 lg:ml-72 max-w-2xl sm:max-w-5xl lg:max-w-7xl w-full h-full py-10 px-4'>
                    <div className='mb-3'>
                    <Link to="/dashboard/orders" className='text-lg hover:underline'>Back</Link>
                    </div>
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-3xl font-semibold text-theme-900">Order #{order.id}</h1>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button type="button" className="block rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Delete order</button>
                        </div>
                    </div>
                    <div className="mt-8 px-4 py-5 grid md:grid-cols-2 bg-white">
                        <div className='flex flex-col gap-y-2'>
                            <div>
                                <h3 className='text-base text-theme-900 font-medium'>Customer Name</h3>
                                <p>{order.customer}</p>                                
                            </div>
                            <div>
                                <h3 className='text-base text-theme-900 font-medium'>Address</h3>
                                <p>{order.address}</p>                                
                            </div>
                            <div>
                                <h3 className='text-base text-theme-900 font-medium'>Order value</h3>
                                <p>£{order.total}</p>                                
                            </div>
                        </div>
                    </div>
            </div>        
        </div>
    )
}
