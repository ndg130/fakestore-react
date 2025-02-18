import React, { useContext } from 'react';
import Sidebar from '../../components/Admin/Sidebar';
import { OrdersContext } from '../../context/orders';
import { Link } from 'react-router-dom';

export default function AdminOrders() {

    const { orders } = useContext(OrdersContext);

    return (
        <div className='relative flex flex-col lg:flex-row h-full min-h-[calc(100vh-64px)] lg:min-h-screen'>
            <Sidebar activePage="products"/>
            <div className='flex-1 lg:ml-72 max-w-2xl sm:max-w-5xl lg:max-w-7xl w-full h-full py-10 px-4'>
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-3xl font-semibold text-theme-900">Orders</h1>
                            <p className="mt-2 text-sm text-gray-700">A list of all the orders in your store including...</p>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <Link to={`/dashboard/products/add`} type="button" className="block rounded-md bg-theme-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-theme-500/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Add product</Link>
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white">
                            <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">ID</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Customer name</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Order total (£)</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Items</th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">Edit</span>
                                </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orders.length > 0 && (
                                    orders.map((order, index) => (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{order.id}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{order.customer}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{order.total}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{order.products.length}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <Link to={`/dashboard/orders/${order.id}`} className="text-theme-900 hover:text-theme-700">View<span className="sr-only">View order {order.id}</span></Link>
                                            </td>
                                        </tr>                                        
                                    ))
                                )}

                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
            </div>        
        </div>
    )
}
