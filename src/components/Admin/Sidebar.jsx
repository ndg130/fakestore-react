import { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaShoppingBag } from "react-icons/fa";
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

export default function Sidebar() {

    const [sideBarOpen, setSideBarOpen] = useState(false);
    const { pathname } = useLocation();

    return (
        <div>
        
            <div className="relative z-50 lg:hidden" role="dialog" aria-modal="true">
            
                <div className={`modal fixed inset-0 bg-gray-900/50 transition-all ease-linear duration-300 ${sideBarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true"></div>

                <div className={`fixed inset-0 flex transform transition-translate ease-linear duration-300 ${sideBarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="relative mr-16 flex w-full max-w-xs flex-1">
                    
                        <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                            <button type="button" className="-m-2.5 p-2.5" onClick={() => {setSideBarOpen(false)}}>
                                <span className="sr-only">Close sidebar</span>
                                <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-theme-300 px-6 pb-2">
                        <div className="flex h-16 shrink-0 items-center">
                            <Link to={'/'} className='flex items-center gap-2 text-2xl font-bold text-white font-heading'>FakeStore <FaShoppingBag className='text-2xl min-w-5 text-theme-500'/></Link>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                <li>
                                
                                    <Link to="/dashboard" className={`group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold ${pathname.toLowerCase() === "/dashboard" ? 'text-white' : 'text-theme-800 hover:bg-theme-100 hover:text-white' }`}>
                                        <svg className={`size-6 shrink-0 ${pathname.toLowerCase() === "/dashboard" ? 'text-white' : 'text-theme-500 group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/dashboard/products`} className={`group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold ${pathname.toLowerCase() === "/dashboard/products" ? 'text-white' : 'text-theme-800 hover:bg-theme-100 hover:text-white' }`}>
                                    <svg className={`size-6 shrink-0 ${pathname.toLowerCase() === "/dashboard/products" ? 'text-white' : 'text-theme-500 group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                    </svg>
                                    Products
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/dashboard/orders`} className={`group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold ${pathname.toLowerCase() === "/dashboard/orders" ? 'text-white' : 'text-theme-800 hover:bg-theme-100 hover:text-white' }`}>
                                    <svg className={`size-6 shrink-0 ${pathname.toLowerCase() === "/dashboard/orders" ? 'text-white' : 'text-theme-500 group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                    </svg>
                                    Orders
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/dashboard/customers`} className={`group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold ${pathname.toLowerCase() === "/dashboard/customers" ? 'text-white' : 'text-theme-800 hover:bg-theme-100 hover:text-white' }`}>
                                    <svg className={`size-6 shrink-0 ${pathname.toLowerCase() === "/dashboard/customers" ? 'text-white' : 'text-theme-500 group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                    </svg>
                                    Customers
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/dashboard/discounts`} className={`group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold ${pathname.toLowerCase() === "/dashboard/discounts" ? 'text-white' : 'text-theme-800 hover:bg-theme-100 hover:text-white' }`}>
                                    <svg className={`size-6 shrink-0 ${pathname.toLowerCase() === "/dashboard/discounts" ? 'text-white' : 'text-theme-500 group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                    </svg>
                                    Discounts
                                    </Link>
                                </li>
                                </ul>
                            </li>

                            </ul>
                        </nav>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-theme-300 px-6">
                    <div className="flex h-16 shrink-0 items-center">
                    <Link to={'/'} className='flex items-center gap-2 text-2xl font-bold text-white font-heading'>FakeStore <FaShoppingBag className='text-2xl min-w-5 text-theme-500'/></Link>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                            <li>
                                <Link to="/dashboard" className={`group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold ${pathname.toLowerCase() === "/dashboard" ? 'text-white' : 'text-theme-800 hover:bg-theme-100 hover:text-white' }`}>
                                <svg className={`size-6 shrink-0 ${pathname.toLowerCase() === "/dashboard" ? 'text-white' : 'text-theme-500 group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                                Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to={`/dashboard/products`} className={`group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold ${pathname.toLowerCase() === "/dashboard/products" ? 'text-white' : 'text-theme-800 hover:bg-theme-100 hover:text-white' }`}>
                                <svg className={`size-6 shrink-0 ${pathname.toLowerCase() === "/dashboard/products" ? 'text-white' : 'text-theme-500 group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                                </svg>
                                Products
                                </Link>
                            </li>
                            <li>
                                <Link to={`/dashboard/orders`} className={`group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold ${pathname.toLowerCase() === "/dashboard/orders" ? 'text-white' : 'text-theme-800 hover:bg-theme-100 hover:text-white' }`}>
                                <svg className={`size-6 shrink-0 ${pathname.toLowerCase() === "/dashboard/orders" ? 'text-white' : 'text-theme-500 group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                </svg>
                                Orders
                                </Link>
                            </li>
                            <li>
                                <Link to={`/dashboard/customers`} className={`group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold ${pathname.toLowerCase() === "/dashboard/customers" ? 'text-white' : 'text-theme-800 hover:bg-theme-100 hover:text-white' }`}>
                                <svg className={`size-6 shrink-0 ${pathname.toLowerCase() === "/dashboard/customers" ? 'text-white' : 'text-theme-500 group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                </svg>
                                Customers
                                </Link>
                            </li>
                            <li>
                                <Link to={`/dashboard/discounts`} className={`group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold ${pathname.toLowerCase() === "/dashboard/discounts" ? 'text-white' : 'text-theme-800 hover:bg-theme-100 hover:text-white' }`}>
                                <svg className={`size-6 shrink-0 ${pathname.toLowerCase() === "/dashboard/discounts" ? 'text-white' : 'text-theme-500 group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                </svg>
                                Discounts
                                </Link>
                            </li>

                            </ul>
                        </li>


                        </ul>
                    </nav>
                </div>
            </div>

            <div className={`sticky top-0 z-40 items-center gap-x-6 bg-theme-300 px-4 py-4 shadow-sm sm:px-6 flex lg:hidden`}>
                <button type="button" className="-m-2.5 p-2.5 text-theme-900 lg:hidden" onClick={() => {setSideBarOpen(true)}}>
                    <span className="sr-only">Open sidebar</span>
                    <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                <div className="flex-1 text-sm/6 font-semibold text-white">Dashboard</div>

            </div>
        </div>
    )
}

Sidebar.propTypes = {
    activePage: PropTypes.string.isRequired
  };