import { useContext } from 'react'
import { HiMiniXMark } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import { CartContext } from '../context/cart';
import PropTypes from 'prop-types';

export default function SideCart() {

    const { cartItems, removeFromCart, getCartQuantity, sideCartOpen, toggleSideCart, getCartValue } = useContext(CartContext);

    return (
        <div className={`z-[9999] h-full w-9/10 md:w-[400px] fixed right-0 top-0 bottom-0 bg-theme-50 border-l-2 border-solid border-gray-30 font-regular flex flex-col justify-between transition-transform duration-500 ease-linear transform ${sideCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className='overflow-y-auto'>
                <div className='flex justify-between p-4 pl-8 border-b border-solid border-theme-dark'>
                    <div className='flex items-center gap-x-1'>
                        {getCartQuantity() > 0 && (
                        <h2 className='text-2xl text-theme-800'>Added item{getCartQuantity() > 1 && 's'} ({getCartQuantity()})</h2>
                        )}               
                    </div>
                    <button onClick={() => {toggleSideCart()}}><HiMiniXMark className='text-4xl text-theme-800 cursor-pointer'/></button>
                    
                </div>
                <div className='pt-0 p-4 pl-4'>
                    {cartItems.length === 0 && (
                        <div className='py-10 text-center'>
                            <h2 className='text-2xl'>Your cart is empty :(</h2>
                            <button className='underline mt-5' onClick={() => toggleSideCart(false)}>Continue shopping</button>
                        </div>
                    )}
                    {cartItems.length > 0 && (
                        <ul className='py-10 flex flex-col gap-y-5'>
                        
                            {cartItems.map((item) => {
                                return (                            
                                    <li 
                                        key={item.id} 
                                        className='flex gap-2 p-3 rounded-lg bg-white relative shadow-sm' 
                                    >
                                        <button 
                                            className='cursor-pointer h-[20px] w-[20px] flex items-center justify-center bg-theme-500/60 rounded-full absolute -top-2 -left-2'
                                            onClick={() => removeFromCart(item)}
                                        >
                                            <HiMiniXMark className='text-sm text-theme-800'/>
                                        </button>
                                        {item.images.length !== 0 && (
                                            <img className="max-w-12 h-[50px] w-[50px] object-cover aspect-square" src={item.images[0]}/>
                                        )}
                                        <div>
                                            <h3 className='text-theme-900'>{item.quantity} x {item.title}</h3>
                                            <p className='font-semibold text-theme-800'>£{item.price}</p>
                                        </div>
                                    </li>
                                )

                            })}    
                                                
                        </ul>
                    )}
                </div>                
            </div>
            <div className='bg-white border-t-2 border-solid border-theme-500'>
                <div className='px-4 py-6'>
                    <Link to="/basket" className='bg-theme-300 hover:bg-theme-500/60 text-theme-900 py-3 px-4 rounded-lg' onClick={() => toggleSideCart(false)}>BASKET</Link>
                </div>
                <div className='border-t-theme-500 border-solid border-t-2 px-4 py-4 text-theme-900'>
                    <span>SUBTOTAL: £{getCartValue()}</span>
                </div>
            </div>
        </div>
    )
}

SideCart.propTypes = {
    sideCartOpen: PropTypes.bool,
    handleToggleSideBar: PropTypes.func
}