import { useContext } from 'react'
import BreadCrumbs from '../components/BreadCrumbs';
import { CartContext } from '../context/cart';
import { HiMiniMinus, HiMiniPlus } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";
import { Link } from 'react-router-dom';

export default function Basket() {

    const { cartItems, increaseItemQuantity, decreaseItemQuantity, removeFromCart } = useContext(CartContext);

    return (
        <>
            <BreadCrumbs items={[{label: 'Home', href: '/'}, {label: 'Basket'}]} />
            <div className='px-4 py-10 max-w-2xl lg:max-w-6xl mx-auto'>
                <h1 className='text-2xl font-semibold mb-5 text-theme-900'>Your Basket</h1>
                <div className='grid lg:grid-cols-5 gap-5'>
                    <ul className='col-span-5 lg:col-span-3 flex flex-col gap-y-5'>
                        {cartItems.map((item, index) => (
                            <li key={index} className='grid grid-cols-4 relative rounded-xl shadow-sm p-4 bg-white'>
                                <button 
                                    className='cursor-pointer h-[20px] w-[20px] flex items-center justify-center rounded-full absolute top-2 right-2'
                                    onClick={() => removeFromCart(item)}
                                >
                                    <HiMiniXMark className='text-2xl text-theme-800'/>
                                </button>
                                <div className='col-span-1 hidden sm:block'>
                                    <img src={item.images[0]} alt={item.title} />
                                </div>
                                <div className='col-span-4 sm:col-span-3 pl-4 py-3'>
                                    <h2 className='text-lg font-bold text-theme-900'>{item.title}</h2>
                                    <div className='flex items-center justify-between mt-3 pt-3 border-t border-theme-100'>
                                        <div className='flex items-center'>
                                            <span className='mr-5 text-theme-900'>Qty:</span>
                                            <div className='flex border solid border-theme-100 rounded-full'>
                                                <button 
                                                    className='py-1 pl-2 pr-2 border-r border-gray-200 cursor-pointer'
                                                    onClick={() => decreaseItemQuantity(item)}
                                                >
                                                    <HiMiniMinus className='text-base text-theme-700'/>
                                                </button>
                                                <span className='py-1 px-3 text-theme-900'>{item.quantity}</span>
                                                <button                          
                                                    className='py-1 pr-2 pl-2 border-l border-gray-200 cursor-pointer'
                                                    onClick={() => increaseItemQuantity(item)}
                                                >
                                                    <HiMiniPlus className='text-lg text-theme-700'/>
                                                </button>
                                            </div>
                                            <span className='ml-5 text-base text-theme-800'>£{item.price}</span>
                                        </div>
                                        <span className='text-xl text-theme-800 font-semibold'>£{item.quantity * item.price}</span>
                                    </div>
                                </div>
                            </li>
                        ))}                        
                    </ul>
                    <div className='col-span-5 lg:col-span-2 sm: w-full'>
                        <div className='bg-white rounded-lg p-4 shadow-sm text-theme-900'>
                            <div className='flex justify-between text-sm mb-0.5'>
                                <span>Subtotal:</span>
                                <span>£{cartItems.reduce((total, item) => total + item.quantity * item.price, 0)}</span>
                            </div>
                            <div className='flex justify-between text-sm mb-0.5'>
                                <span>Delivery:</span>
                                <span>£0</span>
                            </div>
                            <div className='flex justify-between text-sm mb-0.5'>
                                <span>Discounts:</span>
                                <span>£0</span>
                            </div>
                            <div className='flex justify-between text-xl border-t border-b border-solid border-gray-200 py-2 mt-2 font-bold'>
                                <span>Total:</span>
                                <span>£{cartItems.reduce((total, item) => total + item.quantity * item.price, 0)}</span>
                            </div>
                            <div className='flex justify-end text-xl py-2 mt-2 font-bold'>
                                <Link to={`/checkout`} className='bg-theme-300 hover:bg-theme-300/50 px-4 py-2 rounded-lg'>Checkout</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
